'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadProgress } from '@/components/ui/upload-progress';

interface UploadedMedia {
  assetId: string;
  type: 'video' | 'image';
  previewUrl: string;
  fileName: string;
}

interface UploadProgressState {
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  fileName?: string;
}

interface UploadResponse {
  success: boolean;
  assetId: string;
  mediaType: 'video' | 'image';
}

interface SocialNetwork {
  id: string;
  name: string;
  isConnected: boolean;
}

const SOCIAL_NETWORKS: SocialNetwork[] = [
  { id: 'linkedin', name: 'LinkedIn', isConnected: true },
  { id: 'twitter', name: 'Twitter', isConnected: false },
  { id: 'facebook', name: 'Facebook', isConnected: false },
  { id: 'instagram', name: 'Instagram', isConnected: false },
];

export const PostEditor = () => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressState | null>(null);
  const [uploadComplete, setUploadComplete] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processingIntervalRef = useRef<NodeJS.Timeout>();
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState(['linkedin']);

  const ActionButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex">
          <Button 
            type="submit" 
            disabled={
              isPosting || 
              selectedNetworks.length === 0 || 
              (!content.trim() && uploadedMedia.length === 0) || 
              uploadProgress?.status === 'uploading'
            }
            className={`!rounded-r-none border-r border-blue-700 min-w-[100px] ${
              isPosting || uploadProgress?.status === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPosting 
              ? 'Publication en cours...' 
              : isScheduled 
                ? 'Programmer' 
                : 'Publier'
            }
          </Button>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`px-2 min-h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-r-md flex items-center justify-center transition-colors ${showDropdown ? 'bg-blue-700' : ''} ${
              isPosting || uploadProgress?.status === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isPosting || uploadProgress?.status === 'uploading'}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
  
        {showDropdown && (
          <div 
            style={{ bottom: 'calc(100% + 0.5rem)' }}
            className="absolute right-0 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  window.open('/preview', '_blank');
                  setShowDropdown(false);
                }}
                className="group w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Prévisualiser
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const currentInterval = processingIntervalRef.current;
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, []);

  const handleNetworkToggle = (networkId: string) => {
    const network = SOCIAL_NETWORKS.find(n => n.id === networkId);
    if (!network?.isConnected) {
      setError('Veuillez d\'abord vous connecter à ce réseau social');
      return;
    }
    
    setSelectedNetworks(prev =>
      prev.includes(networkId)
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length > 0 && !videoFiles.every(file => file.type === 'video/mp4')) {
      setError('Seules les vidéos MP4 sont supportées');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (videoFiles.some(file => file.size > 200 * 1024 * 1024)) {
      setError('Les vidéos doivent faire moins de 200MB');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if ((uploadedMedia.some(media => media.type === 'video') || videoFiles.length > 0) && 
        (uploadedMedia.length > 0 || files.length > 1)) {
      setError('Une vidéo doit être publiée seule, sans autres médias');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setError('');

    for (const file of files) {
      try {
        setUploadProgress({
          status: 'uploading',
          progress: 0,
          fileName: file.name
        });

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setUploadProgress(prev => ({
              ...prev!,
              status: 'uploading',
              progress: file.type.startsWith('video/') ? progress * 0.5 : progress
            }));
          }
        };

        const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status === 200) {
              try {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                  resolve(response as UploadResponse);
                } else {
                  reject(new Error('Upload failed'));
                }
              } catch {
                reject(new Error('Invalid response format'));
              }
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };
          xhr.onerror = () => reject(new Error('Upload failed'));
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);

        const uploadResponse = await uploadPromise;

        if (file.type.startsWith('video/')) {
          setUploadProgress(prev => ({
            ...prev!,
            status: 'processing',
            progress: 50
          }));

          if (processingIntervalRef.current) {
            clearInterval(processingIntervalRef.current);
          }

          processingIntervalRef.current = setInterval(() => {
            setUploadProgress(prev => {
              if (!prev || prev.progress >= 95) {
                if (processingIntervalRef.current) {
                  clearInterval(processingIntervalRef.current);
                }
                return prev;
              }
              return {
                ...prev,
                progress: Math.min(95, prev.progress + 5)
              };
            });
          }, 2000);
        }

        const newMedia: UploadedMedia = {
          assetId: uploadResponse.assetId,
          type: uploadResponse.mediaType,
          previewUrl: URL.createObjectURL(file),
          fileName: file.name
        };

        setUploadedMedia(prev => [...prev, newMedia]);
        setUploadProgress(prev => ({
          ...prev!,
          status: 'completed',
          progress: 100
        }));
        setUploadComplete(prev => ({
          ...prev,
          [file.name]: true
        }));

      } catch (error) {
        console.error('Upload error:', error);
        setError(error instanceof Error ? error.message : 'Failed to upload media');
        setUploadProgress(prev => ({
          ...prev!,
          status: 'failed',
          progress: 100
        }));
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveMedia = (index: number) => {
    setUploadedMedia(prev => {
      const newMedia = [...prev];
      URL.revokeObjectURL(newMedia[index].previewUrl);
      const fileName = newMedia[index].fileName;
      newMedia.splice(index, 1);
      
      setUploadComplete(prev => {
        const updated = { ...prev };
        delete updated[fileName];
        return updated;
      });
      
      return newMedia;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && uploadedMedia.length === 0) return;
    if (selectedNetworks.length === 0) {
      setError('Veuillez sélectionner au moins un réseau social');
      return;
    }
    if (isScheduled && (!scheduledDate || !scheduledTime)) {
      setError('Veuillez définir une date et une heure pour la publication programmée');
      return;
    }
  
    setIsPosting(true);
    setError('');
  
    try {
      const scheduledDateTime = isScheduled
        ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
        : null;
  
      for (const networkId of selectedNetworks) {
        const endpoint = networkId === 'linkedin' 
          ? '/api/linkedin/post'
          : '/api/twitter/post';
  
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content,
            media: uploadedMedia.map(media => ({
              id: media.assetId,
              type: media.type
            })),
            scheduledAt: scheduledDateTime
          })
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`Échec de la publication sur ${networkId}: ${data.error || data.details || 'Erreur inconnue'}`);
        }
  
        const result = await response.json();
        console.log(`Publication réussie sur ${networkId}:`, result);
      }
  
      setContent('');
      uploadedMedia.forEach(media => URL.revokeObjectURL(media.previewUrl));
      setUploadedMedia([]);
      setUploadProgress(null);
      setUploadComplete({});
      setIsScheduled(false);
      setScheduledDate('');
      setScheduledTime('');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert(isScheduled 
        ? 'Publications programmées avec succès !' 
        : `Publications envoyées avec succès sur ${selectedNetworks.length} réseau${selectedNetworks.length > 1 ? 'x' : ''} !`
      );
    } catch (error) {
      console.error('Erreur de publication:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la publication');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700">Réseaux sociaux</h2>
            <div className="grid grid-cols-2 gap-4">
              {SOCIAL_NETWORKS.map(network => (
                <button
                  key={network.id}
                  type="button"
                  onClick={() => handleNetworkToggle(network.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md border transition-colors w-full
                    ${network.isConnected 
                      ? selectedNetworks.includes(network.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                      : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full flex-shrink-0
                    ${network.isConnected 
                      ? selectedNetworks.includes(network.id)
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                      : 'bg-gray-300'
                    }`}
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{network.name}</span>
                    {!network.isConnected && (
                      <span className="text-xs text-gray-400">(Non connecté)</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
  
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Que souhaitez-vous partager ?"
            />
          </div>
  
          <div className="space-y-4">
            {Object.entries(uploadComplete).map(([fileName, isCompleted]) => (
              isCompleted && (
                <UploadProgress
                  key={fileName}
                  status="completed"
                  progress={100}
                  fileName={fileName}
                />
              )
            ))}
            
            {uploadProgress && !uploadComplete[uploadProgress.fileName || ''] && (
              <UploadProgress
                status={uploadProgress.status}
                progress={uploadProgress.progress}
                fileName={uploadProgress.fileName}
              />
            )}
  
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              multiple={!uploadedMedia.some(media => media.type === 'video')}
              disabled={uploadProgress?.status === 'uploading' || uploadedMedia.some(media => media.type === 'video')}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50"
            />
  
            <div className="grid grid-cols-3 gap-4">
              {uploadedMedia.map((media, index) => (
                <div key={media.assetId} className="relative aspect-square">
                  {media.type === 'image' ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={media.previewUrl}
                        alt={`Media ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {media.fileName}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={media.previewUrl}
                        className="w-full h-full rounded object-cover"
                        controls
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {media.fileName}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(index)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                    aria-label="Supprimer le média"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="schedule"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="schedule" className="text-sm text-gray-700">
                Programmer la publication
              </label>
            </div>
  
            {isScheduled && (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">Heure</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
  
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
              Erreur: {error}
            </div>
          )}
  
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {uploadedMedia.length > 0 && (
                `${uploadedMedia.length} média${uploadedMedia.length > 1 ? 's' : ''} sélectionné${uploadedMedia.length > 1 ? 's' : ''}`
              )}
              {selectedNetworks.length > 0 && (
                <span className="ml-4">
                  Publication sur {selectedNetworks.length} réseau{selectedNetworks.length > 1 ? 'x' : ''}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                type="button"
                variant="secondary"
                disabled={isPosting}
                onClick={() => alert('Fonctionnalité à venir')}
              >
                Enregistrer comme brouillon
              </Button>
              <ActionButton />
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default PostEditor;
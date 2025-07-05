'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Smartphone,
  Monitor,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Globe,
  Users,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

interface PreviewData {
  content: string;
  media: Array<{
    type: 'image' | 'video';
    previewUrl: string;
    fileName: string;
  }>;
  selectedNetworks: string[];
  scheduledDateTime: string | null;
}

type SocialPlatform = 'linkedin' | 'twitter' | 'facebook' | 'instagram';
type DeviceType = 'mobile' | 'desktop';

const formatDate = (date: string | null): string => {
  if (!date) return 'Publication immédiate';
  try {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} à ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  } catch {
    return 'Date invalide';
  }
};

const REACTIONS = [
  { emoji: '👍', name: "J'aime", color: 'text-blue-500' },
  { emoji: '❤️', name: 'Love', color: 'text-red-500' },
  { emoji: '😆', name: 'Haha', color: 'text-yellow-500' },
  { emoji: '😮', name: 'Wow', color: 'text-yellow-500' },
  { emoji: '😢', name: 'Triste', color: 'text-yellow-500' },
  { emoji: '😠', name: 'Grrr', color: 'text-orange-500' },
];

const demoData: PreviewData = {
  content: "🚀 Découvrez notre nouvelle application de gestion des réseaux sociaux !\n\nGrâce à notre interface intuitive, vous pouvez maintenant :\n✅ Planifier vos posts\n✅ Analyser vos performances\n✅ Gérer plusieurs comptes\n\n#Innovation #SocialMedia #ProductivityTools",
  media: [
    {
      type: 'image',
      previewUrl: '/api/placeholder/800/800',
      fileName: 'app-preview.jpg'
    },
    {
      type: 'image',
      previewUrl: '/api/placeholder/800/800',
      fileName: 'features.jpg'
    }
  ],
  selectedNetworks: ['linkedin', 'twitter', 'facebook', 'instagram'],
  scheduledDateTime: new Date(Date.now() + 86400000).toISOString()
};

const SocialPreview = () => {
  const [selectedPlatform, setPlatform] = useState<SocialPlatform>('linkedin');
  const [selectedDevice, setDevice] = useState<DeviceType>('mobile');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('previewData');
    if (savedData) {
      setPreviewData(JSON.parse(savedData));
    } else {
      setIsDemo(true);
    }
  }, []);

  const data = previewData || demoData;

  const handleMediaNavigation = (direction: 'prev' | 'next') => {
    const totalMedia = data.media.length;
    if (direction === 'prev') {
      setCurrentMediaIndex(prev => (prev === 0 ? totalMedia - 1 : prev - 1));
    } else {
      setCurrentMediaIndex(prev => (prev === totalMedia - 1 ? 0 : prev + 1));
    }
  };

  const PlatformSelector = () => (
    <div className="flex justify-center mb-8 bg-white rounded-lg p-2 shadow-sm">
      <div className="flex space-x-2">
        {[
          { id: 'linkedin' as const, name: 'LinkedIn', icon: 'LI' },
          { id: 'twitter' as const, name: 'Twitter', icon: 'X' },
          { id: 'facebook' as const, name: 'Facebook', icon: 'FB' },
          { id: 'instagram' as const, name: 'Instagram', icon: 'IG' }
        ].map((platform) => (
          <button
            key={platform.id}
            onClick={() => setPlatform(platform.id)}
            className={`px-6 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
              selectedPlatform === platform.id
                ? 'bg-blue-100 text-blue-600 font-medium scale-105'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
              {platform.icon}
            </div>
            <span>{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const DeviceSelector = () => (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-2 bg-white rounded-full shadow-sm p-1">
        <button
          onClick={() => setDevice('mobile')}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
            selectedDevice === 'mobile'
              ? 'bg-gray-100 text-gray-900 scale-105'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Mobile
        </button>
        <button
          onClick={() => setDevice('desktop')}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
            selectedDevice === 'desktop'
              ? 'bg-gray-100 text-gray-900 scale-105'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Monitor className="w-4 h-4 mr-2" />
          Desktop
        </button>
      </div>
    </div>
  );

  const LinkedInPreview = () => (
    <div className={`bg-white ${selectedDevice === 'mobile' ? 'w-[380px]' : 'w-[550px]'} rounded-xl shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="ml-3">
            <div className="font-semibold text-gray-900">John Doe</div>
            <div className="text-sm text-gray-500 flex items-center">
              <span>Directeur Marketing • Publify</span>
              <Globe className="w-3 h-3 ml-1" />
            </div>
          </div>
          <button className="ml-auto text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-900 whitespace-pre-line">{data.content}</p>
        </div>

        {data.media && data.media.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <div className="grid grid-cols-2 gap-1">
              {data.media.map((media, index) => (
                <div key={index} className="relative aspect-[4/3]">
                  {media.type === 'image' ? (
                    <Image
                      src={media.previewUrl}
                      alt={media.fileName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={media.previewUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-center gap-8">
            <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span className="text-sm">J&apos;aime</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">Commenter</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <Share className="w-5 h-5 mr-1" />
              <span className="text-sm">Partager</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TwitterPreview = () => (
    <div className={`bg-white ${selectedDevice === 'mobile' ? 'w-[380px]' : 'w-[550px]'} rounded-xl shadow-lg`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <span className="font-semibold text-gray-900">John Doe</span>
                <span className="text-gray-500 ml-1">@johndoe</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 shrink-0">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-900 mt-2 whitespace-pre-line">
              {data.content}
            </p>
            {data.media && data.media.length > 0 && (
              <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
                <div className="grid grid-cols-2 gap-0.5">
                  {data.media.map((media, index) => (
                    <div key={index} className="relative aspect-square">
                      {media.type === 'image' ? (
                        <Image
                          src={media.previewUrl}
                          alt={media.fileName}
                          fill
                          className="object-cover border-[0.5px] border-gray-100"
                        />
                      ) : (
                        <video
                          src={media.previewUrl}
                          className="w-full h-full object-cover border-[0.5px] border-gray-100"
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between px-4 mt-4 text-gray-500 max-w-[340px] mx-auto">
              <button className="flex items-center hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm ml-2">24</span>
              </button>
              <button className="flex items-center hover:text-green-500 transition-colors">
                <Share className="w-4 h-4" />
                <span className="text-sm ml-2">12</span>
              </button>
              <button className="flex items-center hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-sm ml-2">148</span>
              </button>
              <button className="flex items-center hover:text-blue-500 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FacebookPreview = () => (
    <div className={`bg-white ${selectedDevice === 'mobile' ? 'w-[380px]' : 'w-[550px]'} rounded-xl shadow-lg`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
            JD
          </div>
          <div className="ml-3 flex-1">
            <div>
              <span className="font-bold text-[#1c1e21] hover:underline cursor-pointer">John Doe</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <span>{formatDate(data.scheduledDateTime)}</span>
              <span className="mx-1">•</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
          <button className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
  
        <div className="mt-3 px-0">
          <p className="text-[#1c1e21] whitespace-pre-line">{data.content}</p>
        </div>
  
        {data.media && data.media.length > 0 && (
          <div className="mt-3 -mx-4">
            <div className="aspect-[4/3] relative">
              <Image
                src={data.media[0].previewUrl}
                alt={data.media[0].fileName}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
  
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="relative">
            {showReactions && (
              <div className="absolute -top-12 left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 p-1 flex space-x-1">
                {REACTIONS.map((reaction) => (
                  <button
                    key={reaction.name}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => {
                      setSelectedReaction(reaction.emoji);
                      setShowReactions(false);
                    }}
                  >
                    <span className="text-xl">{reaction.emoji}</span>
                  </button>
                ))}
              </div>
            )}
            <div className={`flex ${selectedDevice === 'mobile' ? 'px-1' : 'px-2'}`}>
              <div className="flex-1">
                <button 
                  className="w-full flex items-center justify-center py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() => setShowReactions(false)}
                >
                  <div className="flex items-center space-x-1">
                    {selectedReaction ? (
                      <span className="text-lg">{selectedReaction}</span>
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                    <span className="text-sm">J&apos;aime</span>
                  </div>
                </button>
              </div>
  
              <div className="flex-1">
                <button className="w-full flex items-center justify-center py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Commenter</span>
                  </div>
                </button>
              </div>
  
              <div className="flex-1">
                <button className="w-full flex items-center justify-center py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-1">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Partager</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const InstagramPreview = () => (
    <div className={`bg-white ${selectedDevice === 'mobile' ? 'w-[380px]' : 'w-[550px]'} rounded-xl shadow-lg`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-semibold">JD</span>
            </div>
          </div>
          <span className="ml-3 font-semibold">johndoe</span>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </div>
  
      <div className="relative">
        <div className="relative aspect-square">
          <Image
            src={data.media[currentMediaIndex].previewUrl}
            alt="Post"
            fill
            className="object-cover"
          />
        </div>
        {data.media.length > 1 && (
          <>
            <button 
              onClick={() => handleMediaNavigation('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleMediaNavigation('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {data.media.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentMediaIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
  
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Heart 
              className={`w-7 h-7 cursor-pointer transition-colors ${
                isLiked ? 'text-red-500 fill-current' : 'hover:text-gray-600'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            />
            <MessageCircle className="w-7 h-7 hover:text-gray-600 cursor-pointer" />
            <Share className="w-7 h-7 hover:text-gray-600 cursor-pointer" />
          </div>
          <Bookmark 
            className={`w-7 h-7 cursor-pointer transition-colors ${
              isLiked ? 'text-black fill-current' : 'hover:text-gray-600'
            }`}
          />
        </div>
  
        <div className="space-y-2">
          <div>
            <span className="font-semibold mr-2">johndoe</span>
            <span>{data.content}</span>
          </div>
          <p className="text-gray-500 text-xs uppercase">
            {formatDate(data.scheduledDateTime)}
          </p>
        </div>
      </div>
    </div>
  );
  
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        {isDemo && (
          <div className="bg-blue-50 border-b border-blue-100 fixed top-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 py-3 text-center text-sm text-blue-700">
              Mode démonstration activé
            </div>
          </div>
        )}
  
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Prévisualisation du post</h1>
            <p className="text-gray-600">
              {data.scheduledDateTime ? 
                `Programmé pour le ${formatDate(data.scheduledDateTime)}` :
                'Publication immédiate'
              }
            </p>
            <div className="flex items-center justify-center mt-4 space-x-2 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Publication sur {data.selectedNetworks.length} réseaux
              </span>
            </div>
          </div>
  
          <PlatformSelector />
          <DeviceSelector />
  
          <div className="flex justify-center">
            {selectedPlatform === 'linkedin' && <LinkedInPreview />}
            {selectedPlatform === 'twitter' && <TwitterPreview />}
            {selectedPlatform === 'facebook' && <FacebookPreview />}
            {selectedPlatform === 'instagram' && <InstagramPreview />}
          </div>
  
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => window.close()}
            >
              Fermer la prévisualisation
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.history.back()}
            >
              Retour à l&apos;éditeur
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SocialPreview;
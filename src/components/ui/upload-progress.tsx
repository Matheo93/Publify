import React from 'react';

interface UploadProgressProps {
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress?: number;
  fileName?: string;
}

export function UploadProgress({ status, progress = 0, fileName }: UploadProgressProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Upload en cours...';
      case 'processing':
        return 'Traitement de la vidéo...';
      case 'completed':
        return 'Terminé !';
      case 'failed':
        return 'Échec';
      default:
        return '';
    }
  };

  return (
    <div className="w-full space-y-2">
      {fileName && (
        <div className="text-sm text-gray-600 truncate">
          {fileName}
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getStatusColor()}`}
          style={{ 
            width: `${progress}%`,
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{getStatusText()}</span>
        <span className="text-gray-600">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
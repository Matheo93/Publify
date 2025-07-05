// src/components/networks/network-settings.tsx
'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ValidLocale } from '@/i18n/config';

interface NetworkDescription {
  en: string;
  fr: string;
}

interface NetworkStatus {
  id: string;
  name: string;
  icon: string;
  description: NetworkDescription;
}

export function NetworkSettings() {
  const { dictionary } = useLanguage();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  if (status === 'loading') {
    return <div>{dictionary.common.loading}</div>;
  }

  const networks: NetworkStatus[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'LI',
      description: {
        fr: 'Partagez du contenu professionnel avec votre réseau',
        en: 'Share professional content with your network'
      }
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: 'X',
      description: {
        fr: 'Publiez des messages courts et engageants',
        en: 'Post short and engaging messages'
      }
    }
  ];

  const getCurrentLocale = (): ValidLocale => {
    return dictionary.dashboard.navigation.networks === "Réseaux sociaux" ? "fr" : "en";
  };

  const isConnected = (networkId: string) => {
    if (networkId === 'linkedin') {
      return status === 'authenticated' && session?.accessToken;
    }
    return false;
  };

  const handleConnection = async (networkId: string) => {
    setIsLoading(prev => ({ ...prev, [networkId]: true }));
    try {
      if (isConnected(networkId)) {
        await signOut({
          callbackUrl: '/',
          redirect: true
        });
      } else {
        await signIn(networkId, {
          callbackUrl: '/'
        });
      }
    } catch (error) {
      console.error(dictionary.errors.connectionError, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [networkId]: false }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{dictionary.networks.title}</h1>
        <p className="text-gray-500">
          {dictionary.networks.description}
        </p>

        <div className="mt-8 space-y-4">
          {networks.map(network => {
            const connected = isConnected(network.id);
            const currentLocale = getCurrentLocale();
            
            return (
              <Card key={network.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                      {network.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {network.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {network.description[currentLocale]}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-sm text-gray-600">
                          {connected ? dictionary.networks.status.connected : dictionary.networks.status.disconnected}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleConnection(network.id)}
                    disabled={isLoading[network.id]}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors
                      ${connected 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      } ${isLoading[network.id] ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isLoading[network.id] 
                      ? dictionary.common.loading
                      : connected 
                        ? dictionary.networks.actions.disconnect 
                        : dictionary.networks.actions.connect
                    }
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
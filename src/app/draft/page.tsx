'use client';

import React, { useState } from 'react';
import { Clock, Edit, MoreVertical, Trash, Copy, Calendar, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/navigation';

interface Post {
  id: number;
  content: string;
  networks: string[];
  createdAt: string;
  updatedAt: string;
  media?: string[];
  status: 'draft' | 'scheduled';
  scheduledFor: string | null;
}

export default function DraftsPage() {
  const [filter, setFilter] = useState<'all' | 'drafts' | 'scheduled'>('all');

  const posts: Post[] = [
    {
      id: 1,
      content: "Découvrez notre nouvelle mise à jour ! 🚀 \nNous avons ajouté de nouvelles fonctionnalités pour améliorer votre expérience...",
      networks: ['linkedin', 'twitter'],
      createdAt: "2024-03-11T10:30:00",
      updatedAt: "2024-03-11T14:20:00",
      media: ['/api/placeholder/400/300'],
      status: 'draft',
      scheduledFor: null
    },
    {
      id: 2,
      content: "Tips du jour pour optimiser votre productivité : \n1. Planifiez votre journée\n2. Utilisez la technique Pomodoro\n3. Faites des pauses régulières",
      networks: ['linkedin'],
      createdAt: "2024-03-10T15:45:00",
      updatedAt: "2024-03-10T16:30:00",
      status: 'scheduled',
      scheduledFor: "2024-12-28T19:00:00"
    },
    {
      id: 3,
      content: "Webinaire exclusif : Les tendances marketing 2025 ! 📊\nInscrivez-vous dès maintenant pour découvrir...",
      networks: ['linkedin', 'twitter', 'facebook'],
      createdAt: "2024-03-12T09:15:00",
      updatedAt: "2024-03-12T11:30:00",
      status: 'scheduled',
      scheduledFor: "2024-04-15T14:00:00"
    }
  ];

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.status === filter);

  const getTimeLeftString = (scheduledDate: string): string => {
    const now = new Date().getTime();
    const scheduled = new Date(scheduledDate).getTime();
    const diff = scheduled - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `Dans ${days} jour${days > 1 ? 's' : ''}`;
    }
    return `Dans ${hours} heure${hours > 1 ? 's' : ''}`;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mes Brouillons</h1>
                <p className="mt-2 text-gray-600">Gérez vos brouillons et publications programmées</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Nouveau brouillon</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  filter === 'all' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Edit className="h-4 w-4" />
                <span>Tous</span>
              </button>
              <button
                onClick={() => setFilter('drafts')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  filter === 'drafts' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Edit className="h-4 w-4" />
                <span>Brouillons</span>
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  filter === 'scheduled' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Programmés</span>
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                  post.status === 'scheduled' 
                    ? 'border-blue-200 hover:border-blue-300' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-6">
                  {/* Status Badge */}
                  {post.status === 'scheduled' && post.scheduledFor && (
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">
                          Programmé pour le {new Date(post.scheduledFor).toLocaleDateString()} à{' '}
                          {new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className="text-sm text-blue-500 font-medium">
                        {getTimeLeftString(post.scheduledFor)}
                      </span>
                    </div>
                  )}

                  {/* Networks & Actions */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {post.networks.map((network) => (
                        <div
                          key={network}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          {network === 'linkedin' ? 'LI' : network === 'twitter' ? 'TW' : 'FB'}
                        </div>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {post.networks.length} réseau{post.networks.length > 1 ? 'x' : ''}
                      </span>
                    </div>
                    <div className="relative group">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                      {/* Dropdown menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
                        <div className="py-1">
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </button>
                          {post.status === 'scheduled' && (
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Reprogrammer
                            </button>
                          )}
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Copy className="h-4 w-4 mr-2" />
                            Dupliquer
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center">
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="mb-4">
                    <p className="text-gray-800 line-clamp-3">{post.content}</p>
                  </div>

                  {/* Media Preview */}
                  {post.media && (
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {post.media.map((src, index) => (
                        <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={src}
                            alt={`Media ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Modifié le {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      {post.status === 'draft' ? (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          Brouillon
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Programmé
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {filter === 'scheduled' ? (
                  <Calendar className="h-8 w-8 text-gray-400" />
                ) : (
                  <Edit className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'scheduled' 
                  ? 'Aucune publication programmée' 
                  : filter === 'drafts' 
                    ? 'Aucun brouillon' 
                    : 'Aucun contenu'
                }
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'scheduled' 
                  ? 'Programmez votre première publication' 
                  : 'Commencez à créer votre première publication'
                }
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {filter === 'scheduled' ? 'Programmer une publication' : 'Créer un brouillon'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
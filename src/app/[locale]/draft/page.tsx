// src/app/[locale]/draft/page.tsx
'use client';

import React, { useState } from 'react';
import { Clock, Edit, MoreVertical, Trash, Copy, Calendar, CheckCircle } from 'lucide-react';
import Navigation from '@/components/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

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

type FilterType = 'all' | 'drafts' | 'scheduled';

interface ActionItem {
  icon: typeof Edit;
  label: string;
  color: string;
}

interface FilterButton {
  key: FilterType;
  icon: typeof Edit;
  label: string;
}

export default function DraftsPage() {
  const { dictionary } = useLanguage();
  const { drafts } = dictionary;
  
  const [filter, setFilter] = useState<FilterType>('all');
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const posts: Post[] = [
    {
      id: 1,
      content: "Discover our latest update! 🚀 \nWe've added new features to enhance your experience...",
      networks: ['linkedin', 'twitter'],
      createdAt: "2024-03-11T10:30:00",
      updatedAt: "2024-03-11T14:20:00",
      media: ['/placeholder-image.jpg'],
      status: 'draft',
      scheduledFor: null
    },
    {
      id: 2,
      content: "Today's productivity tips: \n1. Plan your day\n2. Use the Pomodoro technique\n3. Take regular breaks",
      networks: ['linkedin'],
      createdAt: "2024-03-10T15:45:00",
      updatedAt: "2024-03-10T16:30:00",
      status: 'scheduled',
      scheduledFor: "2024-12-28T19:00:00"
    },
    {
      id: 3,
      content: "Exclusive webinar: 2025 Marketing Trends! 📊\nRegister now to discover...",
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
      return drafts.post.timeLeft.days.replace('{count}', String(days));
    }
    return drafts.post.timeLeft.hours.replace('{count}', String(hours));
  };

  const NetworkIcon = ({ network }: { network: string }) => {
    const getNetworkDisplay = () => {
      switch (network) {
        case 'linkedin':
          return { text: 'LI', bgColor: 'bg-blue-100 text-blue-700' };
        case 'twitter':
          return { text: 'TW', bgColor: 'bg-sky-100 text-sky-700' };
        case 'facebook':
          return { text: 'FB', bgColor: 'bg-indigo-100 text-indigo-700' };
        default:
          return { text: '··', bgColor: 'bg-gray-100 text-gray-700' };
      }
    };

    const { text, bgColor } = getNetworkDisplay();
    return (
      <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center font-medium text-sm`}>
        {text}
      </div>
    );
  };

  const filterButtons: FilterButton[] = [
    { key: 'all', icon: Edit, label: drafts.filters.all },
    { key: 'drafts', icon: Edit, label: drafts.filters.drafts },
    { key: 'scheduled', icon: Calendar, label: drafts.filters.scheduled }
  ];

  const getActionItems = (status: 'draft' | 'scheduled'): ActionItem[] => {
    const baseItems: ActionItem[] = [
      { icon: Edit, label: drafts.post.actions.edit, color: 'text-gray-700 hover:bg-gray-100' },
      { icon: Copy, label: drafts.post.actions.duplicate, color: 'text-gray-700 hover:bg-gray-100' },
      { icon: Trash, label: drafts.post.actions.delete, color: 'text-red-600 hover:bg-red-50' }
    ];

    if (status === 'scheduled') {
      return [
        baseItems[0],
        { icon: Calendar, label: drafts.post.actions.reschedule, color: 'text-gray-700 hover:bg-gray-100' },
        ...baseItems.slice(1)
      ];
    }

    return baseItems;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{drafts.header.title}</h1>
                <p className="mt-2 text-gray-600">{drafts.header.description}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>{drafts.header.newDraft}</span>
              </button>
            </div>

            <div className="flex space-x-2 mb-6">
              {filterButtons.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    filter === key 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

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
                  {post.status === 'scheduled' && post.scheduledFor && (
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">
                          {`${drafts.post.scheduledFor} ${new Date(post.scheduledFor).toLocaleDateString()} à ${
                            new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }`}
                        </span>
                      </div>
                      <span className="text-sm text-blue-500 font-medium">
                        {getTimeLeftString(post.scheduledFor)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {post.networks.map((network) => (
                        <NetworkIcon key={network} network={network} />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {drafts.post.networks.replace('{count}', String(post.networks.length))}
                      </span>
                    </div>
                    <div className="relative">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onMouseEnter={() => setHoveredMenu(post.id)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                      {hoveredMenu === post.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            {getActionItems(post.status).map((item, index) => (
                              <button 
                                key={index}
                                className={`w-full px-4 py-2 text-left text-sm ${item.color} flex items-center transition-colors`}
                              >
                                <item.icon className="h-4 w-4 mr-2" />
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800 whitespace-pre-line line-clamp-3">{post.content}</p>
                  </div>

                  {post.media && (
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {post.media.map((_, index) => (
                        <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Media Preview {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{`${drafts.post.status.modifiedOn} ${new Date(post.updatedAt).toLocaleDateString()}`}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'draft' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {post.status === 'draft' 
                          ? drafts.post.status.draft 
                          : drafts.post.status.scheduled
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                {drafts.empty.title[filter]}
              </h3>
              <p className="text-gray-600 mb-4">
                {drafts.empty.description[filter === 'scheduled' ? 'scheduled' : 'drafts']}
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {drafts.empty.action[filter === 'scheduled' ? 'scheduled' : 'drafts']}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
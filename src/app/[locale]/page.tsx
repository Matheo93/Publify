'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PostEditor } from '@/components/post/post-editor';
import { NetworkSettings } from '@/components/networks/network-settings';
import Navigation from '@/components/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center">
    {children}
  </span>
);

export default function DashboardPage() {
  const { dictionary } = useLanguage();

  if (!dictionary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="bg-white border-b">
          <Tabs defaultValue="compose" className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center px-6 py-4">
              <TabsList>
                <TabsTrigger value="compose">
                  <Icon>✏️</Icon>
                  {dictionary.dashboard?.navigation?.compose || 'Compose'}
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  <Icon>⏰</Icon>
                  {dictionary.dashboard?.navigation?.scheduled || 'Scheduled'}
                </TabsTrigger>
                <TabsTrigger value="networks">
                  <Icon>⚙️</Icon>
                  {dictionary.dashboard?.navigation?.networks || 'Networks'}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="compose">
              <div className="max-w-2xl mx-auto py-8 px-4">
                <PostEditor />
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="max-w-2xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {dictionary.dashboard?.scheduled?.title || 'Scheduled Posts'}
                  </h2>
                  <p className="text-gray-500">
                    {dictionary.dashboard?.scheduled?.empty || 'No scheduled posts yet.'}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="networks">
              <NetworkSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
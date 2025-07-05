// src/app/page.tsx
'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { PostEditor } from '@/components/post/post-editor';
import { NetworkSettings } from '@/components/networks/network-settings';
import Navigation from '@/components/navigation';

// Composant simple pour les icônes
const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center">
    {children}
  </span>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16"> {/* Changé de pt-20 à pt-16 pour être cohérent */}
        <div className="bg-white border-b">
          <Tabs defaultValue="compose" className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center px-6 py-4"> {/* Ajouté py-4 pour l'espacement */}
              <TabsList>
                <TabsTrigger value="compose">
                  <Icon>✏️</Icon>
                  Composer
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  <Icon>⏰</Icon>
                  Programmés
                </TabsTrigger>
                <TabsTrigger value="networks">
                  <Icon>⚙️</Icon>
                  Réseaux sociaux
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
                  <h2 className="text-lg font-semibold mb-4">Publications programmées</h2>
                  <p className="text-gray-500">Aucune publication programmée</p>
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
// src/app/[locale]/settings/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { User, Lock, Bell } from 'lucide-react';
import Navigation from '@/components/navigation';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab,] = useState('account');

  const AccountSettings = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Informations du compte</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={session?.user?.email || ''}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom d&apos;affichage</label>
          <input
            type="text"
            placeholder="Votre nom"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Card>
  );

  const NotificationSettings = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Préférences de notification</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notifications par email</p>
            <p className="text-sm text-gray-500">Recevez des notifications pour vos publications</p>
          </div>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notifications push</p>
            <p className="text-sm text-gray-500">Notifications en temps réel sur votre navigateur</p>
          </div>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
      </div>
    </Card>
  );

  const SecuritySettings = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Sécurité</h2>
      <div className="space-y-4">
        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Changer le mot de passe
        </button>
        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Activer la double authentification
        </button>
      </div>
    </Card>
  );

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>
            
            <Tabs defaultValue={activeTab} className="space-y-6">
              <TabsList className="bg-white p-1 rounded-lg border">
                <TabsTrigger value="account" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Compte</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Sécurité</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
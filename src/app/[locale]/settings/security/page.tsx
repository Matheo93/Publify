'use client';

import React, { useState } from 'react';
import Navigation from '@/components/navigation';
import { Shield, Bell, AlertCircle, ChevronRight, Key, Smartphone, Globe, Clock } from 'lucide-react';

const SecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [notifications, setNotifications] = useState(true);

  const securityMethods = [
    {
      name: 'Authentication à deux facteurs',
      description: 'Ajoute une couche de sécurité supplémentaire à votre compte',
      enabled: twoFactorEnabled,
      setEnabled: setTwoFactorEnabled,
      icon: Shield
    },
    {
      name: 'Notifications de connexion',
      description: 'Recevez des alertes lors de nouvelles connexions',
      enabled: notifications,
      setEnabled: setNotifications,
      icon: Bell
    }
  ];

  const recentActivity = [
    {
      event: 'Changement de mot de passe',
      date: '29 Jan 2024, 14:30',
      location: 'Paris, France',
      device: 'Chrome sur Windows',
      icon: Key,
      status: 'success'
    },
    {
      event: 'Nouvelle connexion',
      date: '28 Jan 2024, 09:15',
      location: 'Lyon, France',
      device: 'Safari sur iPhone',
      icon: Smartphone,
      status: 'success'
    },
    {
      event: 'Tentative de connexion suspecte',
      date: '27 Jan 2024, 03:45',
      location: 'Mumbai, Inde',
      device: 'Firefox',
      icon: AlertCircle,
      status: 'warning'
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sécurité</h1>
            <p className="mt-1 text-gray-500">Gérez la sécurité de votre compte et surveillez l&#39;activité</p>
          </div>

          {/* Security Methods Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Méthodes de sécurité</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {securityMethods.map((method) => (
                <div key={method.name} className="p-6 flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <method.icon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => method.setEnabled(!method.enabled)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        method.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                          method.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Délai d&#39;expiration de session</h3>
                    <p className="mt-1 text-sm text-gray-500 mb-4">
                      Déconnexion automatique après une période d&#39;inactivité
                    </p>
                    <select
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 heure</option>
                      <option value="120">2 heures</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Devices Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Appareils connectés</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                {
                  name: 'MacBook Pro',
                  browser: 'Chrome 121.0',
                  location: 'Paris, France',
                  lastActive: 'Actuellement actif',
                  isCurrentDevice: true
                },
                {
                  name: 'iPhone 14',
                  browser: 'Safari Mobile',
                  location: 'Lyon, France',
                  lastActive: 'Il y a 2 heures',
                  isCurrentDevice: false
                },
                {
                  name: 'iPad Air',
                  browser: 'Safari',
                  location: 'Paris, France',
                  lastActive: 'Il y a 3 jours',
                  isCurrentDevice: false
                }
              ].map((device, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {device.isCurrentDevice ? (
                          <div className="w-2 h-2 bg-green-400 rounded-full ring-2 ring-green-100"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                          {device.isCurrentDevice && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                              Cet appareil
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <span>{device.browser}</span> •{' '}
                          <span>{device.location}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {device.lastActive}
                        </div>
                      </div>
                    </div>
                    {!device.isCurrentDevice && (
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Déconnecter
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <activity.icon 
                        className={`w-6 h-6 ${
                          activity.status === 'warning' ? 'text-amber-500' : 'text-gray-400'
                        }`} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                          <div className="mt-1">
                            <span className="inline-flex items-center text-sm text-gray-500">
                              <Globe className="w-4 h-4 mr-1" />
                              {activity.location}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{activity.device}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityPage;
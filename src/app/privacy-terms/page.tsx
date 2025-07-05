'use client';

import React, { useState } from 'react';
import { Shield, Lock, Check, ExternalLink, FileText, Key } from 'lucide-react';
import Navigation from '@/components/navigation';

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const platforms = [
    { name: 'LinkedIn', icon: '#linkedin-icon' },
    { name: 'Facebook', icon: '#facebook-icon' },
    { name: 'Twitter', icon: '#twitter-icon' },
    { name: 'Instagram', icon: '#instagram-icon' },
    { name: 'TikTok', icon: '#tiktok-icon' }
  ];

  const privacyHighlights = [
    "Protection des données conformément au RGPD",
    "Chiffrement de bout en bout des données sensibles",
    "Aucun partage de données avec des tiers non autorisés",
    "Contrôle total sur vos données personnelles",
    "Transparence sur l'utilisation des données"
  ];

  const apiCompliance = [
    "Respect strict des conditions d'utilisation des APIs",
    "Authentification sécurisée OAuth 2.0",
    "Limites de taux respectées",
    "Stockage sécurisé des tokens d'accès",
    "Audit régulier des permissions"
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <symbol id="linkedin-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </symbol>
          
          <symbol id="facebook-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
          </symbol>
          
          <symbol id="twitter-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
          </symbol>
          
          <symbol id="instagram-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
          </symbol>
          
          <symbol id="tiktok-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </symbol>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-blue-100 p-3">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sécurité & Conformité
            </h1>
            <p className="text-xl text-gray-600">
              Notre engagement pour la protection de vos données et le respect des standards de l&#39;industrie
            </p>
          </div>

          {/* Section des plateformes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              Intégrations officielles et certifiées avec
            </h2>
            <div className="flex justify-center items-center space-x-12">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-700">
                      <use href={platform.icon} />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'privacy'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Politique de confidentialité
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Conditions d&#39;utilisation
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {activeTab === 'privacy' ? (
              <>
                {/* Privacy Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <Lock className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Protection des données</h2>
                  </div>
                  <ul className="space-y-4">
                    {privacyHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                      Voir la politique complète
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <Key className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Utilisation des APIs</h2>
                  </div>
                  <ul className="space-y-4">
                    {apiCompliance.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                      Documentation technique
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </>
            ) : (
<>
                {/* Terms Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <FileText className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Utilisation du service</h2>
                  </div>
                  <div className="prose prose-blue">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">1. Conditions générales</h3>
                    <p className="text-gray-600 mb-6">
                      En utilisant Publify, vous acceptez de respecter nos conditions d&#39;utilisation ainsi que celles
                      des plateformes de médias sociaux connectées. Notre service agit comme un intermédiaire pour
                      faciliter la publication de contenu sur ces plateformes.
                    </p>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-4">2. Responsabilités</h3>
                    <p className="text-gray-600 mb-6">
                      Les utilisateurs sont responsables du contenu qu&#39;ils publient via notre plateforme. Nous nous
                      réservons le droit de suspendre ou de résilier les comptes qui ne respectent pas nos conditions
                      d&#39;utilisation.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <Shield className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Conformité & Sécurité</h2>
                  </div>
                  <div className="prose prose-blue">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">3. Utilisation des APIs</h3>
                    <p className="text-gray-600 mb-6">
                      Nous utilisons les APIs officielles des réseaux sociaux dans le strict respect de leurs
                      conditions d&#39;utilisation. Cela inclut les limites de taux, les permissions d&#39;accès et les
                      pratiques de stockage des données.
                    </p>

                    <h3 className="text-lg font-medium text-gray-900 mb-4">4. Sécurité des données</h3>
                    <p className="text-gray-600">
                      Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données et vos
                      tokens d&#39;accès. Toutes les communications sont chiffrées et nous suivons les meilleures
                      pratiques de l&#39;industrie en matière de sécurité.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Des questions sur nos conditions d&#39;utilisation ou notre politique de confidentialité ?
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contactez notre équipe juridique
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
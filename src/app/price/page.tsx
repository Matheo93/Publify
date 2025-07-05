'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Navigation from '@/components/navigation';

export default function PricingPage() {
  const features = {
    premium: [
      "Publication sur 2 réseaux sociaux",
      "5 publications programmées",
      "Analytics basiques",
      "Support email",
      "1 utilisateur"
    ],
    pro: [
      "Publication sur 4 réseaux sociaux",
      "Publications programmées illimitées",
      "Analytics avancés",
      "Support prioritaire",
      "3 utilisateurs",
      "Personnalisation avancée",
      "Export des statistiques",
      "Suggestions d'hashtags"
    ],
    enterprise: [
      "Publication sur tous les réseaux",
      "Publications programmées illimitées",
      "Analytics en temps réel",
      "Support dédié 24/7",
      "Utilisateurs illimités",
      "API personnalisée",
      "Formation personnalisée",
      "Account manager dédié",
      "SLA garanti"
    ]
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16"> {/* Ajout de pt-16 pour le header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez le plan qui vous correspond
            </h1>
            <p className="text-xl text-gray-600">
              Toutes nos offres incluent 14 jours d&apos;essai gratuit. Pas de carte bancaire requise.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Premium Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-200 hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">19€</span>
                  <span className="text-gray-500 ml-2">/mois</span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
                  Commencer l&apos;essai gratuit
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-500 transform transition-all duration-200 hover:scale-105 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                PLUS POPULAIRE
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">49€</span>
                  <span className="text-gray-500 ml-2">/mois</span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
                  Commencer l&apos;essai gratuit
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-200 hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Entreprise</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Sur mesure</span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                  Contacter l&apos;équipe commerciale
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {features.enterprise.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Des questions ?</h2>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Consultez notre FAQ
            </button>
            <p className="mt-4 text-gray-600">
              Ou contactez-nous directement à{' '}
              <a href="mailto:support@publify.com" className="text-blue-500 hover:text-blue-600">
                support@publify.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
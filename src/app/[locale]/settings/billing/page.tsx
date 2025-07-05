// src/app/[locale]/settings/billing/page.tsx
'use client';

import React from 'react';
import Navigation from '@/components/navigation';
import { Check, Download } from 'lucide-react';

const BillingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '19€',
      features: ['2 réseaux sociaux', '5 posts programmés', 'Analytics basiques'],
      current: false
    },
    {
      name: 'Pro',
      price: '49€',
      features: ['4 réseaux sociaux', 'Posts illimités', 'Analytics avancés'],
      current: true,
      badge: 'POPULAIRE'
    },
    {
      name: 'Enterprise',
      price: '199€',
      features: ['Réseaux illimités', 'API personnalisée', 'Support dédié'],
      current: false
    }
  ];

  const paymentHistory = [
    { date: '01/03/2024', amount: '49.00€', status: 'Payé', invoice: 'INV-2024-001' },
    { date: '01/02/2024', amount: '49.00€', status: 'Payé', invoice: 'INV-2024-002' },
    { date: '01/01/2024', amount: '49.00€', status: 'Payé', invoice: 'INV-2024-003' }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Facturation</h1>
            <p className="mt-1 text-gray-500">Gérez votre abonnement et consultez l&39;historique de vos paiements</p>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Moyen de paiement</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="5" width="20" height="14" rx="2" className="stroke-current" strokeWidth="2"/>
                      <path d="M2 10H22" className="stroke-current" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Carte terminant par 4242</p>
                    <p className="text-sm text-gray-500">Expire en 12/2025</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Modifier
                </button>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Plan actuel</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`rounded-xl border p-6 relative ${
                      plan.current
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      {plan.current && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Actuel
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-600">
                          <Check className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <button className="mt-6 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Passer au plan {plan.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Historique des paiements</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Facture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentHistory.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span className="text-sm">PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronDown, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/components/navigation'; // Correction de l'import

const FAQItems = [
  // ... reste du code identique
  {
    question: "Comment programmer une publication ?",
    answer: "Pour programmer une publication, créez d'abord votre contenu puis cliquez sur 'Programmer' en bas de l'éditeur. Vous pourrez alors choisir la date et l'heure de publication souhaitées."
  },
  {
    question: "Comment connecter mes réseaux sociaux ?",
    answer: "Rendez-vous dans l'onglet 'Réseaux sociaux' de votre tableau de bord. Cliquez sur 'Connecter' pour chaque réseau social que vous souhaitez ajouter et suivez les étapes d'authentification."
  },
  {
    question: "Quelle est la taille maximale des médias ?",
    answer: "Les images peuvent faire jusqu'à 10MB et les vidéos jusqu'à 200MB. Nous supportons les formats JPG, PNG, et MP4."
  },
  {
    question: "Comment gérer mes publications programmées ?",
    answer: "Toutes vos publications programmées sont visibles dans l'onglet 'Programmés'. Vous pouvez les modifier ou les annuler jusqu'à leur publication."
  }
];

const recentTickets = [
  {
    id: 1,
    title: "Problème de connexion LinkedIn",
    status: "resolved",
    date: "2024-03-10T10:30:00"
  },
  {
    id: 2,
    title: "Question sur la programmation",
    status: "pending",
    date: "2024-03-11T15:45:00"
  }
];

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQ = FAQItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16"> {/* Ajout du pt-16 pour le header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explorez notre centre d&#39;aide ou contactez notre équipe de support pour toute question.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-gray-600 mb-4">Discutez avec notre équipe de support en temps réel.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Démarrer une conversation →
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Envoyez-nous un email, nous répondons sous 24h.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Envoyer un email →
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support téléphonique</h3>
              <p className="text-gray-600 mb-4">Pour nos clients Premium et Entreprise.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Voir le numéro →
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-16 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredFAQ.map((item, index) => (
                <div key={index} className="p-6">
                  <button
                    className="w-full flex justify-between items-center text-left"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        openFAQ === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <p className="mt-4 text-gray-600">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Vos tickets récents</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Nouveau ticket
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    {ticket.status === 'resolved' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {ticket.status === 'resolved' ? 'Résolu' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
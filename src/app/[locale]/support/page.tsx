// src/app/[locale]/support/page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronDown, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/components/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SupportPage() {
  const { dictionary } = useLanguage();
  const { support } = dictionary;
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const FAQItems = [
    {
      question: support.faq.scheduling.question,
      answer: support.faq.scheduling.answer
    },
    {
      question: support.faq.networks.question,
      answer: support.faq.networks.answer
    },
    {
      question: support.faq.media.question,
      answer: support.faq.media.answer
    },
    {
      question: support.faq.manage.question,
      answer: support.faq.manage.answer
    }
  ];

  const recentTickets = [
    {
      id: 1,
      title: support.tickets.linkedinIssue,
      status: "resolved",
      date: "2024-03-10T10:30:00"
    },
    {
      id: 2,
      title: support.tickets.schedulingQuestion,
      status: "pending",
      date: "2024-03-11T15:45:00"
    }
  ];

  const filteredFAQ = FAQItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {support.header.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {support.header.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{support.channels.chat.title}</h3>
              <p className="text-gray-600 mb-4">{support.channels.chat.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                {support.channels.chat.action} →
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{support.channels.email.title}</h3>
              <p className="text-gray-600 mb-4">{support.channels.email.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                {support.channels.email.action} →
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{support.channels.phone.title}</h3>
              <p className="text-gray-600 mb-4">{support.channels.phone.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                {support.channels.phone.action} →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-16 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{support.faq.title}</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={support.faq.searchPlaceholder}
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{support.tickets.title}</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {support.tickets.newTicket}
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
                    {ticket.status === 'resolved' ? support.tickets.resolved : support.tickets.pending}
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
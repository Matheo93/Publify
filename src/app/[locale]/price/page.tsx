// src/app/[locale]/price/page.tsx
'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Navigation from '@/components/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingPage() {
  const { dictionary } = useLanguage();
  const { pricing } = dictionary;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {pricing.header.title}
            </h1>
            <p className="text-xl text-gray-600">
              {pricing.header.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-200 hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pricing.plans.premium.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">{pricing.plans.premium.price}€</span>
                  <span className="text-gray-500 ml-2">{pricing.plans.premium.period}</span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
                  {pricing.plans.premium.cta}
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {pricing.plans.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-500 transform transition-all duration-200 hover:scale-105 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                {pricing.plans.pro.badge}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pricing.plans.pro.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">{pricing.plans.pro.price}€</span>
                  <span className="text-gray-500 ml-2">{pricing.plans.pro.period}</span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
                  {pricing.plans.pro.cta}
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {pricing.plans.pro.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-200 hover:scale-105">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pricing.plans.enterprise.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {pricing.plans.enterprise.price}
                  </span>
                </div>
                <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                  {pricing.plans.enterprise.cta}
                </button>
              </div>
              <div className="border-t border-gray-100 p-8 bg-gray-50">
                <ul className="space-y-4">
                  {pricing.plans.enterprise.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{pricing.faq.title}</h2>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              {pricing.faq.consultFaq}
            </button>
            <p className="mt-4 text-gray-600">
              {pricing.faq.contactPrefix}{' '}
              <a href={`mailto:${pricing.faq.contactEmail}`} className="text-blue-500 hover:text-blue-600">
                {pricing.faq.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
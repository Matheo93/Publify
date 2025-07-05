'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "border-blue-500 text-gray-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo container with increased spacing */}
            <Link href="/" className="flex-shrink-0 flex items-center pr-12">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Publify</span>
            </Link>
            <div className="hidden sm:flex sm:space-x-8 items-center">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/')}`}
              >
                Publisher
              </Link>
              <Link
                href="/draft"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/draft')}`}
              >
                Mes Brouillons
              </Link>
              <Link
                href="/price"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium group ${isActive('/price')}`}
              >
                Upgrade
                <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full group-hover:opacity-90">
                  New
                </span>
              </Link>
              <Link
                href="/support"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/support')}`}
              >
                Support
              </Link>
              <Link
                href="/privacy-terms"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/privacy-terms')}`}
              >
                Termes
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-500">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
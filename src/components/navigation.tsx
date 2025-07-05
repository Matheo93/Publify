'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserMenu } from './ui/profile-menu';

const Navigation = () => {
  const pathname = usePathname();
  const { dictionary, locale } = useLanguage();

  const isActive = (path: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    const targetPath = path.startsWith('/') ? path.slice(1) : path;
    
    return currentPath === targetPath
      ? "border-blue-500 text-gray-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  const navigationLinks = [
    { href: '/', label: dictionary.navigation.publisher },
    { href: '/draft', label: dictionary.navigation.drafts },
    { 
      href: '/price', 
      label: dictionary.navigation.upgrade,
      badge: dictionary.navigation.new 
    },
    { href: '/support', label: dictionary.navigation.support },
    { href: '/privacy-terms', label: dictionary.navigation.terms }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href={getLocalizedPath('/')} 
              className="flex-shrink-0 flex items-center pr-12"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Publify
              </span>
            </Link>

            <div className="hidden sm:flex sm:space-x-8 items-center">
              {navigationLinks.map(({ href, label, badge }) => (
                <Link
                  key={href}
                  href={getLocalizedPath(href)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(href)}`}
                >
                  {label}
                  {badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full group-hover:opacity-90">
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
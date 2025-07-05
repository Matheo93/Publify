'use client';

import { useState, useEffect } from 'react'; // Ajout de useEffect
import { useSession, signOut } from 'next-auth/react';
import { Bell, Settings, LogOut, User as UserIcon, CreditCard, HelpCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export const UserMenu = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Effet pour fermer l'autre menu lorsqu'un menu est ouvert
  useEffect(() => {
    if (showMenu) {
      setShowNotifications(false);
    }
  }, [showMenu]);

  useEffect(() => {
    if (showNotifications) {
      setShowMenu(false);
    }
  }, [showNotifications]);

  const notifications = [
    {
      id: 1,
      text: "Votre post LinkedIn a été publié avec succès !",
      time: "Il y a 5 minutes",
      read: false
    },
    {
      id: 2,
      text: "Post programmé pour demain à 14h00",
      time: "Il y a 1 heure",
      read: true
    }
  ];

  const menuItems = [
    {
      label: "Mon compte",
      icon: UserIcon,
      href: "/settings/account"
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "/settings"
    },
    {
      label: "Facturation",
      icon: CreditCard,
      href: "/settings/billing"
    },
    {
      label: "Sécurité",
      icon: Lock,
      href: "/settings/security"
    },
    {
      label: "Aide",
      icon: HelpCircle,
      href: "/support"
    }
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const getUserInitials = (user?: { email?: string | null }) => {
    const email = user?.email ?? ''; // Gestion de null/undefined
    if (!email) return 'G'; // Retourne 'G' si email est vide
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications((prev) => !prev); // Inverse l'état actuel
            setShowMenu(false); // Ferme le menu utilisateur
          }}
          className="relative bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-500"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="text-sm text-gray-800">{notification.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu utilisateur */}
      <div className="relative">
        <button
          onClick={() => {
            setShowMenu((prev) => !prev); // Inverse l'état actuel
            setShowNotifications(false); // Ferme les notifications
          }}
          className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Menu utilisateur"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
            {getUserInitials(session?.user)}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {session?.user?.email || 'Guest'}
          </span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{session?.user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">Plan Pro</p>
            </div>
            
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import { Camera } from 'lucide-react';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setPreviewImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres du compte</h1>
            <p className="mt-1 text-gray-500">Gérez vos informations personnelles et vos préférences</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Informations du profil</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              {/* Photo de profil */}
              <div className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {previewImage ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden relative">
                        <Image
                          src={previewImage}
                          alt="Photo de profil"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                    )}
                    {isEditing && (
                      <>
                        <input
                          ref={fileInputRef}
                          id="photo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                        >
                          <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
                    <p className="text-sm text-gray-500">
                      Cette photo sera affichée sur votre profil et vos publications
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poste
                    </label>
                    <input
                      type="text"
                      defaultValue="Marketing Manager"
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      defaultValue="TechCorp"
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      https://
                    </span>
                    <input
                      type="text"
                      defaultValue="www.techcorp.com"
                      disabled={!isEditing}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    defaultValue="Marketing professionnel passionné par les stratégies digitales et le growth hacking."
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Préférences */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Langue de l&#39;interface
                  </label>
                  <select
                    defaultValue="fr"
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="p-6 bg-gray-50 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Zone de danger */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-red-200">
            <div className="px-6 py-4 border-b border-red-200 bg-red-50">
              <h2 className="text-xl font-semibold text-red-900">Zone de danger</h2>
            </div>
            <div className="p-6 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-8">
                  <h3 className="text-lg font-medium text-gray-900">Supprimer votre compte</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    La suppression de votre compte est permanente. Toutes vos données seront définitivement effacées.
                  </p>
                </div>
                <button 
                  type="button"
                  className="shrink-0 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Supprimer le compte
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 mr-8">
                  <h3 className="text-lg font-medium text-gray-900">Exporter vos données</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Téléchargez une copie complète de vos données Publify au format JSON.
                  </p>
                </div>
                <button 
                  type="button"
                  className="shrink-0 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Exporter les données
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
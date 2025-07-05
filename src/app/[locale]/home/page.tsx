"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Share2, Calendar, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const router = useRouter();
  const { dictionary } = useLanguage();

  const handleNavigation = () => {
    router.push("/");
  };

  const Auth = () => {
    router.push("/auth");
  };

  const scrollToFeatures = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      title: dictionary.features.crossPlatform.title,
      description: dictionary.features.crossPlatform.description,
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
    },
    {
      title: dictionary.features.scheduling.title,
      description: dictionary.features.scheduling.description,
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
    },
    {
      title: dictionary.features.analytics.title,
      description: dictionary.features.analytics.description,
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />,
    },
  ];

  return (
    <div className="bg-white">
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold">Publify</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={Auth}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {dictionary.auth.signIn.title}
              </button>
              <button
                onClick={Auth}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                {dictionary.auth.tryFree}
              </button>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {dictionary.hero.title}{" "}
              <span className="text-blue-600">{dictionary.hero.highlight}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 mx-auto max-w-2xl">
              {dictionary.hero.description}
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <button
                onClick={handleNavigation}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500"
              >
                {dictionary.hero.cta.primary}
              </button>
              <button
                onClick={scrollToFeatures}
                className="flex items-center gap-2 text-sm font-medium text-gray-900"
              >
                {dictionary.hero.cta.secondary} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] bg-white rounded-xl border-2 border-gray-100 shadow-xl overflow-hidden">
              <div className="h-12 bg-white border-b border-gray-100 flex items-center px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100" />
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded mb-4" />
                  <div className="aspect-video bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 mb-2" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="h-8 w-8 rounded-lg bg-indigo-100 mb-2" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-14 h-14 bg-blue-600 rounded-xl rotate-12 shadow-lg flex items-center justify-center text-white font-bold">
              𝕏
            </div>
            <div className="absolute top-1/3 -left-6 w-14 h-14 bg-blue-500 rounded-xl -rotate-12 shadow-lg flex items-center justify-center text-white font-bold">
              in
            </div>
            <div className="absolute bottom-1/3 -right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl rotate-12 shadow-lg flex items-center justify-center text-white font-bold">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl -rotate-12 shadow-lg flex items-center justify-center text-white font-bold">
              <span className="text-lg">fb</span>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              {dictionary.features.heading}
            </h2>
            <p className="text-lg text-gray-600">{dictionary.features.subheading}</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
              >
                <div className="mx-auto w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold">{dictionary.cta.heading}</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            {dictionary.cta.subheading}
          </p>
          <div className="mt-10">
            <button
              onClick={handleNavigation}
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
              {dictionary.cta.button}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
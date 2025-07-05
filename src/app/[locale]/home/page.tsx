"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Share2, Calendar, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage = () => {
  const router = useRouter();
  const { dictionary } = useLanguage();

  const handleNavigation = () => router.push("/");
  const Auth = () => router.push("/auth");



  return (
<div className="bg-white">
  {/* Header fixe */}
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <nav className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo et liens de navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center text-blue-600 font-bold">
            </div>
            <span className="text-xl font-bold">Publify</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>

        {/* Boutons d'authentification */}
        <div className="flex items-center gap-4">
          <button onClick={Auth} className="text-sm text-gray-600 hover:text-gray-900">
            {dictionary.auth.signIn.title}
          </button>
          <button onClick={Auth} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            {dictionary.auth.tryFree}
          </button>
        </div>
      </div>
    </nav>
  </header>

  {/* Section héro avec interface preview */}
  <section className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-[72px]">
    <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          {dictionary.hero.title}{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-blue-600">
              {dictionary.hero.highlight}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 mx-auto max-w-2xl">
          {dictionary.hero.description}
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <button
            onClick={handleNavigation}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            {dictionary.hero.cta.primary}
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            {dictionary.hero.cta.secondary}
          </button>
        </div>
      </div>

      {/* Interface Preview */}
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

        {/* Social Media Icons */}
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
  </section>

{/* Features and CTA Combined Section */}
<section id="features" className="relative overflow-hidden bg-blue-600 py-32">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url(/images/backgrounds/background-features.5f7a9ac9.jpg)",
      backgroundSize: "cover",
      opacity: 0.4,
    }}
  />
  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Features Content */}
    <div className="mx-auto max-w-2xl md:text-center">
      <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
        {dictionary.features.heading}
      </h2>
      <p className="mt-6 text-lg tracking-tight text-blue-100">
        {dictionary.features.subheading}
      </p>
    </div>

    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="relative bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <Share2 className="h-10 w-10 text-white mb-6" />
        <h3 className="text-lg font-semibold text-white mb-2">
          {dictionary.features.crossPlatform.title}
        </h3>
        <p className="text-blue-100">
          {dictionary.features.crossPlatform.description}
        </p>
      </div>
      <div className="relative bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <Calendar className="h-10 w-10 text-white mb-6" />
        <h3 className="text-lg font-semibold text-white mb-2">
          {dictionary.features.scheduling.title}
        </h3>
        <p className="text-blue-100">
          {dictionary.features.scheduling.description}
        </p>
      </div>
      <div className="relative bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <BarChart3 className="h-10 w-10 text-white mb-6" />
        <h3 className="text-lg font-semibold text-white mb-2">
          {dictionary.features.analytics.title}
        </h3>
        <p className="text-blue-100">
          {dictionary.features.analytics.description}
        </p>
      </div>
    </div>

    {/* CTA Content */}
    <div className="mt-32 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {dictionary.cta.heading}
      </h2>
      <p className="mt-6 text-lg text-blue-100 mx-auto max-w-2xl">
        {dictionary.cta.subheading}
      </p>
      <button
        onClick={handleNavigation}
        className="mt-10 rounded-full bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
      >
        {dictionary.cta.button}
      </button>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by businesses worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3">
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 p-8">
              <blockquote className="text-gray-900">
                <p>
                  &quot;Publify has transformed how we manage our social media
                  presence. The scheduling features save us hours every
                  week.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-50" />
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-gray-600">
                    Marketing Director at TechFlow
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 p-8">
              <blockquote className="text-gray-900">
                <p>
                  &quot;The analytics insights have helped us optimize our
                  content strategy and grow our engagement significantly.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-50" />
                <div>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-gray-600">
                    Social Media Manager at GrowthCo
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 p-8">
              <blockquote className="text-gray-900">
                <p>
                  &quot;The cross-platform publishing feature is a game-changer.
                  One click to reach all our audiences simultaneously.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-50" />
                <div>
                  <div className="font-semibold">Emma Thompson</div>
                  <div className="text-gray-600">CEO at BrandBoost</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-white py-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(/images/backgrounds/background-features.5f7a9ac9.jpg)",
            backgroundSize: "cover",
            opacity: 0.2, // Une faible opacité pour maintenir la lisibilité
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-lg font-semibold leading-7 text-blue-600">
              Pricing
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose the perfect plan for your needs
            </p>
          </div>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Starter Plan */}
            <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 bg-slate-100">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  Starter
                </h3>
                <p className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-600">
                  Most popular
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Perfect for small businesses just getting started with social
                media.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  $15
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /month
                </span>
              </p>
              <button
                onClick={handleNavigation}
                className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 w-full"
              >
                Get started
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  3 social networks
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  30 scheduled posts per month
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Basic analytics
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 bg-gray-900">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-white">
                  Pro
                </h3>
                <p className="rounded-full bg-gray-700 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                  Popular
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                For growing businesses that need more power and flexibility.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  $49
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-300">
                  /month
                </span>
              </p>
              <button
                onClick={handleNavigation}
                className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white w-full"
              >
                Get started
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Unlimited social networks
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Unlimited scheduled posts
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Advanced analytics
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 bg-slate-100">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  Enterprise
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Custom solutions for large organizations with advanced needs.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  Custom
                </span>
              </p>
              <button
                onClick={handleNavigation}
                className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 w-full"
              >
                Contact sales
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Custom features
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Dedicated support
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  Custom integrations
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.293-11.707a1 1 0 0 0-1.414-1.414L8 8.586 6.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                  </svg>
                  SLA guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(/images/backgrounds/background-faqs.55d2e36a.jpg)",
            backgroundSize: "cover",
            opacity: 0.8,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              <div className="pt-6">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  How does the scheduling feature work?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our scheduling feature lets you plan and schedule your social
                  media posts across multiple platforms in advance. Simply
                  create your content, select your networks, choose your date
                  and time, and we&#39;ll handle the rest.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  What social networks do you support?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We currently support all major social networks including
                  LinkedIn, Twitter, Facebook, and Instagram. We&#39;re
                  constantly adding more platforms based on user demand.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  Can I try before I buy?
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Yes! We offer a 14-day free trial on all our plans. No credit
                  card required. You&#39;ll have access to all features during
                  your trial period.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  P
                </div>
                <span className="ml-4 text-xl font-bold text-white">
                  Publify
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-300">
                Simplifying social media management for businesses worldwide.
              </p>
              <div className="flex space-x-6">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Social Media Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Content Planning
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Analytics
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Team Collaboration
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        API Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Community
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Status
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Partners
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        Data Protection
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Publify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

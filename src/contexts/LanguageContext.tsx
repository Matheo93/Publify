// src/contexts/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ValidLocale, defaultLocale, getDictionary, Dictionary } from '@/i18n/config'

interface LanguageContextType {
  locale: ValidLocale
  dictionary: Dictionary
  setLocale: (locale: ValidLocale) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ 
  children,
  initialLocale = defaultLocale,
  initialDictionary
}: { 
  children: React.ReactNode
  initialLocale?: ValidLocale
  initialDictionary: Dictionary
}) {
  const [locale, setLocale] = useState<ValidLocale>(initialLocale)
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary)

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale)
      setDictionary(dict)
    }
    loadDictionary()
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
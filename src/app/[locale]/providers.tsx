// src/app/[locale]/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ValidLocale } from '@/i18n/config'
import { Dictionary } from '@/i18n/config'
import { Session } from 'next-auth'

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
  initialLocale: ValidLocale;
  initialDictionary: Dictionary;
}

export default function Providers({
  children,
  session,
  initialLocale,
  initialDictionary
}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <LanguageProvider 
        initialLocale={initialLocale} 
        initialDictionary={initialDictionary}
      >
        {children}
      </LanguageProvider>
    </SessionProvider>
  )
}
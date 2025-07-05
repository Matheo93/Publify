// src/app/[locale]/layout.tsx
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { ValidLocale, getDictionary } from '@/i18n/config'
import AuthProvider from '../providers'
import { LanguageProvider } from '@/contexts/LanguageContext'
import '../globals.css'
import { authOptions } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: ValidLocale }
}) {
  const session = await getServerSession(authOptions)
  const dictionary = await getDictionary(locale)
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <LanguageProvider initialLocale={locale} initialDictionary={dictionary}>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
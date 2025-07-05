// src/app/layout.tsx
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import AuthProvider from './providers'
import './globals.css'
import { authOptions } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
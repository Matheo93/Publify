// src/app/[locale]/layout.tsx
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { ValidLocale, getDictionary } from "@/i18n/config";
import AuthProvider from "./providers";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";
import { authOptions } from "@/lib/auth-config";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: ValidLocale }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AuthProvider
          session={session}
          initialLocale={locale}
          initialDictionary={dictionary}
        >
          <LanguageProvider
            initialLocale={locale}
            initialDictionary={dictionary}
          >
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import LinkedInProvider from 'next-auth/providers/linkedin'
import TwitterProvider from "next-auth/providers/twitter"
import { JWT } from 'next-auth/jwt'
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    provider?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
  }
}

interface Token extends JWT {
  accessToken?: string;
  provider?: string;
}

interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  profilePicture?: {
    'displayImage~'?: {
      elements?: Array<{
        identifiers?: Array<{
          identifier: string;
        }>;
      }>;
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { 
          scope: 'r_basicprofile w_member_social email'
        }
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/me'
      },
      profile(profile: LinkedInProfile) {
        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: null,
          image: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || null,
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: "tweet.read tweet.write users.read follows.read follows.write"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Stocker le token d'accès et le provider
        token.accessToken = account.access_token;
        token.provider = account.provider;
        
        // Pour Twitter, stocker aussi le token secret si nécessaire
        if (account.provider === 'twitter') {
          token.oauth_token = account.oauth_token;
          token.oauth_token_secret = account.oauth_token_secret;
        }
      }
      return token as Token;
    },
    async session({ session, token }) {
      if (token) {
        // Transmettre les informations importantes à la session
        session.accessToken = token.accessToken as string;
        session.provider = token.provider as string;
        
        // Pour Twitter
        if (token.provider === 'twitter') {
          session.oauth_token = token.oauth_token as string;
          session.oauth_token_secret = token.oauth_token_secret as string;
        }
      }
      return session;
    },
    async redirect({ baseUrl }) {
      // Toujours rediriger vers la racine
      return baseUrl;
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET
}
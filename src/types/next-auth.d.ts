import 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    provider?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}
// src/lib/auth-config.ts
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import CognitoProvider from "next-auth/providers/cognito";
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand,
  AuthFlowType 
} from "@aws-sdk/client-cognito-identity-provider";

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  cognitoGroups: string[];
  accessToken: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      cognitoGroups: string[];
    };
    accessToken?: string;
    provider?: string;
    cognitoToken?: {
      accessToken: string;
      idToken: string;
      refreshToken: string;
    };
  }

  interface User extends Omit<AuthUser, 'cognitoGroups'> {
    cognitoGroups: string[];
  }

  interface JWT {
    id?: string;
    cognitoAccessToken?: string;
    cognitoIdToken?: string;
    cognitoRefreshToken?: string;
    cognitoGroups: string[];
    accessToken?: string;
    provider?: string;
  }
}

interface DecodedToken {
  sub: string;
  email: string;
  name?: string;
  'cognito:groups'?: string[];
  [key: string]: unknown;
}

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

async function authenticateWithCognito(email?: string, password?: string): Promise<AuthUser> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    });

    const authResponse = await cognitoClient.send(command);
    
    if (!authResponse.AuthenticationResult) {
      throw new Error("Authentication failed");
    }

    const { AccessToken, IdToken } = authResponse.AuthenticationResult;
    
    const tokenParts = IdToken.split('.');
    const payload = JSON.parse(
      Buffer.from(tokenParts[1], 'base64').toString()
    ) as DecodedToken;

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      cognitoGroups: payload['cognito:groups'] || [],
      accessToken: AccessToken
    };
  } catch (error) {
    console.error('Cognito authentication error:', error);
    throw error;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: 'dummy-secret',
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none'
      },
      authorization: {
        params: {
          scope: "openid email profile",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<AuthUser | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          
          return await authenticateWithCognito(
            credentials.email,
            credentials.password
          );
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: { scope: "r_basicprofile w_member_social" }
      },
      client: { 
        token_endpoint_auth_method: 'client_secret_post' 
      },
      userinfo: {
        url: "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)",
      },
      profile(profile) {
        return {
          id: profile.id,
          name: `${profile.localizedFirstName || ''} ${profile.localizedLastName || ''}`.trim(),
          email: profile.id + "@linkedin.example.com", 
          image: null,
          cognitoGroups: [],
          accessToken: ""
        };
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
    async jwt({ token, user, account }) {
      if (!token.cognitoGroups) {
        token.cognitoGroups = [];
      }

      if (user) {
        token.id = user.id;
        token.cognitoGroups = user.cognitoGroups || [];
      }

      // For OAuth tokens (LinkedIn, Twitter)
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        
        if (!token.id && account.providerAccountId) {
          token.id = account.providerAccountId;
        }
      }

      if (account?.provider === "cognito" && account.id_token) {
        token.cognitoAccessToken = account.access_token;
        token.cognitoIdToken = account.id_token;
        token.cognitoRefreshToken = account.refresh_token;
        
        try {
          const payload = account.id_token.split('.')[1];
          const decodedPayload = Buffer.from(payload, 'base64').toString();
          const decodedToken = JSON.parse(decodedPayload) as DecodedToken;
          token.cognitoGroups = decodedToken['cognito:groups'] || [];
        } catch (error) {
          console.error('Error decoding Cognito token:', error);
          token.cognitoGroups = [];
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.cognitoGroups = Array.isArray(token.cognitoGroups) ? 
          token.cognitoGroups : 
          [];
        
        // Add access token to session
        session.accessToken = token.accessToken as string;
        session.provider = token.provider as string;
        
        if (
          typeof token.cognitoAccessToken === 'string' && 
          typeof token.cognitoIdToken === 'string' && 
          typeof token.cognitoRefreshToken === 'string'
        ) {
          session.cognitoToken = {
            accessToken: token.cognitoAccessToken,
            idToken: token.cognitoIdToken,
            refreshToken: token.cognitoRefreshToken
          };
        }
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth",
    error: '/auth/error',
    signOut: '/auth/signout'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
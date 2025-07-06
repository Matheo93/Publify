// src/lib/cognito-config.ts
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognitoConfig = {
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  clientId: process.env.COGNITO_CLIENT_ID!,
  region: process.env.AWS_REGION!
};

export const cognitoClient = new CognitoIdentityProviderClient({
  region: cognitoConfig.region
});
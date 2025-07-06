// src/app/api/auth/resend-code/route.ts
import { NextResponse } from 'next/server';
import { 
  CognitoIdentityProviderClient, 
  ResendConfirmationCodeCommand
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();
    
    // Use the appropriate identifier for resending code
    // Prefer username if provided, otherwise use email
    const identifierToUse = username || email;

    console.log('Resending code for:', identifierToUse);

    const command = new ResendConfirmationCodeCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: identifierToUse,
    });

    await cognitoClient.send(command);

    return NextResponse.json({
      success: true,
      message: 'Verification code resent successfully'
    });

  } catch (error) {
    console.error('Resend code error:', error);
    return NextResponse.json(
      { error: 'Failed to resend verification code' },
      { status: 400 }
    );
  }
}
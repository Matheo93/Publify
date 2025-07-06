import { NextResponse } from 'next/server';
import { 
  CognitoIdentityProviderClient, 
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

export async function POST(req: Request) {
  try {
    const { code, email, username } = await req.json();
    
    // Nettoyer le code avant de l'envoyer à Cognito
    const cleanCode = code.toString().trim();
    
    // Use the appropriate identifier for confirmation
    // Prefer username if provided, otherwise use email
    const identifierToUse = username || email;
    
    console.log('Confirming signup with:', {
      code: cleanCode,
      identifier: identifierToUse
    });

    const command = new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: identifierToUse,
      ConfirmationCode: cleanCode,
    });

    await cognitoClient.send(command);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Code de vérification invalide' },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { email, username } = await req.json();
    
    // Use the appropriate identifier for resending code
    // Prefer username if provided, otherwise use email
    const identifierToUse = username || email;

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
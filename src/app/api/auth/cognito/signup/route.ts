import { NextResponse } from 'next/server';
import { 
  CognitoIdentityProviderClient,
  SignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

export async function POST(req: Request) {
  try {
    const { username, email, password, name } = await req.json();

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'name',
          Value: name || email
        }
      ]
    });

    await cognitoClient.send(command);

    return NextResponse.json({
      success: true,
      message: 'Please check your email for verification code'
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 400 }
    );
  }
}
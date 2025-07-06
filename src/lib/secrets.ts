// src/lib/secrets.ts
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

export async function loadSecrets() {
    const command = new GetSecretValueCommand({
        SecretId: process.env.SECRETS_ARN,
    });

    try {
        const response = await secretsClient.send(command);
        const secrets = JSON.parse(response.SecretString || '{}');
        
        // Set environment variables securely
        process.env.DATABASE_URL = secrets.DATABASE_URL;
        process.env.AWS_ACCESS_KEY_ID = secrets.AWS_ACCESS_KEY_ID;
        process.env.AWS_SECRET_ACCESS_KEY = secrets.AWS_SECRET_ACCESS_KEY;
        process.env.LINKEDIN_CLIENT_ID = secrets.LINKEDIN_CLIENT_ID;
        process.env.LINKEDIN_CLIENT_SECRET = secrets.LINKEDIN_CLIENT_SECRET;
    } catch (error) {
        console.error('Failed to load secrets:', error);
        throw error;
    }
}
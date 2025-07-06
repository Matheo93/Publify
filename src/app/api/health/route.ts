// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          status: 'unhealthy', 
          error: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed' 
      },
      { status: 500 }
    );
  }
}
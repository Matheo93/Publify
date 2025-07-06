# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database operations
npx prisma generate    # Generate Prisma client
npx prisma db push     # Push schema changes
npx prisma migrate dev # Create migration

# Docker operations
docker-compose up -d   # Start services
docker-compose down    # Stop services
```

## Architecture Overview

This is a Next.js 15 application using the App Router for social media content publishing. The codebase follows a modular architecture with clear separation of concerns.

### Core Structure

**App Router (`src/app/`)**: Uses Next.js 15's app directory with internationalized routing. All pages are under `[locale]` for i18n support. API routes are in `app/api/`.

**Business Logic (`src/services/`)**: Contains all API integrations and business logic:
- `linkedin.ts`: LinkedIn OAuth and posting
- `twitter.ts`: Twitter OAuth and posting  
- `auth.ts`: Authentication utilities
- `storage.ts`: AWS S3 file operations
- `upload.ts`: Media upload handling

**State Management**: Uses React Context API (`src/contexts/`) for:
- `AuthContext`: User authentication state
- `DraftContext`: Draft management
- `UploadContext`: File upload progress

**Database**: PostgreSQL with Prisma ORM. Schema defines User and Draft models with social platform connections.

### Key Patterns

**Authentication Flow**: NextAuth.js with AWS Cognito and social providers. Session data includes user ID and social connections. Protected routes check session in middleware.

**API Structure**: RESTful endpoints under `/api/` handle:
- Draft CRUD operations with user scoping
- Social media posting with OAuth token refresh
- Media uploads to S3 with progress tracking

**Internationalization**: Complete i18n setup with locale routing, middleware detection, and translation dictionaries for en/fr.

**Error Handling**: API routes return consistent error responses. Client-side uses try-catch with user-friendly messages.

### Environment Configuration

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection
- `NEXTAUTH_SECRET`: Session encryption
- `AWS_*`: S3, Cognito, and Secrets Manager credentials
- Social platform OAuth credentials

### Deployment

Uses Docker multi-stage builds with standalone Next.js output. AWS CodeDeploy handles deployments with health checks and lifecycle scripts.
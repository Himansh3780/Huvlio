#!/bin/bash
# Quick commands for AI Application Generator

# Development
npm run dev              # Start local dev server (http://localhost:3000)
npm run build            # Build for production
npm test                 # Run tests

# Database
npx prisma migrate dev   # Create new migration
npx prisma studio       # Open Prisma GUI viewer
npx prisma db push      # Push schema changes to DB

# Deployment
npm run build            # Build
vercel deploy           # Deploy to Vercel staging
vercel deploy --prod    # Deploy to production

# Environment
cp .env.example .env.local   # Create local config file

# Local PostgreSQL (macOS with Homebrew)
brew services start postgresql    # Start DB
brew services stop postgresql     # Stop DB
createdb ai_app_generator         # Create database

# Stripe Testing
# Test card: 4242 4242 4242 4242
# Any future expiry, any CVC
# Use in checkout flow to test payments

# GitHub OAuth Redirect (for development)
# http://localhost:3000/api/auth/callback/github

# Sanity Studio (if using Sanity)
sanity start            # Start local content studio
sanity deploy           # Deploy studio to production

# Generate Secrets
openssl rand -base64 32 # Generate NEXTAUTH_SECRET

# Check for TypeScript errors
npx tsc --noEmit        # Type check without building

# Lint code
npm run lint            # Check code quality
npm run lint -- --fix   # Auto-fix linting issues

# View Database Logs (Vercel Postgres)
vercel env pull         # Pull environment variables

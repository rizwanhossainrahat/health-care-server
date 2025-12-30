#!/bin/bash
set -o errexit

# Ensure devDependencies are installed for TypeScript compilation
export NODE_ENV=development
npm ci --include=dev

# Build the application
npm run build

# Generate Prisma client (with fallback)
npx prisma generate || (echo "Prisma generate failed, trying with schema path..." && npx prisma generate --schema=./prisma/schema/schema.prisma)

# Run database migrations (with fallback)
npx prisma migrate deploy || (echo "Prisma migrate failed, trying with schema path..." && npx prisma migrate deploy --schema=./prisma/schema/schema.prisma)
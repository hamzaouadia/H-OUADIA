# 🛠️ Complete Setup Guide

This guide will walk you through setting up your portfolio website from scratch. Follow each step carefully for a smooth setup process.

## Prerequisites

### Required Software

#### 1. Node.js (v20+ LTS)
```bash
# Check if installed
node --version  # Should be v20.x or higher
npm --version

# Install via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Download:** https://nodejs.org/

#### 2. pnpm (Package Manager)
```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version  # Should be v9.x or higher
```

#### 3. Git
```bash
# Check if installed
git --version

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 4. VS Code (Recommended)
- Download: https://code.visualstudio.com/
- Extensions to install:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma
  - TypeScript Vue Plugin (Volar)
  - Error Lens
  - GitLens

#### 5. PostgreSQL (Local Development)
```bash
# Option 1: Install locally
# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/

# Option 2: Use Docker (easier)
docker run --name portfolio-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  -d postgres:16

# Option 3: Use cloud service (recommended for beginners)
# - Supabase (free tier): https://supabase.com
# - Neon (free tier): https://neon.tech
# - Railway (free trial): https://railway.app
```

## Step-by-Step Setup

### Step 1: Initialize Project

```bash
# Navigate to your workspace
cd /home/mak3r/Desktop/H-OUADIA

# Initialize Next.js project with TypeScript
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Answer the prompts:
# ✔ Would you like to use TypeScript? … Yes
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Tailwind CSS? … Yes
# ✔ Would you like to use `src/` directory? … Yes
# ✔ Would you like to use App Router? … Yes
# ✔ Would you like to customize the default import alias (@/*)? … No
```

### Step 2: Install Dependencies

```bash
# Core dependencies
pnpm add @prisma/client @tanstack/react-query zustand framer-motion
pnpm add react-hook-form @hookform/resolvers zod
pnpm add lucide-react class-variance-authority clsx tailwind-merge
pnpm add next-themes resend

# Dev dependencies
pnpm add -D prisma
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D eslint-config-prettier eslint-plugin-tailwindcss
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
pnpm add -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
pnpm add -D @playwright/test

# shadcn/ui setup (we'll add components individually)
pnpm dlx shadcn-ui@latest init

# Answer the prompts:
# ✔ Which style would you like to use? › Default
# ✔ Which color would you like to use as base color? › Slate
# ✔ Would you like to use CSS variables for colors? › Yes
```

### Step 3: Configure shadcn/ui Components

```bash
# Install commonly used components
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add textarea
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add badge
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add skeleton
pnpm dlx shadcn-ui@latest add toast
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add sheet
pnpm dlx shadcn-ui@latest add tabs
```

### Step 4: Set Up Prisma

```bash
# Initialize Prisma
pnpm prisma init

# This creates:
# - prisma/schema.prisma
# - .env (with DATABASE_URL)
```

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String   @db.Text
  image       String
  demoUrl     String?
  githubUrl   String?
  tags        Tag[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([published, featured, order])
}

model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  color     String    @default("#3b82f6")
  projects  Project[]
  createdAt DateTime  @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  read      Boolean  @default(false)
  replied   Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([read, replied, createdAt])
}

model Newsletter {
  id         String   @id @default(cuid())
  email      String   @unique
  subscribed Boolean  @default(true)
  createdAt  DateTime @default(now())
  
  @@index([subscribed])
}
```

### Step 5: Configure Environment Variables

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"

# For Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"

# For Neon:
# DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Sentry (optional)
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
```

Create `.env.example` (without sensitive values):

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email
RESEND_API_KEY="your_resend_api_key"
CONTACT_EMAIL="your-email@example.com"

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Sentry (optional)
SENTRY_DSN="your_sentry_dsn"
```

### Step 6: Run Database Migrations

```bash
# Generate Prisma Client and push schema to database
pnpm prisma db push

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio to view your database
pnpm prisma studio
```

### Step 7: Configure Git Hooks

```bash
# Initialize Husky
pnpm dlx husky install

# Create hooks directory
mkdir -p .husky

# Add pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
EOF

# Add commit-msg hook
cat > .husky/commit-msg << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint --edit $1
EOF

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

Create `.lintstagedrc.js`:

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css,html,yml,yaml}': ['prettier --write'],
};
```

Create `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code restructuring
        'perf',     // Performance
        'test',     // Testing
        'chore',    // Maintenance
        'revert',   // Revert changes
      ],
    ],
  },
};
```

### Step 8: Configure ESLint & Prettier

Update `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/no-custom-classname": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "off"
  }
}
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.prettierignore`:

```
node_modules
.next
dist
build
coverage
*.log
.env*
public
pnpm-lock.yaml
```

### Step 9: Configure TypeScript

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 10: Configure Next.js

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Step 11: Create Utility Files

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
```

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Step 12: Update Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "prepare": "husky install",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### Step 13: Create Database Seed File

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: { name: 'Next.js', slug: 'nextjs', color: '#000000' },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: { name: 'React', slug: 'react', color: '#61DAFB' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    }),
    prisma.tag.upsert({
      where: { slug: 'tailwind' },
      update: {},
      create: { name: 'Tailwind CSS', slug: 'tailwind', color: '#06B6D4' },
    }),
  ]);

  console.log('✅ Tags created');

  // Create sample project
  const project = await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'A modern, full-stack portfolio website built with Next.js and TypeScript',
      content: 'Full project description here...',
      image: '/images/projects/portfolio.jpg',
      demoUrl: 'https://yourportfolio.com',
      githubUrl: 'https://github.com/yourusername/portfolio',
      featured: true,
      order: 1,
      published: true,
      tags: {
        connect: tags.map(tag => ({ id: tag.id })),
      },
    },
  });

  console.log('✅ Sample project created');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Install tsx for running TypeScript files:

```bash
pnpm add -D tsx
```

Run the seed:

```bash
pnpm db:seed
```

### Step 14: Set Up Git Repository

```bash
# Initialize git (if not already done)
git init

# Create .gitignore (should already exist, but verify it includes:)
# node_modules
# .next
# .env*
# !.env.example
# *.log

# Initial commit
git add .
git commit -m "feat: initial project setup with Next.js, TypeScript, and Prisma"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 15: Start Development Server

```bash
# Start the development server
pnpm dev

# Open in browser
# http://localhost:3000
```

## External Services Setup

### 1. Resend (Email Service)

1. Visit https://resend.com
2. Sign up for free account
3. Verify your email
4. Go to API Keys section
5. Create new API key
6. Copy key to `.env.local` as `RESEND_API_KEY`
7. Add and verify your domain (or use provided testing domain)

### 2. Supabase (Database Hosting)

1. Visit https://supabase.com
2. Create new project
3. Wait for database to initialize
4. Go to Settings → Database
5. Copy connection string
6. Add to `.env.local` as `DATABASE_URL`
7. Run `pnpm db:push` to sync schema

### 3. Vercel (Deployment)

1. Visit https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Configure environment variables
5. Deploy

### 4. Sentry (Error Tracking - Optional)

1. Visit https://sentry.io
2. Create new project (Next.js)
3. Copy DSN
4. Add to `.env.local`
5. Install Sentry: `pnpm add @sentry/nextjs`
6. Run: `pnpm dlx @sentry/wizard@latest -i nextjs`

## Verification Checklist

- [ ] Node.js v20+ installed
- [ ] pnpm installed
- [ ] Git configured
- [ ] PostgreSQL running (local or cloud)
- [ ] Dependencies installed successfully
- [ ] Prisma schema pushed to database
- [ ] Database seeded with sample data
- [ ] Environment variables configured
- [ ] Development server starts without errors
- [ ] Can access http://localhost:3000
- [ ] ESLint runs without errors
- [ ] Prettier formats code correctly
- [ ] Git hooks working (test with a commit)
- [ ] Prisma Studio accessible

## Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -- -p 3001
```

### Issue: Prisma Client not generated
```bash
pnpm prisma generate
```

### Issue: Database connection fails
- Check DATABASE_URL in .env.local
- Verify PostgreSQL is running
- Check firewall settings
- Verify credentials

### Issue: Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

### Issue: TypeScript errors
```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## Next Steps

Now that your project is set up, proceed to:
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Follow [TODO.md](./TODO.md) for development tasks
3. Review [BEST-PRACTICES.md](./BEST-PRACTICES.md) for coding standards
4. Start building components!

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **GitHub Discussions**: [Your repo]/discussions

Happy coding! 🚀

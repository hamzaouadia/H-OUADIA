# 📂 Project Structure Guide

This document provides a detailed explanation of the project's folder structure and file organization.

## Overview

```
portfolio/
├── .github/                # GitHub configuration
├── .husky/                 # Git hooks
├── .vscode/                # VS Code settings
├── public/                 # Static assets
├── prisma/                 # Database schema and migrations
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Utilities and libraries
│   ├── types/             # TypeScript types
│   ├── config/            # Configuration files
│   ├── styles/            # Global styles
│   └── middleware.ts      # Next.js middleware
├── tests/                  # Test files
├── docs/                   # Additional documentation
├── scripts/                # Build and utility scripts
└── Configuration files
```

## Detailed Structure

### Root Level Files

```
portfolio/
├── .env.local              # Local environment variables (gitignored)
├── .env.example            # Example environment variables
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore rules
├── commitlint.config.js   # Commitlint configuration
├── jest.config.js         # Jest configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Lockfile for dependencies
├── playwright.config.ts   # Playwright E2E test config
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project overview
├── SETUP.md               # Setup instructions
├── TODO.md                # Development checklist
├── ARCHITECTURE.md        # Architecture documentation
├── BEST-PRACTICES.md      # Coding standards
├── DEPLOYMENT.md          # Deployment guide
├── CONTRIBUTING.md        # Contributing guidelines
└── LICENSE                # License file
```

### .github/

GitHub-specific configuration and automation.

```
.github/
├── workflows/
│   ├── ci.yml            # Continuous Integration
│   ├── deploy.yml        # Deployment workflow
│   └── codeql.yml        # Security scanning
├── ISSUE_TEMPLATE/
│   ├── bug_report.md     # Bug report template
│   └── feature_request.md # Feature request template
├── pull_request_template.md
└── dependabot.yml        # Automated dependency updates
```

### .husky/

Git hooks for code quality enforcement.

```
.husky/
├── _/                    # Husky scripts
├── pre-commit           # Runs before commit (lint-staged)
└── commit-msg           # Validates commit message
```

### .vscode/

VS Code editor settings (optional but recommended).

```
.vscode/
├── settings.json        # Workspace settings
├── extensions.json      # Recommended extensions
├── launch.json         # Debug configurations
└── tasks.json          # Custom tasks
```

**Example settings.json:**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^'\"`]*)(?:'|\"|`)"]
  ]
}
```

### public/

Static files served directly by the web server.

```
public/
├── images/
│   ├── profile.jpg       # Your profile photo
│   ├── hero-bg.jpg       # Hero section background
│   ├── projects/         # Project screenshots
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── ...
│   └── og-image.jpg      # Open Graph image
├── fonts/                # Custom fonts (if not using next/font)
│   ├── custom-font.woff2
│   └── ...
├── icons/                # App icons for PWA
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── apple-touch-icon.png
├── resume.pdf            # Downloadable resume
├── favicon.ico           # Browser favicon
├── robots.txt            # Robots exclusion protocol
├── sitemap.xml           # XML sitemap
└── manifest.json         # PWA manifest
```

### prisma/

Database schema, migrations, and seed data.

```
prisma/
├── schema.prisma         # Database schema definition
├── migrations/           # Database migrations
│   ├── 20240101_init/
│   │   └── migration.sql
│   └── migration_lock.toml
└── seed.ts              # Database seed script
```

**Example schema.prisma:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  // ... more fields
}
```

### src/app/

Next.js 15 App Router structure (file-based routing).

```
src/app/
├── (main)/              # Route group for main site
│   ├── page.tsx        # Homepage (/)
│   ├── layout.tsx      # Layout for main site
│   ├── loading.tsx     # Loading UI
│   ├── error.tsx       # Error boundary
│   ├── not-found.tsx   # 404 page
│   │
│   ├── about/          # About page
│   │   └── page.tsx    # /about
│   │
│   ├── projects/       # Projects section
│   │   ├── page.tsx    # /projects
│   │   └── [slug]/     # Dynamic route
│   │       ├── page.tsx        # /projects/[slug]
│   │       ├── loading.tsx     # Loading state
│   │       └── not-found.tsx   # Project not found
│   │
│   └── blog/           # Blog section (optional)
│       ├── page.tsx    # /blog
│       └── [slug]/
│           └── page.tsx # /blog/[slug]
│
├── (admin)/            # Route group for admin (optional)
│   ├── layout.tsx      # Admin layout
│   └── dashboard/
│       └── page.tsx    # /dashboard
│
├── api/                # API routes
│   ├── contact/
│   │   └── route.ts    # POST /api/contact
│   ├── projects/
│   │   ├── route.ts    # GET /api/projects
│   │   └── [id]/
│   │       └── route.ts # GET /api/projects/[id]
│   └── newsletter/
│       └── route.ts    # POST /api/newsletter
│
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Root page (redirects to /(main))
├── globals.css         # Global styles
├── sitemap.ts          # Dynamic sitemap generation
├── robots.ts           # Dynamic robots.txt
└── manifest.ts         # Dynamic PWA manifest
```

**Key Files:**

**Root Layout (layout.tsx):**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Full-stack developer portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**API Route (route.ts):**
```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ data: 'response' });
}

export async function POST(request: Request) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### src/components/

React components organized by atomic design principles.

```
src/components/
├── ui/                  # Atoms - shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── sheet.tsx
│   └── tabs.tsx
│
├── shared/             # Molecules - simple composites
│   ├── form-field.tsx
│   ├── project-card.tsx
│   ├── skill-card.tsx
│   ├── experience-item.tsx
│   ├── social-links.tsx
│   ├── theme-toggle.tsx
│   ├── back-to-top.tsx
│   └── search-bar.tsx
│
├── sections/           # Organisms - complex composites
│   ├── hero.tsx
│   ├── about.tsx
│   ├── skills.tsx
│   ├── experience.tsx
│   ├── projects.tsx
│   ├── testimonials.tsx
│   ├── blog.tsx
│   └── contact.tsx
│
├── layout/            # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── navigation.tsx
│   ├── mobile-nav.tsx
│   └── container.tsx
│
└── providers/         # Context providers
    ├── theme-provider.tsx
    ├── query-provider.tsx
    └── toast-provider.tsx
```

**Component Example:**
```typescript
// components/shared/project-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={className}>
      <Image 
        src={project.image}
        alt={project.title}
        width={400}
        height={300}
      />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="flex gap-2">
        {project.tags.map(tag => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
      </div>
    </Card>
  );
}
```

### src/lib/

Utility functions, hooks, and configurations.

```
src/lib/
├── actions/            # Server Actions
│   ├── contact.ts
│   ├── projects.ts
│   └── newsletter.ts
│
├── api/               # API client functions
│   ├── client.ts      # Base API client
│   ├── projects.ts    # Project API calls
│   └── contact.ts     # Contact API calls
│
├── hooks/             # Custom React hooks
│   ├── use-media-query.ts
│   ├── use-scroll-position.ts
│   ├── use-intersection-observer.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── use-theme.ts
│
├── validations/       # Zod schemas
│   ├── contact.ts
│   ├── project.ts
│   └── newsletter.ts
│
├── constants/         # Constants
│   ├── index.ts
│   └── navigation.ts
│
├── utils/             # Utility functions
│   ├── cn.ts         # Class name utility
│   ├── format-date.ts
│   ├── slugify.ts
│   └── truncate.ts
│
├── prisma.ts          # Prisma client
├── email.ts           # Email service
└── rate-limit.ts      # Rate limiting
```

**Example Files:**

**Utility Function:**
```typescript
// lib/utils/format-date.ts
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
```

**Custom Hook:**
```typescript
// lib/hooks/use-media-query.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

**Validation Schema:**
```typescript
// lib/validations/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### src/types/

TypeScript type definitions.

```
src/types/
├── index.ts           # Main types export
├── project.ts         # Project-related types
├── api.ts             # API response types
└── database.ts        # Database types
```

**Example:**
```typescript
// types/project.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  demoUrl: string | null;
  githubUrl: string | null;
  tags: Tag[];
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}
```

### src/config/

Configuration files.

```
src/config/
├── site.ts            # Site metadata and configuration
├── navigation.ts      # Navigation links
└── seo.ts            # SEO configuration
```

**Example:**
```typescript
// config/site.ts
export const siteConfig = {
  name: 'Your Name',
  description: 'Full-stack developer specializing in...',
  url: 'https://yourdomain.com',
  ogImage: 'https://yourdomain.com/og-image.jpg',
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourname',
    twitter: 'https://twitter.com/yourhandle',
    email: 'mailto:your-email@example.com',
  },
  creator: '@yourhandle',
};

// config/navigation.ts
export const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
```

### src/styles/

Global styles and CSS modules.

```
src/styles/
├── globals.css        # Global styles (Tailwind)
└── animations.css     # Custom animations
```

### tests/

Test files organized by type.

```
tests/
├── unit/              # Unit tests
│   ├── utils/
│   │   ├── format-date.test.ts
│   │   └── slugify.test.ts
│   └── hooks/
│       └── use-media-query.test.ts
│
├── integration/       # Integration tests
│   ├── api/
│   │   ├── contact.test.ts
│   │   └── projects.test.ts
│   └── components/
│       └── contact-form.test.tsx
│
└── e2e/              # End-to-end tests
    ├── homepage.spec.ts
    ├── projects.spec.ts
    └── contact.spec.ts
```

### docs/

Additional documentation.

```
docs/
├── api/              # API documentation
│   ├── README.md
│   └── endpoints.md
├── components/       # Component documentation
│   └── README.md
└── guides/          # Additional guides
    ├── styling.md
    └── deployment.md
```

### scripts/

Build and utility scripts.

```
scripts/
├── setup.sh          # Initial setup script
├── seed-db.ts        # Database seeding
├── generate-sitemap.ts # Sitemap generation
└── optimize-images.sh # Image optimization
```

## File Naming Conventions

### Components
- **React Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Component Files**: kebab-case (e.g., `project-card.tsx`)
- **Test Files**: `.test.tsx` or `.spec.tsx`
- **Style Files**: `.module.css` (if using CSS Modules)

### Other Files
- **Utilities**: kebab-case (e.g., `format-date.ts`)
- **Types**: kebab-case (e.g., `project.types.ts`)
- **Config**: kebab-case (e.g., `site.config.ts`)
- **API Routes**: `route.ts` (Next.js convention)
- **Pages**: `page.tsx` (Next.js convention)

## Import Organization

```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/shared/project-card';

// 4. Utilities and helpers
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/format-date';

// 5. Types
import type { Project } from '@/types';

// 6. Styles (if any)
import styles from './component.module.css';
```

## Best Practices

1. **Colocation**: Keep related files close together
2. **Atomic Design**: Organize components by complexity
3. **Type Safety**: Define types for all data structures
4. **Reusability**: Extract common functionality
5. **Testing**: Co-locate tests with source files
6. **Documentation**: Add README.md to complex directories
7. **Consistency**: Follow naming conventions throughout

## Quick Reference

| Location | Purpose | Example |
|----------|---------|---------|
| `/src/app` | Pages and routing | `page.tsx`, `layout.tsx` |
| `/src/components/ui` | Basic UI components | `button.tsx`, `input.tsx` |
| `/src/components/shared` | Reusable components | `project-card.tsx` |
| `/src/components/sections` | Page sections | `hero.tsx`, `projects.tsx` |
| `/src/lib` | Utilities and helpers | `utils.ts`, `prisma.ts` |
| `/src/types` | TypeScript types | `project.ts`, `api.ts` |
| `/prisma` | Database schema | `schema.prisma` |
| `/public` | Static assets | `images/`, `fonts/` |
| `/tests` | Test files | `*.test.ts`, `*.spec.ts` |

---

This structure provides a solid foundation that can scale as your project grows!

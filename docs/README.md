# 🚀 Hamza Ouadia - Portfolio Website

**Full-Stack Developer | Building modern web experiences with TypeScript, React & Next.js**

A cutting-edge, high-performance portfolio website built with the latest web technologies and best practices.

## 📋 Project Overview

This is a modern, full-stack portfolio website showcasing my work, skills, and experience as a full-stack developer. Built with industry-leading technologies and following enterprise-grade best practices, this portfolio demonstrates proficiency in modern web development.

## ✨ Key Features

### Core Features
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Dark/Light Mode**: System-aware theme with manual toggle
- **Performance Optimized**: 95+ Lighthouse score across all metrics
- **SEO Optimized**: Meta tags, Open Graph, Schema.org markup
- **Accessibility**: WCAG 2.1 AA compliant
- **Progressive Web App (PWA)**: Installable, works offline
- **i18n Ready**: Multi-language support structure

### Interactive Features
- **Hero Section**: Eye-catching introduction with animated elements
- **About Section**: Personal story and professional journey
- **Projects Showcase**: Filterable portfolio with live demos and source code
- **Skills & Technologies**: Visual representation of technical expertise
- **Experience Timeline**: Professional history with interactive timeline
- **Blog/Articles**: Content management for writing (optional)
- **Contact Form**: Secure form with email notifications and spam protection
- **Resume Download**: Downloadable PDF resume
- **Social Links**: Integration with GitHub, LinkedIn, Twitter, etc.
- **Analytics Dashboard**: Track visitor insights (optional admin panel)

### Technical Features
- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Static Site Generation (SSG)**: Pre-rendered pages where possible
- **Incremental Static Regeneration (ISR)**: Dynamic content with static performance
- **API Routes**: Backend functionality without separate server
- **Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **Code Splitting**: Optimal bundle sizes
- **Caching Strategy**: Edge caching for global performance
- **Rate Limiting**: API protection against abuse
- **CSRF Protection**: Secure form submissions
- **Input Validation**: Client and server-side validation
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton screens and optimistic UI

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (React 19) with App Router
- **Language**: TypeScript 5.x (100% type-safe)
- **Styling**: Tailwind CSS 4.x + CSS Modules
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion + Tailwind Animate
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand (lightweight) or React Context
- **Data Fetching**: TanStack Query (React Query)

### Backend & Database
- **Runtime**: Node.js 20+ LTS
- **API**: Next.js API Routes (REST + optional GraphQL)
- **Database**: PostgreSQL 16+
- **ORM**: Prisma 5.x
- **Authentication**: NextAuth.js v5 (optional admin panel)
- **File Storage**: Vercel Blob or AWS S3
- **Email Service**: Resend or SendGrid

### DevOps & Deployment
- **Hosting**: Vercel (recommended) or Netlify
- **CI/CD**: GitHub Actions
- **Database Hosting**: Supabase, Neon, or Railway
- **Monitoring**: Sentry for error tracking
- **Analytics**: Vercel Analytics + Plausible (privacy-focused)
- **CDN**: Vercel Edge Network or CloudFlare

### Development Tools
- **Package Manager**: pnpm (fastest, most efficient)
- **Code Quality**: ESLint + Prettier + Husky
- **Git Hooks**: lint-staged + commitlint
- **Testing**: Jest + React Testing Library + Playwright
- **Commit Convention**: Conventional Commits
- **Documentation**: TypeDoc + Storybook (optional)

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── .husky/                 # Git hooks
├── .vscode/                # VS Code settings
├── public/
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── resume.pdf
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/        # Main site routes
│   │   ├── (admin)/       # Admin panel (optional)
│   │   ├── api/           # API routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── layout/        # Layout components
│   │   ├── sections/      # Page sections
│   │   └── shared/        # Shared components
│   ├── lib/
│   │   ├── actions/       # Server actions
│   │   ├── api/           # API clients
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── validations/   # Zod schemas
│   │   └── constants/     # Constants
│   ├── types/             # TypeScript types
│   ├── config/            # Configuration files
│   ├── styles/            # Global styles
│   └── middleware.ts      # Next.js middleware
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                   # Additional documentation
├── scripts/                # Build and utility scripts
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── SETUP.md
├── TODO.md
├── ARCHITECTURE.md
└── CONTRIBUTING.md
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
pnpm db:push

# Seed database (optional)
pnpm db:seed

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[SETUP.md](./SETUP.md)**: Detailed setup instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Architecture decisions and patterns
- **[TODO.md](./TODO.md)**: Development checklist and roadmap
- **[BEST-PRACTICES.md](./BEST-PRACTICES.md)**: Coding standards and conventions
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Deployment guide

## 🎨 Design Philosophy

### Performance First
- Target: 95+ Lighthouse score
- Core Web Vitals optimized (LCP, FID, CLS)
- Minimal JavaScript shipped to client
- Aggressive caching strategy

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Screen reader optimized

### SEO
- Server-side rendering
- Meta tags optimization
- Sitemap.xml & robots.txt
- Structured data (JSON-LD)

### Developer Experience
- Type safety everywhere
- Hot module replacement
- Fast refresh
- Clear error messages

## 📊 Performance Targets

- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 200KB (initial)

## 🔐 Security

- HTTPS only
- Content Security Policy (CSP)
- CORS configuration
- Rate limiting on API routes
- Input sanitization
- SQL injection prevention (via Prisma)
- XSS protection
- CSRF tokens

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**Hamza Ouadia**
- Email: [ouadia.h.dev@gmail.com](mailto:ouadia.h.dev@gmail.com)
- GitHub: [@hamzaouadia](https://github.com/hamzaouadia)
- LinkedIn: [Hamza Ouadia](https://www.linkedin.com/in/haouadia/)
- Location: Morocco 🇲🇦

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and development tools
- shadcn for the beautiful UI components
- Open source community

---

**Built with ❤️ using Next.js**

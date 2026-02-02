# 🏗️ Architecture Documentation

## Overview

This document outlines the architectural decisions, patterns, and principles used in building this portfolio website. It follows modern full-stack best practices with a focus on scalability, maintainability, and performance.

## Architecture Principles

### 1. **Clean Architecture**
- Separation of concerns
- Dependency inversion
- Business logic isolation
- Testability focus

### 2. **Component-Based Architecture**
- Atomic design principles
- Reusable components
- Single Responsibility Principle
- Composition over inheritance

### 3. **API-First Design**
- RESTful API design
- Type-safe contracts
- Versioned endpoints
- Clear documentation

### 4. **Progressive Enhancement**
- Works without JavaScript
- Enhanced with JavaScript
- Graceful degradation
- Accessible by default

## Technology Decisions

### Why Next.js 15?

**Advantages:**
- ✅ Server-Side Rendering (SSR) for SEO and performance
- ✅ Static Site Generation (SSG) for optimal speed
- ✅ Incremental Static Regeneration (ISR) for dynamic content
- ✅ API Routes for backend functionality
- ✅ Image optimization out of the box
- ✅ File-based routing
- ✅ React Server Components
- ✅ Edge runtime support
- ✅ Excellent developer experience
- ✅ Zero-config TypeScript support

**Use Cases:**
- Marketing sites (SEO critical)
- Portfolios (perfect fit)
- Blogs and content sites
- E-commerce
- SaaS applications

### Why TypeScript?

**Advantages:**
- ✅ Type safety catches bugs at compile time
- ✅ Better IDE support and autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Enterprise-ready
- ✅ Better team collaboration

**Conventions:**
- Strict mode enabled
- No implicit any
- Null checks enforced
- Consistent naming conventions

### Why Tailwind CSS?

**Advantages:**
- ✅ Utility-first approach
- ✅ No CSS naming conflicts
- ✅ Tiny production bundle
- ✅ Rapid development
- ✅ Consistent design system
- ✅ Mobile-first responsive
- ✅ Dark mode support
- ✅ Customizable via config

**Conventions:**
- Component composition
- Responsive utilities
- Dark mode variants
- Custom design tokens

### Why Prisma?

**Advantages:**
- ✅ Type-safe database client
- ✅ Auto-generated types
- ✅ Database migrations
- ✅ Intuitive API
- ✅ Multiple database support
- ✅ Connection pooling
- ✅ Query optimization

**Conventions:**
- Schema-first design
- Naming conventions (camelCase)
- Relations properly defined
- Indexes on frequent queries

### Why PostgreSQL?

**Advantages:**
- ✅ ACID compliant
- ✅ Advanced features (JSON, full-text search)
- ✅ Excellent performance
- ✅ Open source
- ✅ Scalable
- ✅ Strong community

**Use Cases:**
- Contact form submissions
- Blog posts (optional)
- Analytics data
- Admin authentication

## Application Layers

### 1. Presentation Layer (Frontend)

```
src/app/          → Routes and pages
src/components/   → React components
src/styles/       → Global styles
```

**Responsibilities:**
- User interface rendering
- User interactions
- Client-side validation
- State management
- Routing

**Patterns:**
- Server Components (default)
- Client Components (when needed)
- Suspense boundaries
- Error boundaries
- Loading states

### 2. Business Logic Layer

```
src/lib/actions/      → Server actions
src/lib/utils/        → Helper functions
src/lib/validations/  → Input validation
```

**Responsibilities:**
- Business rules
- Data transformations
- Validation logic
- Error handling

**Patterns:**
- Server Actions for mutations
- Pure functions
- Error boundaries
- Validation with Zod

### 3. Data Access Layer

```
src/lib/api/       → API clients
prisma/            → Database schema
```

**Responsibilities:**
- Database operations
- External API calls
- Data caching
- Query optimization

**Patterns:**
- Prisma Client
- Repository pattern (optional)
- Connection pooling
- Query batching

### 4. API Layer

```
src/app/api/       → API routes
```

**Responsibilities:**
- RESTful endpoints
- Request/response handling
- Authentication
- Rate limiting

**Patterns:**
- Route handlers
- Middleware
- Error responses
- API versioning

## Data Flow

### Server-Side Rendering (SSR)

```
User Request → Next.js Server → Fetch Data → Render React → Send HTML → Hydrate Client
```

**When to use:**
- Dynamic content per request
- User-specific data
- SEO critical pages
- Authentication required

### Static Site Generation (SSG)

```
Build Time → Fetch Data → Pre-render Pages → Deploy Static HTML → Serve Instantly
```

**When to use:**
- Content rarely changes
- No user-specific data
- Maximum performance needed
- Marketing pages

### Incremental Static Regeneration (ISR)

```
Serve Cached → Check Revalidation → Background Regenerate → Update Cache → Serve Fresh
```

**When to use:**
- Content updates periodically
- Balance between static and dynamic
- Blog posts
- Project listings

### Client-Side Rendering (CSR)

```
Load HTML → Load JavaScript → Fetch Data → Render Content
```

**When to use:**
- Highly interactive features
- User dashboards
- Real-time updates
- After authentication

## Component Architecture

### Atomic Design Methodology

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### 1. Atoms (src/components/ui/)
Basic building blocks - buttons, inputs, labels

```typescript
// Example: Button
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

#### 2. Molecules (src/components/shared/)
Simple groups of atoms - form fields, cards, navigation items

```typescript
// Example: FormField
interface FormFieldProps {
  label: string;
  input: React.ReactNode;
  error?: string;
}
```

#### 3. Organisms (src/components/sections/)
Complex components - header, footer, forms, project cards

```typescript
// Example: ProjectCard
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: { demo?: string; github?: string };
}
```

#### 4. Templates (src/app/layout.tsx)
Page layouts with placeholders

```typescript
// Example: MainLayout
interface LayoutProps {
  children: React.ReactNode;
}
```

#### 5. Pages (src/app/**/page.tsx)
Specific instances of templates with real content

```typescript
// Example: HomePage
export default async function HomePage() {
  const projects = await getProjects();
  return <ProjectsSection projects={projects} />;
}
```

## State Management Strategy

### Server State (External Data)
**Tool:** TanStack Query (React Query)

```typescript
// Example: Fetch projects
const { data: projects, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

**Use cases:**
- API data
- Database queries
- External services

### Client State (UI State)
**Tool:** Zustand or React Context

```typescript
// Example: Theme store
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
```

**Use cases:**
- Theme preferences
- Modal states
- Form states
- UI toggles

### URL State
**Tool:** Next.js router (useSearchParams)

```typescript
// Example: Filters
const searchParams = useSearchParams();
const filter = searchParams.get('filter') || 'all';
```

**Use cases:**
- Filters
- Pagination
- Search queries
- Navigation state

## API Design

### RESTful Conventions

```
GET    /api/projects          → List all projects
GET    /api/projects/:id      → Get single project
POST   /api/contact           → Send contact message
POST   /api/newsletter        → Subscribe to newsletter
GET    /api/blog/posts        → List blog posts
GET    /api/blog/posts/:slug  → Get single post
```

### Response Format

```typescript
// Success response
{
  "success": true,
  "data": { /* ... */ },
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [/* ... */]
  }
}
```

### Error Handling

```typescript
// API route error handling
export async function POST(request: Request) {
  try {
    // Validate input
    const body = await request.json();
    const validated = contactSchema.parse(body);
    
    // Process request
    await sendEmail(validated);
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: error.errors
        }
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong'
      }
    }, { status: 500 });
  }
}
```

## Database Schema Design

### Principles
- Normalized structure
- Proper indexes
- Foreign key constraints
- Timestamps on all tables
- Soft deletes where appropriate

### Example Schema

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String   @db.Text
  image       String
  demoUrl     String?
  githubUrl   String?
  tags        Tag[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([featured, order])
}

model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  projects  Project[]
  createdAt DateTime  @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  replied   Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([replied, createdAt])
}
```

## Security Architecture

### 1. Input Validation
- Client-side validation (UX)
- Server-side validation (Security)
- Zod schemas for type safety
- Sanitization of user input

### 2. Authentication (Optional Admin)
- NextAuth.js v5
- JWT tokens
- Secure cookie storage
- Session management

### 3. Rate Limiting
```typescript
// Example: Rate limiter
import { ratelimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Continue with request
}
```

### 4. Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

## Performance Optimization

### 1. Image Optimization
- Next.js Image component
- WebP/AVIF formats
- Lazy loading
- Responsive sizes
- Blur placeholder

### 2. Code Splitting
- Dynamic imports
- Route-based splitting
- Component-level splitting

```typescript
// Example: Dynamic import
const DynamicMap = dynamic(() => import('@/components/Map'), {
  loading: () => <MapSkeleton />,
  ssr: false
});
```

### 3. Caching Strategy
```typescript
// Revalidation strategies
export const revalidate = 3600; // ISR: 1 hour

// Force static
export const dynamic = 'force-static';

// Force dynamic
export const dynamic = 'force-dynamic';

// Cache control
export const fetchCache = 'force-cache';
```

### 4. Bundle Optimization
- Tree shaking
- Minification
- Compression (gzip/brotli)
- Module concatenation

## Testing Strategy

### 1. Unit Tests
- Jest + React Testing Library
- Test utilities and hooks
- 80%+ code coverage

### 2. Integration Tests
- API route testing
- Database operations
- Component integration

### 3. E2E Tests
- Playwright
- Critical user journeys
- Cross-browser testing

### 4. Visual Regression
- Percy or Chromatic
- Component snapshots

## Deployment Architecture

### Production Setup

```
User Request
    ↓
CloudFlare CDN (optional)
    ↓
Vercel Edge Network
    ↓
Next.js Application (Serverless)
    ↓
PostgreSQL Database (Supabase/Neon)
```

### CI/CD Pipeline

```
Push to GitHub
    ↓
GitHub Actions
    ↓
Run Tests + Linting
    ↓
Build Application
    ↓
Deploy to Vercel (Preview/Production)
    ↓
Run E2E Tests
    ↓
Notify Team
```

## Monitoring & Observability

### 1. Error Tracking
- Sentry for error monitoring
- Source maps for debugging
- User context tracking

### 2. Analytics
- Vercel Analytics (performance)
- Plausible (privacy-friendly)
- Custom event tracking

### 3. Logging
- Structured logging
- Log levels (error, warn, info, debug)
- Centralized log aggregation

### 4. Performance Monitoring
- Core Web Vitals
- Real User Monitoring (RUM)
- Synthetic monitoring

## Scalability Considerations

### Current Scale (Phase 1)
- Single region deployment
- Serverless functions
- Managed database
- Edge caching

### Future Scale (Phase 2+)
- Multi-region deployment
- Database read replicas
- Redis caching layer
- CDN optimization
- Load balancing

## Future Enhancements

### Short-term
- Blog/Articles section
- Admin dashboard
- Newsletter integration
- Advanced analytics

### Long-term
- Multi-language support (i18n)
- CMS integration
- API documentation
- GraphQL endpoint
- Real-time features (WebSockets)

## Conclusion

This architecture is designed to be:
- **Performant**: Optimized for speed and efficiency
- **Scalable**: Can grow with your needs
- **Maintainable**: Clean code and clear patterns
- **Secure**: Multiple layers of protection
- **Developer-friendly**: Great DX with TypeScript and modern tools

The architecture follows industry best practices while remaining flexible enough to adapt to changing requirements.

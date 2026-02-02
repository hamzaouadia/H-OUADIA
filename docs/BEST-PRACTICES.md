# 📚 Best Practices & Coding Standards

This document outlines the coding standards, conventions, and best practices for this project. Following these guidelines ensures consistency, maintainability, and high code quality.

## Table of Contents

1. [General Principles](#general-principles)
2. [TypeScript Guidelines](#typescript-guidelines)
3. [React & Next.js Best Practices](#react--nextjs-best-practices)
4. [Component Structure](#component-structure)
5. [State Management](#state-management)
6. [API & Data Fetching](#api--data-fetching)
7. [Styling Guidelines](#styling-guidelines)
8. [File & Folder Naming](#file--folder-naming)
9. [Git Workflow](#git-workflow)
10. [Testing Guidelines](#testing-guidelines)
11. [Performance](#performance)
12. [Security](#security)
13. [Accessibility](#accessibility)
14. [Documentation](#documentation)

---

## General Principles

### SOLID Principles

**S - Single Responsibility Principle**
- Each component/function should have one clear purpose
- Keep components focused and small

**O - Open/Closed Principle**
- Components should be open for extension but closed for modification
- Use composition over inheritance

**L - Liskov Substitution Principle**
- Child components should be substitutable for parent components

**I - Interface Segregation Principle**
- Create specific interfaces rather than one general-purpose interface

**D - Dependency Inversion Principle**
- Depend on abstractions, not concretions

### DRY (Don't Repeat Yourself)
- Extract repeated logic into reusable functions/components
- Use composition to avoid duplication
- Create utility functions for common operations

### KISS (Keep It Simple, Stupid)
- Prefer simple solutions over complex ones
- Write code that's easy to understand
- Avoid premature optimization

### YAGNI (You Aren't Gonna Need It)
- Don't add functionality until it's needed
- Avoid over-engineering

---

## TypeScript Guidelines

### Type Safety

✅ **DO:**
```typescript
// Use explicit types for function parameters and return values
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type for unions and intersections
type Status = 'pending' | 'approved' | 'rejected';
type UserWithStatus = User & { status: Status };

// Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  error: string | null;
}
```

❌ **DON'T:**
```typescript
// Avoid 'any' type
function process(data: any) { // ❌
  return data.something;
}

// Avoid implicit any
function getData() { // ❌ Return type is implicitly any
  return fetch('/api/data');
}
```

### Naming Conventions

```typescript
// Interfaces: PascalCase with 'I' prefix (optional)
interface ButtonProps {
  variant: 'primary' | 'secondary';
}

// Types: PascalCase
type Theme = 'light' | 'dark';

// Enums: PascalCase
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Functions: camelCase
function calculateDiscount(price: number): number {}

// Classes: PascalCase
class UserService {}
```

### Type Guards

```typescript
// Create type guards for runtime checks
function isProject(item: unknown): item is Project {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'title' in item
  );
}

// Use type guards before accessing properties
if (isProject(data)) {
  console.log(data.title); // TypeScript knows data is Project
}
```

### Strict Mode

Always enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

---

## React & Next.js Best Practices

### Component Types

#### Server Components (Default in App Router)

✅ **DO:**
```typescript
// Default export for page components
export default async function ProjectsPage() {
  const projects = await getProjects(); // Direct database access
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Projects',
  description: 'My portfolio projects',
};
```

#### Client Components

```typescript
'use client'; // Only when needed

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Use 'use client' when:**
- Using React hooks (useState, useEffect, etc.)
- Using browser APIs (localStorage, window, etc.)
- Using event handlers
- Using third-party libraries that require client-side

### Component Structure

```typescript
// 1. Imports (grouped and sorted)
import { type ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

// 2. Type definitions
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

// 3. Component
export function ProjectCard({ 
  project, 
  featured = false,
  className 
}: ProjectCardProps) {
  // 3a. Hooks (always at the top)
  const [isHovered, setIsHovered] = useState(false);
  
  // 3b. Derived state
  const imageUrl = project.image || '/placeholder.png';
  
  // 3c. Event handlers
  const handleClick = () => {
    console.log('Project clicked:', project.id);
  };
  
  // 3d. Render
  return (
    <article 
      className={cn('project-card', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component JSX */}
    </article>
  );
}
```

### Props Best Practices

✅ **DO:**
```typescript
// Destructure props
function Button({ variant, size, children }: ButtonProps) {
  return <button>{children}</button>;
}

// Use default parameters
function Card({ title, description = 'No description' }: CardProps) {
  return <div>{description}</div>;
}

// Spread remaining props
function Input({ className, ...props }: InputProps) {
  return <input className={cn('base-input', className)} {...props} />;
}
```

❌ **DON'T:**
```typescript
// Don't pass entire props object
function Button(props: ButtonProps) { // ❌
  return <button>{props.children}</button>;
}

// Don't use inline objects/functions in render
<Component 
  style={{ marginTop: 10 }} // ❌ Creates new object each render
  onClick={() => doSomething()} // ❌ Creates new function each render
/>
```

### Conditional Rendering

✅ **DO:**
```typescript
// Use ternary for if-else
{isLoading ? <Skeleton /> : <Content />}

// Use && for if only
{error && <ErrorMessage error={error} />}

// Use early returns
if (!data) return <Loading />;
return <Content data={data} />;

// Use helper functions for complex conditions
function renderStatus(status: Status) {
  switch (status) {
    case 'pending': return <PendingBadge />;
    case 'approved': return <ApprovedBadge />;
    case 'rejected': return <RejectedBadge />;
  }
}
```

### Lists & Keys

✅ **DO:**
```typescript
// Use stable, unique keys (IDs from database)
{projects.map(project => (
  <ProjectCard key={project.id} project={project} />
))}

// For nested lists, combine keys
{categories.map(category => (
  <div key={category.id}>
    {category.items.map(item => (
      <Item key={`${category.id}-${item.id}`} item={item} />
    ))}
  </div>
))}
```

❌ **DON'T:**
```typescript
// Don't use index as key (unless list never changes)
{items.map((item, index) => (
  <Item key={index} item={item} /> // ❌
))}
```

---

## Component Structure

### Atomic Design Organization

```
src/components/
├── ui/              # Atoms - Basic building blocks (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── shared/          # Molecules - Simple composites
│   ├── form-field.tsx
│   ├── search-bar.tsx
│   └── social-links.tsx
├── sections/        # Organisms - Complex composites
│   ├── hero.tsx
│   ├── projects.tsx
│   └── contact.tsx
└── layout/          # Layout components
    ├── header.tsx
    ├── footer.tsx
    └── navigation.tsx
```

### Component File Structure

```typescript
// components/shared/project-card.tsx

// 1. Component implementation
export function ProjectCard({ project }: ProjectCardProps) {
  return (/* JSX */);
}

// 2. Sub-components (if small and only used here)
function ProjectCardImage({ src, alt }: ImageProps) {
  return (/* JSX */);
}

// 3. Types (at the end or in separate file if large)
interface ProjectCardProps {
  project: Project;
}

interface ImageProps {
  src: string;
  alt: string;
}
```

---

## State Management

### When to Use What

**1. URL State (useSearchParams)**
- Filters, pagination, search queries
- Anything that should be shareable via URL

**2. Server State (React Query)**
- Data from APIs or databases
- Anything that comes from external sources

**3. Client State (Zustand/Context)**
- Theme preference
- UI state (modals, sidebars)
- Form state
- Global UI settings

**4. Local State (useState)**
- Component-specific UI state
- Temporary values
- Single-component concerns

### React Query Best Practices

```typescript
// Define query keys as constants
const queryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  tags: ['tags'] as const,
};

// Use custom hooks
function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Usage in component
function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects();
  
  if (isLoading) return <ProjectsSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!projects?.length) return <EmptyState />;
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Zustand Best Practices

```typescript
// stores/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    { name: 'theme-storage' }
  )
);

// Usage
function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

---

## API & Data Fetching

### API Route Structure

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { ratelimit } from '@/lib/rate-limit';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
    
    // 2. Parse and validate body
    const body = await request.json();
    const validated = contactSchema.parse(body);
    
    // 3. Process request
    const message = await prisma.contactMessage.create({
      data: validated,
    });
    
    // 4. Send email
    await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject: `Contact: ${validated.subject}`,
      html: `<p><strong>From:</strong> ${validated.name} (${validated.email})</p>
             <p><strong>Message:</strong></p>
             <p>${validated.message}</p>`,
    });
    
    // 5. Return success response
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      id: message.id,
    });
    
  } catch (error) {
    // 6. Error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Data Fetching Best Practices

```typescript
// Use Server Components for data fetching when possible
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { tags: true },
    orderBy: [
      { featured: 'desc' },
      { order: 'asc' },
    ],
  });
  
  return <ProjectsList projects={projects} />;
}

// Add error boundary
export default async function ProjectsPage() {
  try {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
  } catch (error) {
    return <ErrorState error={error} />;
  }
}

// Add loading state
export default function Loading() {
  return <ProjectsSkeleton />;
}
```

---

## Styling Guidelines

### Tailwind CSS Best Practices

✅ **DO:**
```typescript
// Use consistent spacing scale
<div className="p-4 md:p-6 lg:p-8">

// Use cn() utility for conditional classes
<div className={cn(
  'rounded-lg transition-colors',
  isActive && 'bg-primary text-white',
  className
)}>

// Group related utilities
<button className={cn(
  // Layout
  'flex items-center justify-center',
  // Spacing
  'px-4 py-2 gap-2',
  // Typography
  'text-sm font-medium',
  // Visual
  'rounded-md bg-primary text-white',
  // Interactive
  'hover:bg-primary/90 active:scale-95',
  // Transitions
  'transition-all duration-200'
)}>

// Use @apply for repeated patterns (sparingly)
// globals.css
.btn-primary {
  @apply px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90;
}
```

❌ **DON'T:**
```typescript
// Don't use inline styles (use Tailwind)
<div style={{ marginTop: '20px' }}> // ❌

// Don't create unnecessary custom CSS
// Use Tailwind utilities instead

// Don't use arbitrary values excessively
<div className="mt-[13px]"> // ❌ Use standard spacing scale
```

### Responsive Design

```typescript
// Mobile-first approach
<div className={cn(
  // Base (mobile)
  'flex flex-col gap-4',
  // Tablet
  'md:flex-row md:gap-6',
  // Desktop
  'lg:gap-8 xl:gap-10'
)}>

// Hide/show based on screen size
<div className="hidden md:block"> // Show on tablet+
<div className="block md:hidden">  // Show on mobile only
```

### Dark Mode

```typescript
// Use Tailwind dark mode
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-gray-100">

// Use CSS variables for colors (preferred)
// tailwind.config.ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
}

// Then use in components
<div className="bg-background text-foreground">
```

---

## File & Folder Naming

### Conventions

```
// Components: kebab-case.tsx
project-card.tsx
contact-form.tsx
theme-toggle.tsx

// Utilities: kebab-case.ts
format-date.ts
api-client.ts

// Types: kebab-case.ts or types.ts
project.types.ts
api.types.ts

// Constants: kebab-case.ts or constants.ts
site.config.ts
navigation.config.ts

// Pages: Next.js conventions
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
```

---

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Types
feat:      New feature
fix:       Bug fix
docs:      Documentation changes
style:     Code style changes (formatting)
refactor:  Code refactoring
perf:      Performance improvements
test:      Adding or updating tests
chore:     Maintenance tasks

# Examples
feat(projects): add project filtering by tags
fix(contact): resolve form validation issue
docs(readme): update setup instructions
style(components): format code with prettier
refactor(api): simplify error handling
perf(images): optimize image loading
test(utils): add tests for formatDate function
chore(deps): update dependencies
```

### Branch Naming

```bash
feature/project-filtering
fix/contact-form-validation
docs/update-readme
refactor/api-error-handling
```

### Workflow

```bash
# 1. Create branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Keep branch updated
git fetch origin
git rebase origin/main

# 4. Push and create PR
git push origin feature/new-feature
```

---

## Testing Guidelines

### Unit Tests

```typescript
// utils.test.ts
import { formatDate, slugify } from './utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });
  
  it('handles string input', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  
  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});
```

### Component Tests

```typescript
// project-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'Test description',
  image: '/test.jpg',
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
  
  it('renders project image', () => {
    render(<ProjectCard project={mockProject} />);
    const image = screen.getByAltText('Test Project');
    expect(image).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });
});
```

---

## Performance

### Image Optimization

```typescript
// Always use next/image
import Image from 'next/image';

<Image
  src="/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={project.blurDataUrl}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-side only
});
```

### Memoization

```typescript
// useMemo for expensive calculations
const filteredProjects = useMemo(() => {
  return projects.filter(p => p.tags.includes(selectedTag));
}, [projects, selectedTag]);

// useCallback for functions passed as props
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// React.memo for expensive components
export const ProjectCard = React.memo(function ProjectCard({ project }) {
  return (/* JSX */);
});
```

---

## Security

### Input Validation

✅ **DO:**
```typescript
// Always validate on server
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

const validated = schema.parse(data);
```

### Environment Variables

```typescript
// Use NEXT_PUBLIC_ prefix for client-side
NEXT_PUBLIC_API_URL=https://api.example.com

// Keep secrets server-side only (no prefix)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
```

### SQL Injection Prevention

```typescript
// ✅ Use Prisma (parameterized queries)
const projects = await prisma.project.findMany({
  where: { title: { contains: searchTerm } }
});

// ❌ Don't use raw SQL with user input
// const projects = await prisma.$queryRaw`
//   SELECT * FROM projects WHERE title LIKE '%${searchTerm}%'
// `; // Vulnerable to SQL injection!
```

---

## Accessibility

### Semantic HTML

✅ **DO:**
```typescript
<nav>
  <ul>
    <li><Link href="/">Home</Link></li>
  </ul>
</nav>

<article>
  <h2>{project.title}</h2>
  <p>{project.description}</p>
</article>

<button onClick={handleClick}>Submit</button>
```

### ARIA Labels

```typescript
// Add labels for icon-only buttons
<button aria-label="Toggle theme">
  <SunIcon />
</button>

// Add labels for form inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" name="email" />

// Hide decorative elements
<div aria-hidden="true">★★★★★</div>
```

### Keyboard Navigation

```typescript
// Ensure focusable elements
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

---

## Documentation

### Component Documentation

```typescript
/**
 * ProjectCard Component
 * 
 * Displays a project with image, title, description, and tags.
 * Supports hover effects and links to project detail page.
 * 
 * @example
 * ```tsx
 * <ProjectCard 
 *   project={project}
 *   featured
 *   className="custom-class"
 * />
 * ```
 */
export function ProjectCard({ 
  project, 
  featured = false,
  className
}: ProjectCardProps) {
  // Implementation
}
```

### Function Documentation

```typescript
/**
 * Formats a date string or Date object into a readable format.
 * 
 * @param date - The date to format (Date object or ISO string)
 * @returns Formatted date string (e.g., "January 15, 2024")
 * 
 * @example
 * formatDate(new Date('2024-01-15')) // "January 15, 2024"
 * formatDate('2024-01-15') // "January 15, 2024"
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
```

---

## Summary

Following these best practices will result in:
- ✅ Clean, maintainable code
- ✅ Consistent codebase
- ✅ Better performance
- ✅ Improved security
- ✅ Enhanced accessibility
- ✅ Easier collaboration
- ✅ Fewer bugs

Remember: **Code is read more often than it's written.** Write code for humans first, computers second.

Happy coding! 🚀

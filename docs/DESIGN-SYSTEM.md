# 🎨 Design System & UI Guidelines

This document outlines the design system, visual guidelines, and UI components for the portfolio website.

## Design Philosophy

### Core Principles

1. **Minimalism**: Clean, uncluttered design that focuses on content
2. **Performance**: Fast load times with optimized assets
3. **Accessibility**: WCAG 2.1 AA compliant for all users
4. **Consistency**: Unified visual language throughout
5. **Responsiveness**: Seamless experience across all devices

## Color System

### Light Mode

```css
:root {
  /* Primary Colors */
  --primary: 222.2 47.4% 11.2%;           /* Almost black for text */
  --primary-foreground: 210 40% 98%;      /* Light text on primary */
  
  /* Secondary Colors */
  --secondary: 210 40% 96.1%;             /* Light gray background */
  --secondary-foreground: 222.2 47.4% 11.2%; /* Dark text on secondary */
  
  /* Accent Colors */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Background */
  --background: 0 0% 100%;                /* Pure white */
  --foreground: 222.2 47.4% 11.2%;        /* Dark text */
  
  /* Muted */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 222.2 47.4% 11.2%;
  
  /* Border & Input */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  
  /* Status Colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --info: 199 89% 48%;
}
```

### Dark Mode

```css
.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  
  --background: 222.2 84% 4.9%;          /* Very dark blue-black */
  --foreground: 210 40% 98%;              /* Light text */
  
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --success: 142 71% 45%;
  --warning: 38 100% 60%;
  --info: 199 89% 58%;
}
```

### Brand Colors

```typescript
// Accent colors for your brand
export const brandColors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Primary brand color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  // Add your custom colors
};
```

## Typography

### Font Stack

```typescript
// Using next/font for optimal loading
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
```

### Type Scale

```css
/* Headings */
.h1 { font-size: 3.75rem; line-height: 1.1; }  /* 60px */
.h2 { font-size: 3rem; line-height: 1.2; }     /* 48px */
.h3 { font-size: 2.25rem; line-height: 1.3; }  /* 36px */
.h4 { font-size: 1.875rem; line-height: 1.4; } /* 30px */
.h5 { font-size: 1.5rem; line-height: 1.5; }   /* 24px */
.h6 { font-size: 1.25rem; line-height: 1.5; }  /* 20px */

/* Body Text */
.text-xl { font-size: 1.25rem; line-height: 1.75; }  /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.75; } /* 18px */
.text-base { font-size: 1rem; line-height: 1.5; }    /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.5; }  /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1.5; }   /* 12px */

/* Weights */
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

### Responsive Typography

```typescript
// Tailwind classes
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Responsive Heading
</h1>

<p className="text-base md:text-lg lg:text-xl">
  Responsive paragraph
</p>
```

## Spacing System

Using an 8px base unit (Tailwind's default):

```css
/* Spacing Scale */
0.5  →  2px   (0.125rem)
1    →  4px   (0.25rem)
2    →  8px   (0.5rem)
3    →  12px  (0.75rem)
4    →  16px  (1rem)
5    →  20px  (1.25rem)
6    →  24px  (1.5rem)
8    →  32px  (2rem)
10   →  40px  (2.5rem)
12   →  48px  (3rem)
16   →  64px  (4rem)
20   →  80px  (5rem)
24   →  96px  (6rem)
```

### Common Spacing Patterns

```typescript
// Section padding
<section className="py-16 md:py-24 lg:py-32">

// Container padding
<div className="px-4 md:px-6 lg:px-8">

// Component gaps
<div className="space-y-4">      // Vertical spacing
<div className="flex gap-4">     // Horizontal spacing
```

## Layout

### Container

```typescript
// Max-width container with responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
  {children}
</div>
```

### Grid System

```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {/* Grid items */}
</div>
```

### Breakpoints

```typescript
// Tailwind breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices (tablets)
lg: '1024px'  // Large devices (desktops)
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
```

## Components

### Buttons

```typescript
// Button variants
<Button variant="default">Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
<Button variant="destructive">Destructive Button</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Cards

```typescript
// Project card
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Project description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Card actions */}
  </CardFooter>
</Card>
```

### Forms

```typescript
// Form field
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
  />
  {error && <p className="text-sm text-destructive">{error}</p>}
</div>

// Form with react-hook-form
<form onSubmit={handleSubmit(onSubmit)}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</form>
```

### Badges

```typescript
// Badge variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

## Animations

### Transitions

```css
/* Duration */
.transition-fast { transition-duration: 150ms; }
.transition-base { transition-duration: 200ms; }
.transition-slow { transition-duration: 300ms; }

/* Easing */
.ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

### Framer Motion Variants

```typescript
// Fade in up animation
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Usage
<motion.div
  initial="initial"
  animate="animate"
  variants={fadeInUp}
>
  Content
</motion.div>
```

### Common Animations

```typescript
// Hover effects
<div className="transition-transform hover:scale-105">

// Button hover
<button className="transition-colors hover:bg-primary/90">

// Card hover
<div className="transition-shadow hover:shadow-lg">

// Image zoom on hover
<div className="overflow-hidden">
  <img className="transition-transform hover:scale-110" />
</div>
```

## Icons

### Lucide React

```typescript
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

// Usage
<Github className="w-5 h-5" />
<Mail className="w-6 h-6 text-primary" />
```

### Icon Sizes

```typescript
// Standard sizes
w-4 h-4  → 16px (small)
w-5 h-5  → 20px (default)
w-6 h-6  → 24px (medium)
w-8 h-8  → 32px (large)
w-10 h-10 → 40px (extra large)
```

## Shadows

```css
/* Shadow scale */
.shadow-sm   → 0 1px 2px 0 rgb(0 0 0 / 0.05)
.shadow      → 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
.shadow-md   → 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
.shadow-lg   → 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
.shadow-xl   → 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
.shadow-2xl  → 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## Border Radius

```css
/* Radius scale */
.rounded-none → 0px
.rounded-sm   → 0.125rem (2px)
.rounded      → 0.25rem (4px)
.rounded-md   → 0.375rem (6px)
.rounded-lg   → 0.5rem (8px)
.rounded-xl   → 0.75rem (12px)
.rounded-2xl  → 1rem (16px)
.rounded-3xl  → 1.5rem (24px)
.rounded-full → 9999px (circle)
```

## Images

### Aspect Ratios

```typescript
// Common aspect ratios
<div className="aspect-square">  {/* 1:1 */}
<div className="aspect-video">   {/* 16:9 */}
<div className="aspect-[4/3]">   {/* 4:3 */}
<div className="aspect-[3/2]">   {/* 3:2 */}
```

### Image Optimization

```typescript
// Using next/image
<Image
  src="/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  className="rounded-lg"
/>
```

## Loading States

### Skeleton

```typescript
<div className="space-y-4">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

### Spinner

```typescript
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
</div>
```

## Empty States

```typescript
<div className="flex flex-col items-center justify-center py-12 text-center">
  <Icon className="w-12 h-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">No projects found</h3>
  <p className="text-muted-foreground">
    Try adjusting your filters or check back later.
  </p>
  <Button className="mt-4">Add Project</Button>
</div>
```

## Error States

```typescript
<div className="rounded-lg border border-destructive bg-destructive/10 p-4">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
    <div>
      <h4 className="font-semibold text-destructive">Error</h4>
      <p className="text-sm text-muted-foreground">{errorMessage}</p>
    </div>
  </div>
</div>
```

## Accessibility

### Focus States

```css
/* Custom focus ring */
.focus-visible:outline-none 
.focus-visible:ring-2 
.focus-visible:ring-ring 
.focus-visible:ring-offset-2
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Responsive Design

### Mobile First

```typescript
// Start with mobile, add larger breakpoints
<div className="
  text-sm          // Mobile
  md:text-base     // Tablet
  lg:text-lg       // Desktop
">
```

### Common Patterns

```typescript
// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="block md:hidden">

// Different layouts
<div className="
  flex flex-col      // Mobile: vertical stack
  md:flex-row        // Tablet+: horizontal
  gap-4 md:gap-6     // Responsive spacing
">
```

## Design Tokens

```typescript
// src/config/design-tokens.ts
export const designTokens = {
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
};
```

## Best Practices

1. **Consistency**: Use design tokens, don't hardcode values
2. **Accessibility**: Always include focus states and ARIA labels
3. **Performance**: Optimize images, lazy load when appropriate
4. **Responsive**: Test on multiple devices and screen sizes
5. **Dark Mode**: Test all colors in both themes
6. **Animation**: Use subtle animations, respect `prefers-reduced-motion`
7. **Typography**: Maintain readable line lengths (60-75 characters)
8. **Contrast**: Ensure 4.5:1 contrast ratio for text

---

This design system ensures a cohesive, accessible, and performant user interface! 🎨

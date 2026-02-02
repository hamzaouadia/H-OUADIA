# 🚀 Deployment Guide

This guide covers deploying your portfolio website to production using Vercel (recommended), along with alternative deployment options.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deploy to Vercel (Recommended)](#deploy-to-vercel-recommended)
3. [Alternative Deployments](#alternative-deployments)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Database Migration](#database-migration)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (`pnpm test`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Production build succeeds (`pnpm build`)
- [ ] Environment variables are documented in `.env.example`
- [ ] Database schema is finalized
- [ ] All images are optimized
- [ ] SEO metadata is complete
- [ ] Analytics are configured
- [ ] Error tracking is set up (Sentry)
- [ ] Contact form is tested
- [ ] All links work correctly
- [ ] Responsive design is verified

---

## Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides the best deployment experience for Next.js applications.

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### Step 2: Import Project

```bash
# Option 1: Via Vercel Dashboard
1. Click "Add New Project"
2. Select your GitHub repository
3. Configure project settings
4. Deploy

# Option 2: Via Vercel CLI
npm i -g vercel
vercel login
vercel
```

### Step 3: Configure Build Settings

Vercel auto-detects Next.js projects. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node Version**: 20.x

### Step 4: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Sentry (optional)
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxxxxxxxxxx
```

**Important**: Add variables to all environments:
- Production
- Preview
- Development (optional)

### Step 5: Deploy

```bash
# First deployment
vercel

# Production deployment
vercel --prod

# Or push to main branch (automatic deployment)
git push origin main
```

### Step 6: Verify Deployment

1. Wait for build to complete (2-5 minutes)
2. Visit the preview URL provided
3. Test all functionality:
   - [ ] Homepage loads correctly
   - [ ] All sections display properly
   - [ ] Contact form works
   - [ ] Projects load from database
   - [ ] Theme toggle works
   - [ ] Responsive design works
   - [ ] Images load correctly

---

## Alternative Deployments

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Configure netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Add environment variables
railway variables set DATABASE_URL=postgresql://...
```

### AWS Amplify

1. Go to AWS Amplify Console
2. Connect repository
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Self-Hosted (VPS)

```bash
# On your server (Ubuntu example)

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
pnpm install

# Build
pnpm build

# Set up PM2 (process manager)
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup

# Set up Nginx reverse proxy
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/portfolio

# Add configuration:
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables

### Production Environment Variables

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Application (Required)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Email (Required for contact form)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"

# Analytics (Optional but recommended)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Error Tracking (Optional but recommended)
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
SENTRY_AUTH_TOKEN="xxxxxxxxxxxxx"
SENTRY_ORG="your-org"
SENTRY_PROJECT="portfolio"

# NextAuth (if using admin dashboard)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL="https://xxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxxxxxxxxxxx"
```

### Getting API Keys

#### Resend (Email)
1. Visit [resend.com](https://resend.com)
2. Sign up and verify email
3. Go to API Keys → Create API Key
4. Copy key to `RESEND_API_KEY`

#### Supabase (Database)
1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Wait for database to provision
4. Settings → Database → Connection String
5. Copy to `DATABASE_URL`

#### Sentry (Error Tracking)
1. Visit [sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Copy DSN to `SENTRY_DSN`
4. Settings → Auth Tokens → Create New Token
5. Copy to `SENTRY_AUTH_TOKEN`

---

## Custom Domain Setup

### Step 1: Purchase Domain

Popular registrars:
- Namecheap
- Google Domains
- Cloudflare Registrar
- GoDaddy

### Step 2: Add Domain to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Domains
4. Add your domain: `yourdomain.com`
5. Also add `www.yourdomain.com`

### Step 3: Configure DNS

Vercel will provide DNS records to add:

**Option 1: Use Vercel DNS (Easiest)**
- Update nameservers at your registrar to Vercel's nameservers

**Option 2: Add A/CNAME Records**

Add these records at your registrar:

```
# Apex domain (yourdomain.com)
Type: A
Name: @
Value: 76.76.21.21

# www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Can take up to 48 hours
- Check status: `dig yourdomain.com`

### Step 5: Enable SSL

- Vercel automatically provisions SSL certificates
- Should be ready within minutes
- Verify: visit `https://yourdomain.com`

---

## Database Migration

### Migrate from Development to Production

```bash
# Option 1: Use Prisma Migrate (recommended)
# Generate migration
pnpm prisma migrate dev --name init

# Apply to production
DATABASE_URL="postgresql://prod-url" pnpm prisma migrate deploy

# Option 2: Push schema directly (for prototyping)
DATABASE_URL="postgresql://prod-url" pnpm prisma db push

# Seed production database
DATABASE_URL="postgresql://prod-url" pnpm db:seed
```

### Backup Strategy

```bash
# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql

# Automated backups (Supabase provides automatic backups)
# Set up on your database provider's dashboard
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

```bash
# Install Sentry
pnpm add @sentry/nextjs

# Initialize
pnpm dlx @sentry/wizard@latest -i nextjs

# Configure in sentry.client.config.js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Analytics (Vercel Analytics)

```bash
# Install
pnpm add @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Performance Monitoring

```bash
# Vercel Speed Insights
pnpm add @vercel/speed-insights

# Add to layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Post-Deployment

### SEO Setup

#### Google Search Console

1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://yourdomain.com`
3. Verify ownership (HTML file or DNS)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

#### Bing Webmaster Tools

1. Visit [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site
3. Verify ownership
4. Submit sitemap

### Performance Testing

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# PageSpeed Insights
# Visit: https://pagespeed.web.dev/
# Test: https://yourdomain.com
```

### Security Headers Check

Visit: [securityheaders.com](https://securityheaders.com)
Test: `https://yourdomain.com`

### SSL Check

Visit: [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/)
Test: `https://yourdomain.com`

### Uptime Monitoring

Set up with:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://statuscake.com)

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Push to main = production deployment
git push origin main

# Push to other branches = preview deployment
git push origin feature/new-feature
```

### Preview Deployments

- Every push to any branch creates a preview
- Unique URL for each preview
- Perfect for testing and sharing
- Automatic cleanup after merge

### Rollback

```bash
# Via Vercel Dashboard
1. Go to Deployments
2. Find previous deployment
3. Click "..." → Promote to Production

# Via CLI
vercel rollback
```

---

## Troubleshooting

### Build Fails

```bash
# Check build logs in Vercel dashboard
# Common issues:

# 1. Missing environment variables
# Solution: Add to Vercel dashboard

# 2. TypeScript errors
# Solution: Run `pnpm type-check` locally and fix

# 3. Dependency issues
# Solution: Delete node_modules and pnpm-lock.yaml, reinstall

# 4. Build timeout
# Solution: Optimize build, upgrade Vercel plan
```

### Database Connection Issues

```bash
# Check DATABASE_URL format
postgresql://user:password@host:5432/database?sslmode=require

# Verify SSL mode is set
# Test connection
pnpm prisma db push
```

### Images Not Loading

```bash
# Add domains to next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

---

## Maintenance

### Regular Tasks

**Daily:**
- Check error logs (Sentry)
- Monitor uptime

**Weekly:**
- Review analytics
- Check performance metrics
- Review contact form submissions

**Monthly:**
- Update dependencies
- Review and optimize database
- Check SEO performance
- Backup database

### Updates

```bash
# Update dependencies
pnpm update

# Update Next.js
pnpm update next react react-dom

# Check for security vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

---

## Cost Estimate

### Vercel (Recommended)

**Hobby Plan (Free):**
- ✅ Perfect for portfolios
- ✅ Unlimited personal projects
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Serverless functions

**Pro Plan ($20/month):**
- Everything in Hobby
- Better performance
- Analytics
- Priority support

### Database (Supabase)

**Free Tier:**
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ✅ Perfect for portfolios

**Pro Plan ($25/month):**
- 8GB database
- Automatic backups
- Better performance

### Total Cost

**Free Setup:** $0/month
- Vercel Hobby
- Supabase Free
- Domain only (~$10-15/year)

**Professional Setup:** ~$45/month
- Vercel Pro
- Supabase Pro
- Domain

---

## Launch Checklist

Before announcing your portfolio:

- [ ] All features work correctly
- [ ] Contact form tested and receiving emails
- [ ] All links work (no 404s)
- [ ] Images load properly
- [ ] Responsive on all devices
- [ ] Fast load times (< 3s)
- [ ] SEO metadata complete
- [ ] Sitemap submitted to search engines
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Custom domain configured
- [ ] SSL certificate active (HTTPS)
- [ ] Performance score 90+ (Lighthouse)
- [ ] Accessibility score 90+ (Lighthouse)
- [ ] Content proofread
- [ ] Resume PDF downloadable
- [ ] Social links working
- [ ] Uptime monitoring configured

---

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Congratulations on deploying your portfolio! 🎉**

Now share it with the world and keep it updated with your latest work!

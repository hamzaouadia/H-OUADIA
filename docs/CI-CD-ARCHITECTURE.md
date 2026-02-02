# 🔄 CI/CD Architecture

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) strategy for the portfolio project, aligned with our branching strategy.

## Overview

Our CI/CD pipeline ensures code quality, automated testing, and seamless deployments across different environments. Every branch type has specific automated workflows that run on push or pull request events.

## CI/CD Philosophy

### Core Principles

1. **Automate Everything**: From testing to deployment
2. **Fail Fast**: Catch issues early in the pipeline
3. **Environment Parity**: Keep dev, staging, and production similar
4. **Zero-Downtime Deploys**: No service interruption
5. **Rollback Ready**: Easy to revert problematic deployments

### Pipeline Goals

- ✅ Maintain code quality through automated checks
- ✅ Prevent broken code from reaching production
- ✅ Speed up development with automated deployments
- ✅ Provide fast feedback to developers
- ✅ Ensure consistent build and deploy processes

## Environment Strategy

### Environments

| Environment | Branch | URL | Purpose | Auto-Deploy |
|------------|--------|-----|---------|-------------|
| **Production** | `main` | `https://hamzaouadia.com` | Live site | ✅ Yes |
| **Staging** | `develop` | `https://staging-hamzaouadia.vercel.app` | Pre-production testing | ✅ Yes |
| **Preview** | `feature/*`, `bugfix/*`, etc. | `https://preview-*.vercel.app` | Feature testing | ✅ Yes |
| **Local** | Any branch | `http://localhost:3000` | Development | ❌ No |

### Environment Variables

Each environment has its own set of environment variables:

```bash
# Production (main)
DATABASE_URL=postgresql://prod-db-url
NEXT_PUBLIC_APP_URL=https://hamzaouadia.com
NODE_ENV=production

# Staging (develop)
DATABASE_URL=postgresql://staging-db-url
NEXT_PUBLIC_APP_URL=https://staging-hamzaouadia.vercel.app
NODE_ENV=production

# Preview (feature branches)
DATABASE_URL=postgresql://preview-db-url
NEXT_PUBLIC_APP_URL=https://preview-*.vercel.app
NODE_ENV=production
```

## Pipeline Architecture

### Branch-Specific Workflows

```
┌─────────────────────────────────────────────────────────────┐
│                     CI/CD Pipeline Flow                      │
└─────────────────────────────────────────────────────────────┘

feature/* ──┐
bugfix/*  ──┤
refactor/*──┤──> PR to develop ──> [CI Checks] ──> [Preview Deploy]
docs/*    ──┤
ci-cd/*   ──┘

develop ────────────> [CI Checks] ──> [Staging Deploy]
            
release/* ──> PR to main ──> [CI Checks] ──> [Production Deploy]

hotfix/*  ──> PR to main ──> [CI Checks] ──> [Production Deploy]
                         └──> PR to develop ──> [Staging Deploy]

main ───────────────> [Production Deploy] ──> [Smoke Tests]
```

## GitHub Actions Workflows

### 1. Pull Request Checks

**File**: `.github/workflows/pr-checks.yml`

**Triggers**: Pull requests to `develop` or `main`

**Steps**:
1. Checkout code
2. Setup Node.js & pnpm
3. Install dependencies
4. Run linting (ESLint)
5. Run type checking (TypeScript)
6. Run unit tests (Jest)
7. Run build
8. Check bundle size
9. Run E2E tests (Playwright)
10. Upload coverage reports

**Status**: Must pass before merge

```yaml
name: PR Checks

on:
  pull_request:
    branches: [develop, main]

jobs:
  quality:
    name: Code Quality & Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Lint code
        run: pnpm lint
        
      - name: Type check
        run: pnpm type-check
        
      - name: Run unit tests
        run: pnpm test:coverage
        
      - name: Build project
        run: pnpm build
        
      - name: Check bundle size
        run: pnpm analyze
        
      - name: Run E2E tests
        run: pnpm test:e2e
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          
  security:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run security audit
        run: pnpm audit --audit-level=moderate
        
      - name: Check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### 2. Develop Branch CI/CD

**File**: `.github/workflows/staging-deploy.yml`

**Triggers**: Push to `develop` branch

**Steps**:
1. Run all PR checks
2. Deploy to staging environment
3. Run smoke tests
4. Notify team on Slack/Discord

```yaml
name: Staging Deployment

on:
  push:
    branches: [develop]

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm test
        
      - name: Build
        run: pnpm build
        
      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          alias-domains: staging-hamzaouadia.vercel.app
          
      - name: Run smoke tests
        run: |
          curl -f https://staging-hamzaouadia.vercel.app || exit 1
          
      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Staging deployment completed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 3. Production Deployment

**File**: `.github/workflows/production-deploy.yml`

**Triggers**: Push to `main` branch

**Steps**:
1. Run full test suite
2. Build production bundle
3. Deploy to production
4. Run smoke tests
5. Update Sentry release
6. Send notifications

```yaml
name: Production Deployment

on:
  push:
    branches: [main]

jobs:
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://hamzaouadia.com
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run full test suite
        run: |
          pnpm lint
          pnpm type-check
          pnpm test:coverage
          pnpm build
          
      - name: Deploy to Vercel (Production)
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          alias-domains: hamzaouadia.com
          
      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: hamzaouadia
          SENTRY_PROJECT: portfolio
        with:
          environment: production
          
      - name: Run smoke tests
        run: |
          curl -f https://hamzaouadia.com || exit 1
          curl -f https://hamzaouadia.com/api/health || exit 1
          
      - name: Notify success
        uses: 8398a7/action-slack@v3
        if: success()
        with:
          status: success
          text: '✅ Production deployment successful!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          
      - name: Notify failure
        uses: 8398a7/action-slack@v3
        if: failure()
        with:
          status: failure
          text: '❌ Production deployment failed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 4. Preview Deployments

**File**: `.github/workflows/preview-deploy.yml`

**Triggers**: Pull requests from `feature/*`, `bugfix/*`, etc.

**Steps**:
1. Create preview deployment
2. Comment PR with preview URL
3. Run basic tests

```yaml
name: Preview Deployment

on:
  pull_request:
    branches: [develop]
    types: [opened, synchronize, reopened]

jobs:
  preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Deploy preview to Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          
      - name: Comment PR with preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🚀 Preview Deployment
              
              Your changes have been deployed to preview!
              
              🔗 **Preview URL**: ${{ steps.deploy.outputs.preview-url }}
              
              📝 **Commit**: ${{ github.event.pull_request.head.sha }}
              `
            })
```

### 5. Scheduled Tasks

**File**: `.github/workflows/scheduled-tasks.yml`

**Triggers**: Cron schedule

**Tasks**:
- Dependency updates check
- Security audits
- Database backups
- Performance monitoring

```yaml
name: Scheduled Tasks

on:
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Manual trigger

jobs:
  dependency-check:
    name: Check Dependencies
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        
      - name: Check for updates
        run: pnpm outdated
        
      - name: Create update PR
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: update dependencies'
          branch: chore/dependency-updates
          title: 'chore: automated dependency updates'
          
  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run security audit
        run: pnpm audit
        
      - name: Notify on vulnerabilities
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: '⚠️ Security vulnerabilities detected!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Deployment Strategies

### Vercel Deployment (Recommended)

**Automatic Deployments**:
- Every push to `main` → Production
- Every push to `develop` → Staging
- Every PR → Preview environment

**Configuration**:
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### Manual Deployment

If needed, manual deployment can be triggered:

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy to specific alias
vercel --alias staging-hamzaouadia.vercel.app
```

## Testing Strategy in CI/CD

### Test Pyramid

```
        /\
       /E2E\         (Few - Slow - Expensive)
      /------\
     /  API   \      (Some - Medium - Moderate)
    /----------\
   /   Unit     \    (Many - Fast - Cheap)
  /--------------\
```

### Test Execution

**Pull Request**:
- ✅ Unit tests (always)
- ✅ Integration tests (always)
- ✅ E2E tests (always)
- ✅ Visual regression tests (optional)

**Develop Branch**:
- ✅ Full test suite
- ✅ Performance tests
- ✅ Smoke tests on staging

**Main Branch**:
- ✅ Full test suite
- ✅ Smoke tests on production
- ✅ Post-deployment monitoring

## Monitoring & Observability

### Tools Integration

1. **Sentry** - Error tracking
   - Automatic release tracking
   - Source map upload
   - Performance monitoring

2. **Vercel Analytics** - Performance metrics
   - Real User Monitoring (RUM)
   - Core Web Vitals
   - Page load times

3. **Uptime Monitoring**
   - Health check endpoints
   - Automated alerts
   - SLA tracking

### Health Check Endpoints

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA,
  });
}
```

## Rollback Strategy

### Automatic Rollback

Vercel supports instant rollbacks:

```bash
# Via Vercel Dashboard
1. Go to Deployments
2. Find previous stable deployment
3. Click "Promote to Production"

# Via CLI
vercel rollback
```

### Manual Rollback

Using Git:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force
```

## Secrets Management

### GitHub Secrets

Store sensitive data in GitHub Secrets:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
DATABASE_URL
RESEND_API_KEY
SENTRY_AUTH_TOKEN
SLACK_WEBHOOK
SNYK_TOKEN
```

### Adding Secrets

```bash
# Via GitHub UI
Repository → Settings → Secrets and variables → Actions → New secret

# Via GitHub CLI
gh secret set VERCEL_TOKEN
```

## Performance Optimization

### Build Cache

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-
```

### Parallel Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
    
  test:
    runs-on: ubuntu-latest
    steps: [...]
    
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]  # Wait for lint and test
    steps: [...]
```

## CI/CD Best Practices

### 1. Fast Feedback
- Keep CI pipeline under 10 minutes
- Run fast tests first
- Fail fast on linting/type errors

### 2. Reliable Tests
- Avoid flaky tests
- Use proper test isolation
- Mock external dependencies

### 3. Secure Pipeline
- Never log secrets
- Use least-privilege access
- Scan for security issues

### 4. Clear Notifications
- Notify on failures
- Include relevant context
- Link to logs and artifacts

### 5. Documentation
- Document pipeline steps
- Keep workflows version controlled
- Update on changes

## Troubleshooting

### Build Failures

**Issue**: Build fails in CI but works locally

**Solutions**:
```bash
# Check Node version
node -v  # Should match CI (20.x)

# Clear cache
rm -rf node_modules .next
pnpm install

# Run build locally
pnpm build
```

### Test Failures

**Issue**: Tests pass locally but fail in CI

**Solutions**:
- Check environment variables
- Verify test isolation
- Check for timezone issues
- Review CI logs for details

### Deployment Failures

**Issue**: Deployment fails

**Solutions**:
1. Check Vercel status page
2. Verify environment variables
3. Check build logs
4. Verify domain configuration

## Migration Guide

### From Manual to Automated

**Step 1**: Set up GitHub Actions
```bash
mkdir -p .github/workflows
# Add workflow files
```

**Step 2**: Configure secrets
```bash
# Add all required secrets to GitHub
```

**Step 3**: Test workflows
```bash
# Create test PR to verify CI
# Deploy to staging first
# Then enable production deploys
```

**Step 4**: Monitor
```bash
# Watch first few automated deploys
# Verify all checks pass
# Ensure notifications work
```

## Quick Reference

### Common Commands

```bash
# Run CI checks locally
pnpm lint && pnpm type-check && pnpm test && pnpm build

# Trigger manual workflow
gh workflow run production-deploy.yml

# View workflow status
gh run list

# View logs
gh run view <run-id>

# Cancel run
gh run cancel <run-id>
```

### Branch → Workflow Mapping

| Branch Type | Workflows Triggered |
|------------|---------------------|
| `feature/*` → develop PR | PR checks, Preview deploy |
| `bugfix/*` → develop PR | PR checks, Preview deploy |
| `hotfix/*` → main PR | PR checks, Preview deploy |
| `release/*` → main PR | PR checks, Preview deploy |
| `develop` push | Staging deploy, Full tests |
| `main` push | Production deploy, Full tests, Monitoring |
| `ci-cd/*` → develop PR | PR checks, Workflow validation |

## Summary

This CI/CD architecture ensures:
- ✅ Automated quality checks on every change
- ✅ Fast feedback for developers
- ✅ Safe, automated deployments
- ✅ Environment isolation and testing
- ✅ Easy rollbacks when needed
- ✅ Comprehensive monitoring

**Remember**: The goal is to deploy with confidence, knowing that every change has been thoroughly tested and validated automatically.

---

**Built with automation in mind! 🚀**

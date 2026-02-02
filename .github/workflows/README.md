# GitHub Actions Workflows

This directory contains all CI/CD workflows for the Hamza Ouadia Portfolio project.

## 🔄 Workflows Overview

### 1. **pr-checks.yml** - Pull Request Quality Checks
**Trigger**: On PR to `develop` or `main`

**Jobs**:
- ✅ **Lint**: ESLint code quality checks
- 🔍 **Type Check**: TypeScript type validation
- 🧪 **Test**: Unit and integration tests with coverage
- 🏗️ **Build**: Verify successful build
- 🔒 **Security**: Dependency vulnerability audit

**Purpose**: Ensures code quality before merging into protected branches.

---

### 2. **staging-deploy.yml** - Staging Environment Deployment
**Trigger**: Push to `develop` branch

**Jobs**:
- 🧪 **Test**: Full test suite
- 🚀 **Deploy**: Deploy to Vercel staging environment

**Environment**: `staging`  
**URL**: https://staging-hamzaouadia.vercel.app

**Purpose**: Automatic deployment to staging for integration testing.

---

### 3. **production-deploy.yml** - Production Deployment
**Trigger**: Push to `main` branch

**Jobs**:
- 🧪 **Test**: Full test suite including build
- 🚀 **Deploy**: Deploy to Vercel production
- 📊 **Sentry**: Create release in Sentry for error tracking

**Environment**: `production`  
**URL**: https://hamzaouadia.com

**Purpose**: Automatic production deployment with monitoring integration.

---

### 4. **preview-deploy.yml** - Feature Branch Preview
**Trigger**: PR to `develop` (from feature branches)

**Jobs**:
- 🚀 **Deploy Preview**: Create temporary preview deployment
- 💬 **PR Comment**: Add preview URL to PR comments

**Purpose**: Provides isolated preview environments for testing features before merging.

---

### 5. **scheduled-tasks.yml** - Daily Maintenance
**Trigger**: Daily at 2 AM UTC (or manual)

**Jobs**:
- 🔒 **Security Audit**: Check for package vulnerabilities
- 📦 **Update Check**: Identify outdated dependencies
- 🏥 **Health Check**: Verify production and staging sites

**Purpose**: Proactive monitoring and maintenance.

---

## 🔐 Required Secrets

Configure these secrets in GitHub Settings → Secrets and Variables → Actions:

### Vercel Secrets
```bash
VERCEL_TOKEN          # Vercel API token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

**How to get these**:
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token with deployment permissions
3. Get org ID and project ID from project settings

### Sentry (Optional)
```bash
SENTRY_AUTH_TOKEN     # Sentry API token for release tracking
```

### Codecov (Optional)
```bash
CODECOV_TOKEN         # For uploading test coverage reports
```

---

## 🌿 Branch-to-Workflow Mapping

| Branch Pattern | Workflows Triggered |
|---------------|-------------------|
| PR → `develop` | `pr-checks.yml`, `preview-deploy.yml` |
| PR → `main` | `pr-checks.yml` |
| Push to `develop` | `staging-deploy.yml` |
| Push to `main` | `production-deploy.yml` |
| Daily Schedule | `scheduled-tasks.yml` |

---

## 🚀 Deployment Flow

```
feature/* branch
    ↓ (Create PR to develop)
    ├─ pr-checks.yml runs
    └─ preview-deploy.yml creates preview
    ↓ (Merge to develop)
develop branch
    └─ staging-deploy.yml deploys to staging
    ↓ (Test on staging)
    ↓ (Create PR to main)
    └─ pr-checks.yml runs
    ↓ (Merge to main)
main branch
    └─ production-deploy.yml deploys to production
```

---

## 📋 Setting Up GitHub Environments

Create these environments in GitHub Settings → Environments:

### Staging Environment
- **Name**: `staging`
- **Protection Rules**: None (auto-deploy from develop)
- **Environment URL**: https://staging-hamzaouadia.vercel.app

### Production Environment
- **Name**: `production`
- **Protection Rules**: 
  - ✅ Required reviewers (1+)
  - ✅ Wait timer (optional: 5 minutes)
- **Environment URL**: https://hamzaouadia.com

---

## 🛠️ Local Testing

You can test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run PR checks locally
act pull_request --workflows .github/workflows/pr-checks.yml

# Run staging deploy locally (requires secrets)
act push --workflows .github/workflows/staging-deploy.yml
```

---

## 📊 Monitoring Workflow Runs

- **GitHub Actions UI**: https://github.com/hamzaouadia/H-OUADIA/actions
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Sentry Releases**: https://sentry.io (after setup)

---

## 🔄 Workflow Maintenance

### Updating Dependencies
The workflows use pinned versions for stability:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `pnpm/action-setup@v2`

Update these versions quarterly or when security patches are released.

### Modifying Workflows
1. Create a `ci-cd/*` branch
2. Update workflow files
3. Test using `act` or a draft PR
4. Create PR to `develop` for review
5. Monitor first run carefully

---

## 📝 Best Practices

✅ **DO**:
- Keep workflows DRY using composite actions when needed
- Set appropriate timeouts to prevent hanging jobs
- Use `continue-on-error` for non-critical steps
- Cache dependencies with `actions/setup-node` cache
- Use specific action versions (not `@main` or `@latest`)

❌ **DON'T**:
- Store secrets in workflow files
- Run builds in parallel without proper isolation
- Skip security audits
- Deploy to production without tests passing

---

## 🆘 Troubleshooting

### Workflow fails with "Resource not accessible"
- Check that required secrets are configured
- Verify GitHub App permissions for the repository

### Vercel deployment fails
- Confirm `VERCEL_TOKEN` has deployment permissions
- Check that project ID and org ID match your Vercel account

### Tests timeout
- Increase timeout in workflow: `timeout-minutes: 30`
- Check for infinite loops or hanging promises

### Branch protection conflicts
- Ensure workflows complete before enabling "Require status checks"
- Add workflow names to required checks in branch protection rules

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [pnpm CI Documentation](https://pnpm.io/continuous-integration)
- [Project CI/CD Architecture](../docs/CI-CD-ARCHITECTURE.md)

---

**Last Updated**: January 2026  
**Maintainer**: Hamza Ouadia (@hamzaouadia)

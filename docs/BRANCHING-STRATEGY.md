# 🌳 Git Branching Strategy

This document outlines the Git branching strategy and workflow for the portfolio project. Following this strategy ensures organized development, easy collaboration, and stable releases.

## Branch Structure

### Main Branches

#### `main` (Production)
- **Purpose**: Production-ready code
- **Protection**: Protected, requires PR + reviews
- **Deployment**: Auto-deploys to production (Vercel)
- **Merges from**: `release/*` or `hotfix/*` only
- **Never commit directly**: Always merge via PR

#### `develop` (Development)
- **Purpose**: Integration branch for features
- **Protection**: Protected, requires PR
- **Deployment**: Auto-deploys to staging/preview
- **Merges from**: `feature/*`, `bugfix/*`, `refactor/*`
- **Merges to**: `release/*`

### Supporting Branches

#### `feature/*` (New Features)
- **Purpose**: Develop new features
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Naming**: `feature/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
feature/project-filtering
feature/contact-form
feature/dark-mode
feature/blog-system
```

#### `bugfix/*` (Bug Fixes)
- **Purpose**: Fix bugs in development
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Naming**: `bugfix/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
bugfix/contact-validation
bugfix/image-loading
bugfix/mobile-menu
```

#### `hotfix/*` (Production Fixes)
- **Purpose**: Critical fixes for production
- **Branches from**: `main`
- **Merges to**: `main` AND `develop`
- **Naming**: `hotfix/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
hotfix/security-vulnerability
hotfix/database-connection
hotfix/email-service
```

#### `release/*` (Release Preparation)
- **Purpose**: Prepare for production release
- **Branches from**: `develop`
- **Merges to**: `main` AND `develop`
- **Naming**: `release/v1.0.0`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
release/v1.0.0
release/v1.1.0
release/v2.0.0
```

#### `refactor/*` (Code Refactoring)
- **Purpose**: Code improvements without changing functionality
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Naming**: `refactor/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
refactor/api-structure
refactor/component-organization
refactor/database-queries
```

#### `docs/*` (Documentation)
- **Purpose**: Documentation updates only
- **Branches from**: `develop` or `main`
- **Merges to**: Source branch
- **Naming**: `docs/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
docs/update-readme
docs/api-documentation
docs/setup-guide
```

#### `ci-cd/*` (CI/CD & Infrastructure)
- **Purpose**: CI/CD pipelines, GitHub Actions, deployment configs
- **Branches from**: `develop`
- **Merges to**: `develop`
- **Naming**: `ci-cd/short-description`
- **Lifespan**: Temporary (deleted after merge)

**Examples:**
```bash
ci-cd/setup-github-actions
ci-cd/add-testing-pipeline
ci-cd/configure-vercel
ci-cd/add-code-coverage
```

## Branch Naming Conventions

### Format
```
<type>/<description>
```

### Rules
1. **Lowercase only**: `feature/new-component` ✅ not `Feature/New-Component` ❌
2. **Hyphens for spaces**: `feature/dark-mode` ✅ not `feature/dark_mode` ❌
3. **Descriptive**: `feature/project-filtering` ✅ not `feature/stuff` ❌
4. **Short but clear**: 2-4 words maximum
5. **No special characters**: Letters, numbers, hyphens only

### Valid Examples
```bash
✅ feature/user-authentication
✅ bugfix/form-validation
✅ hotfix/security-patch
✅ refactor/api-routes
✅ docs/contributing-guide
✅ ci-cd/setup-github-actions
✅ release/v1.2.0
```

### Invalid Examples
```bash
❌ Feature/UserAuth           # Wrong case
❌ feature/user_authentication # Underscores
❌ fix-bug                     # Missing type prefix
❌ feature/fix                 # Too vague
❌ feature/add-new-contact-form-with-validation # Too long
```

## Workflow Diagrams

### Feature Development Flow

```
develop
  │
  ├── feature/new-feature (create branch)
  │   │
  │   ├── (commits)
  │   ├── (commits)
  │   └── (commits)
  │
  └── (merge via PR) ──> develop
```

### Hotfix Flow

```
main (v1.0.0)
  │
  ├── hotfix/critical-bug (create branch)
  │   │
  │   └── (commits)
  │
  ├── (merge via PR) ──> main (v1.0.1)
  │
  └── (merge via PR) ──> develop
```

### Release Flow

```
develop
  │
  ├── release/v1.0.0 (create branch)
  │   │
  │   ├── (version bump)
  │   ├── (bug fixes)
  │   └── (documentation)
  │
  ├── (merge via PR) ──> main (deploy to production)
  │
  └── (merge via PR) ──> develop (sync changes)
```

## Complete Workflow

### 1. Starting a New Feature

```bash
# Ensure develop is up to date
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/project-filtering

# Make changes and commit
git add .
git commit -m "feat: add project filtering by tags"

# Push to remote
git push origin feature/project-filtering

# Create Pull Request on GitHub
# Target: develop
```

### 2. Working on a Bug Fix

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create bugfix branch
git checkout -b bugfix/contact-validation

# Fix the bug
git add .
git commit -m "fix: resolve email validation issue"

# Push and create PR
git push origin bugfix/contact-validation
```

### 3. Handling a Hotfix

```bash
# Start from main (production)
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/security-patch

# Fix the critical issue
git add .
git commit -m "fix: patch security vulnerability in contact form"

# Push and create PR to main
git push origin hotfix/security-patch

# After merging to main, also merge to develop
git checkout develop
git pull origin develop
git merge hotfix/security-patch
git push origin develop
```

### 4. Preparing a Release

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/v1.0.0

# Bump version in package.json
npm version minor  # or patch, major

# Update CHANGELOG
# Make final adjustments

git add .
git commit -m "chore: prepare release v1.0.0"

# Push and create PR to main
git push origin release/v1.0.0

# After merge to main, also merge back to develop
git checkout develop
git merge release/v1.0.0
git push origin develop

# Tag the release on main
git checkout main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Pull Request Process

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature
   ```

2. **Open PR on GitHub**
   - Go to repository
   - Click "Pull Requests" → "New Pull Request"
   - Select base branch (usually `develop`)
   - Select your feature branch

3. **Fill PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [x] New feature
   - [ ] Breaking change
   
   ## Related Issues
   Fixes #123
   
   ## Testing
   - [x] Tests pass locally
   - [x] Manual testing completed
   
   ## Screenshots
   (if applicable)
   ```

### PR Review Checklist

**Before requesting review:**
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Documentation updated
- [ ] Commits follow conventional commits
- [ ] Branch is up to date with base branch

**Reviewer checks:**
- [ ] Code quality and readability
- [ ] Tests adequately cover changes
- [ ] No security vulnerabilities
- [ ] Performance considerations
- [ ] Documentation is clear

### Merging

**Merge Strategies:**

1. **Squash and Merge** (Recommended for features)
   - Combines all commits into one
   - Clean history
   - Use for `feature/*`, `bugfix/*`

2. **Merge Commit** (For releases)
   - Preserves all commits
   - Shows branch history
   - Use for `release/*`, `hotfix/*`

3. **Rebase and Merge** (Advanced)
   - Linear history
   - Use sparingly

## Branch Protection Rules

### `main` Branch
```yaml
Protection Rules:
  - Require pull request reviews (1+ approvals)
  - Require status checks to pass
  - Require branches to be up to date
  - No force pushes
  - No deletions
  - Require linear history (optional)
  - Require signed commits (optional)
```

### `develop` Branch
```yaml
Protection Rules:
  - Require pull request reviews (1+ approval)
  - Require status checks to pass
  - No force pushes
  - No deletions
```

### Setting Up Protection (GitHub)

```
Repository → Settings → Branches → Add Rule

Branch name pattern: main
☑ Require pull request reviews before merging
☑ Require status checks to pass before merging
☑ Require branches to be up to date before merging
☑ Include administrators
☑ Restrict who can push to matching branches
```

## Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
```
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style (formatting, missing semicolons)
refactor: Code refactoring
perf:     Performance improvements
test:     Adding or updating tests
chore:    Maintenance tasks
revert:   Revert previous commit
```

### Examples

**Simple:**
```bash
feat: add dark mode toggle
fix: resolve mobile menu closing issue
docs: update API documentation
```

**With scope:**
```bash
feat(projects): add filtering by tags
fix(contact): resolve email validation
refactor(api): simplify error handling
```

**With body:**
```bash
feat: add project search functionality

Implement full-text search for projects using PostgreSQL.
Includes debounced input and highlighted results.

Closes #42
```

## Keeping Branches Updated

### Update Feature Branch with Latest Develop

```bash
# Option 1: Merge (simpler)
git checkout feature/your-feature
git merge develop

# Option 2: Rebase (cleaner history)
git checkout feature/your-feature
git rebase develop

# If conflicts occur
# 1. Resolve conflicts
# 2. git add <resolved-files>
# 3. git rebase --continue (if rebasing)
#    or git commit (if merging)
```

### Sync Fork with Upstream

```bash
# Add upstream remote (one time)
git remote add upstream https://github.com/original/repo.git

# Fetch upstream changes
git fetch upstream

# Update your main
git checkout main
git merge upstream/main
git push origin main

# Update your develop
git checkout develop
git merge upstream/develop
git push origin develop
```

## Common Scenarios

### Scenario 1: Wrong Branch

**Started work on wrong branch?**

```bash
# Stash your changes
git stash

# Switch to correct branch
git checkout develop
git checkout -b feature/correct-branch

# Apply your changes
git stash pop
```

### Scenario 2: Need to Update PR

**PR has conflicts or needs changes?**

```bash
# Update your branch
git checkout feature/your-feature
git fetch origin
git merge origin/develop

# Make changes
git add .
git commit -m "fix: address review comments"

# Push (updates PR automatically)
git push origin feature/your-feature
```

### Scenario 3: Abandon Branch

**Need to cancel feature?**

```bash
# Switch to develop
git checkout develop

# Delete local branch
git branch -D feature/abandoned-feature

# Delete remote branch
git push origin --delete feature/abandoned-feature
```

### Scenario 4: Emergency Fix

**Production is broken?**

```bash
# Quick hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/urgent-fix

# Fix and test
git add .
git commit -m "fix: resolve critical production issue"

# Push and create PR immediately
git push origin hotfix/urgent-fix

# Create PR to main with priority label
# After merge, tag as patch release
```

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

### Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (v2.0.0)
- **MINOR**: New features, backwards compatible (v1.1.0)
- **PATCH**: Bug fixes, backwards compatible (v1.0.1)

### Examples

```bash
# Bug fix
v1.0.0 → v1.0.1

# New feature
v1.0.1 → v1.1.0

# Breaking change
v1.1.0 → v2.0.0

# Pre-release
v1.0.0-alpha.1
v1.0.0-beta.1
v1.0.0-rc.1
```

### Updating Version

```bash
# Patch (bug fixes)
npm version patch   # 1.0.0 → 1.0.1

# Minor (new features)
npm version minor   # 1.0.1 → 1.1.0

# Major (breaking changes)
npm version major   # 1.1.0 → 2.0.0
```

## CI/CD Integration

### Automated Checks on PR

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks

on:
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      - name: Lint
        run: pnpm lint
      - name: Type check
        run: pnpm type-check
      - name: Test
        run: pnpm test
      - name: Build
        run: pnpm build
```

### Auto-Deploy on Merge

**Develop → Staging:**
- Every push to `develop` deploys to staging
- Preview URL: `https://staging.yourdomain.com`

**Main → Production:**
- Every push to `main` deploys to production
- Production URL: `https://yourdomain.com`

## Quick Reference

### Branch Lifecycle

| Branch Type | From | To | Lifespan | Delete After Merge |
|------------|------|-------|----------|-------------------|
| `feature/*` | develop | develop | Days/Weeks | Yes |
| `bugfix/*` | develop | develop | Hours/Days | Yes |
| `hotfix/*` | main | main + develop | Hours | Yes |
| `release/*` | develop | main + develop | Days | Yes |
| `refactor/*` | develop | develop | Days | Yes |
| `docs/*` | any | same | Hours | Yes |
| `ci-cd/*` | develop | develop | Hours/Days | Yes |

### Common Commands

```bash
# Create branch
git checkout -b feature/name

# Update branch
git pull origin develop

# View branches
git branch -a

# Delete local branch
git branch -d feature/name

# Delete remote branch
git push origin --delete feature/name

# Sync with remote
git fetch origin
git pull origin develop

# Stash changes
git stash
git stash pop

# View history
git log --oneline --graph --all
```

## Best Practices

1. **Keep branches small**: One feature per branch
2. **Commit often**: Small, logical commits
3. **Update regularly**: Sync with base branch daily
4. **Write good commit messages**: Follow conventions
5. **Test before PR**: All tests must pass
6. **Delete merged branches**: Keep repository clean
7. **Never force push**: Especially to protected branches
8. **Code review everything**: Even small changes
9. **Use draft PRs**: For work in progress
10. **Tag releases**: Every production deployment

## Troubleshooting

### Merge Conflicts

```bash
# 1. Update your branch
git fetch origin
git merge origin/develop

# 2. Resolve conflicts in files
# Edit files to resolve conflicts

# 3. Mark as resolved
git add <resolved-files>

# 4. Complete merge
git commit

# 5. Push
git push origin feature/your-feature
```

### Undo Last Commit

```bash
# Keep changes (soft reset)
git reset --soft HEAD~1

# Discard changes (hard reset - dangerous!)
git reset --hard HEAD~1
```

### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b feature/recovered <commit-hash>
```

---

## Summary

Following this branching strategy ensures:
- ✅ Organized development workflow
- ✅ Stable production environment
- ✅ Easy collaboration
- ✅ Clear code history
- ✅ Safe deployments
- ✅ Quick hotfixes when needed

**Remember**: When in doubt, create a branch! Branches are cheap, production bugs are expensive.

Happy branching! 🌳

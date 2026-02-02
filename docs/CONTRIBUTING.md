# 🤝 Contributing Guidelines

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing.

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

**Bug Report Template:**
```markdown
**Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 20.10.0]
- Next.js: [e.g., 15.0.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Rationale** for the enhancement
- **Possible implementation** details
- **Alternatives** you've considered
- **Additional context** (mockups, examples)

**Enhancement Template:**
```markdown
**Feature Description:**
A clear description of the feature.

**Problem It Solves:**
Explain the problem this feature would solve.

**Proposed Solution:**
Describe your proposed solution.

**Alternatives Considered:**
List any alternative solutions you've considered.

**Additional Context:**
Add mockups, examples, or other context.
```

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow coding standards
   - Write/update tests
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/)

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Use a clear title
   - Fill out the PR template
   - Link related issues

### Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots of changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Development Setup

### Prerequisites
- Node.js 20+
- pnpm
- PostgreSQL

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/H-OUADIA.git
cd H-OUADIA

# Add upstream remote
git remote add upstream https://github.com/hamzaouadia/H-OUADIA.git

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
pnpm db:push
pnpm db:seed

# Start development
pnpm dev
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Coding Standards

### TypeScript
- Use TypeScript for all files
- Enable strict mode
- No `any` types (use `unknown` if needed)
- Define proper interfaces/types

### React/Next.js
- Use functional components
- Use hooks appropriately
- Server Components by default
- Client Components only when needed

### Styling
- Use Tailwind CSS
- Follow mobile-first approach
- Use `cn()` utility for conditional classes
- Maintain consistent spacing scale

### Code Quality
- Run linter: `pnpm lint`
- Run type check: `pnpm type-check`
- Format code: `pnpm format`
- Write tests for new features

### Git Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Code style (formatting)
refactor: Code refactoring
perf:     Performance improvements
test:     Tests
chore:    Maintenance

# Examples
feat(projects): add filtering by tags
fix(contact): resolve email validation
docs(readme): update setup instructions
```

## Testing

### Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# E2E tests
pnpm test:e2e

# E2E with UI
pnpm test:e2e:ui
```

### Writing Tests

```typescript
// Example unit test
describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });
});

// Example component test
describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
```

## Documentation

### Code Documentation

```typescript
/**
 * Component/function description.
 * 
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description
 * 
 * @example
 * ```tsx
 * <Component param1="value" />
 * ```
 */
```

### README Updates

When adding features, update:
- README.md
- Relevant documentation files
- Code examples
- Screenshots (if applicable)

## Review Process

### What We Look For

- **Code Quality**: Clean, readable, maintainable
- **Tests**: Adequate test coverage
- **Documentation**: Updated documentation
- **Performance**: No performance regressions
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: No security vulnerabilities

### Review Timeline

- Initial review: 1-3 days
- Follow-up reviews: 1-2 days
- Approval and merge: After all checks pass

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in README (for significant contributions)

## Questions?

- Create a [Discussion](https://github.com/hamzaouadia/H-OUADIA/discussions)
- Ask in pull request comments
- Reach out via [email](mailto:ouadia.h.dev@gmail.com)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing! 🎉**

Your contributions help make this project better for everyone.

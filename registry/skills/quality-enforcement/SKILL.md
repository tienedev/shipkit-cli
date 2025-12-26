---
name: quality-enforcement
description: Automated code quality checks and best practices enforcement. Use to maintain consistent code standards, catch issues early, and ensure production-ready code.
---

# Quality Enforcement

Maintain code quality through automated checks and best practices.

## Quality Checklist

### Before Committing
```bash
# Type checking
npm run typecheck  # or: npx tsc --noEmit

# Linting
npm run lint       # or: npx eslint . / npx biome check

# Tests
npm test

# Build verification
npm run build
```

### Code Standards

**TypeScript**
- Use strict mode
- Avoid `any` - prefer `unknown` or proper types
- No type assertions without validation
- Explicit return types on exported functions

**React**
- Use functional components
- Proper dependency arrays in hooks
- Avoid inline function definitions in JSX
- Memoize expensive computations

**General**
- No console.log in production code
- No commented-out code
- No TODO without issue reference
- No magic numbers - use constants

## Automated Checks

### ESLint Configuration
```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### Biome Configuration
```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true
  }
}
```

## Quality Gates

### Pre-commit
- Lint staged files
- Type check
- Format code

### Pre-push
- Run full test suite
- Build verification

### CI/CD
- All of the above
- Coverage thresholds
- Security scanning
- Bundle size checks

## Fix Common Issues

### Lint Errors
```bash
# Auto-fix what's possible
npm run lint:fix
# or
npx biome check --write .
```

### Type Errors
```bash
# Find all errors
npx tsc --noEmit

# Common fixes:
# - Add missing types
# - Fix import paths
# - Update interfaces
```

### Test Failures
```bash
# Run with details
npm test -- --verbose

# Update snapshots if intentional
npm test -- -u
```

## Best Practices

1. **Fix issues immediately** - Don't let tech debt accumulate
2. **Automate everything** - Use pre-commit hooks
3. **Review CI failures** - Never merge red builds
4. **Document exceptions** - If disabling a rule, explain why
5. **Regular updates** - Keep linters and dependencies current

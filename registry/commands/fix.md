---
description: Quick fixes for common issues (lint, types, tests, build)
argument-hint: [lint|types|tests|build|all]
---

# /fix Command

Automatically diagnose and fix common development issues.

## Usage

```
/fix lint    - Fix linting errors
/fix types   - Fix TypeScript errors
/fix tests   - Fix failing tests
/fix build   - Fix build errors
/fix all     - Run all fixes (default)
```

## Workflow

### /fix lint
1. Run linter with auto-fix:
   - `npm run lint:fix` or `npx biome check --write .`
2. Report remaining issues that need manual fixes
3. Suggest solutions for complex cases

### /fix types
1. Run TypeScript compiler: `npx tsc --noEmit`
2. Analyze errors by category:
   - Missing imports → Add import statements
   - Type mismatches → Update types or add assertions
   - Missing properties → Add to interface
3. Apply fixes systematically

### /fix tests
1. Run test suite: `npm test`
2. For each failure:
   - Analyze expected vs actual output
   - Determine if implementation or test is wrong
   - Apply appropriate fix
3. Re-run until all pass

### /fix build
1. Run build: `npm run build`
2. Categorize errors (compile, bundle, config)
3. Fix in dependency order
4. Verify build succeeds

## Quick Reference

```bash
# Lint
npm run lint:fix
npx biome check --write .

# Types
npx tsc --noEmit

# Tests
npm test -- --verbose

# Build
npm run build
```

## Common Fixes

| Error | Solution |
|-------|----------|
| Module not found | Check import path, verify file exists |
| Type mismatch | Add proper types or use type assertion |
| Unused variable | Remove or prefix with `_` |
| Missing dependency | `npm install <package>` |

## Arguments

- `$ARGUMENTS` contains the fix type
- Default to `all` if no argument provided

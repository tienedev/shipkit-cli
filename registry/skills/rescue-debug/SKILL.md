---
name: rescue-debug
description: Emergency debugging and code rescue for broken builds, failing tests, and critical errors. Use when things are broken and you need fast, focused fixes.
---

# Rescue & Debug

Fast-track debugging for emergencies when things are broken.

## Quick Diagnosis

### Build Broken?
```bash
# Clear all caches
rm -rf node_modules/.cache .next dist .turbo

# Fresh install
rm -rf node_modules package-lock.json
npm install

# Check for version conflicts
npm ls

# Verify TypeScript
npx tsc --noEmit
```

### Tests Failing?
```bash
# Run with details
npm test -- --verbose

# Run single test file
npm test -- path/to/test.ts

# Update snapshots (if intentional)
npm test -- -u

# Clear jest cache
npx jest --clearCache
```

### Runtime Errors?
```bash
# Check environment
echo $NODE_ENV
cat .env.local

# Verify dependencies
npm ls <package-name>

# Check for circular imports
npx madge --circular src/
```

## Common Fixes

### "Module not found"
```bash
# Check the import path
# Verify file exists
# Check tsconfig paths
# Restart TypeScript server
```

### "Type X is not assignable to type Y"
```bash
# Check the actual vs expected type
# Look for null/undefined handling
# Verify generic types match
# Check for version mismatches
```

### "Cannot read property of undefined"
```bash
# Add null checks
# Verify data is loaded before use
# Check async/await timing
# Add optional chaining ?.
```

### "Hydration mismatch"
```bash
# Check for browser-only code in SSR
# Use useEffect for client-only code
# Verify date/time handling
# Check for random values
```

## Emergency Checklist

```
[ ] What exactly is the error message?
[ ] When did it start failing?
[ ] What changed recently? (git diff)
[ ] Can you reproduce consistently?
[ ] Does it fail locally AND in CI?
[ ] Have you tried clearing caches?
[ ] Is the error in your code or dependencies?
```

## Rollback Strategy

If you can't fix it quickly:
```bash
# See recent changes
git log --oneline -10

# Revert last commit
git revert HEAD

# Go back to known good state
git checkout <commit-hash> -- path/to/file

# Stash current work
git stash
```

## Debug Tools

### Add Strategic Logs
```typescript
console.log('[DEBUG] functionName:', { var1, var2 });
console.trace('[TRACE] Call stack');
console.time('operation');
// ... code
console.timeEnd('operation');
```

### Use Debugger
```typescript
debugger; // Breakpoint in DevTools

// Or in Node.js
node --inspect-brk script.js
```

### Check Network
- DevTools Network tab
- Verify API responses
- Check request headers
- Look for CORS issues

## Prevention

After fixing:
1. Add a test to catch this
2. Document the root cause
3. Consider if others might hit this
4. Update error handling if needed

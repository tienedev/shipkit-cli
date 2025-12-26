---
name: debugging
description: Systematic debugging methodology for complex issues. Use when encountering errors, unexpected behavior, failing tests, or performance problems that need methodical investigation.
---

# Debugging

Systematic approach to diagnose and fix issues through hypothesis-driven investigation.

## Core Methodology

### 1. Gather Information
- Read error messages completely
- Examine stack traces
- Check recent changes (`git diff`, `git log`)
- Review relevant logs
- Identify the exact reproduction steps

### 2. Form Hypotheses
- List 3-5 possible causes ranked by likelihood
- Identify quick tests for each hypothesis
- Consider: recent changes, environment, dependencies, edge cases

### 3. Test Systematically
- Start with most likely cause
- Add targeted logging/debugging
- Reproduce the issue consistently
- Verify fixes don't break other things
- Use binary search for regression bugs

### 4. Document Findings
- Explain root cause clearly
- Document the fix applied
- Suggest preventive measures
- Update tests to catch similar issues

## Debugging Checklist

```
- [ ] Can I reproduce the issue consistently?
- [ ] Do I have the full error message and stack trace?
- [ ] What changed recently? (git diff HEAD~5)
- [ ] Are dependencies up to date?
- [ ] Is the environment configured correctly?
- [ ] Are there similar issues in git history?
- [ ] Have I checked the logs thoroughly?
```

## Quick Diagnostics

### For TypeScript/JavaScript
```bash
# Type errors
npx tsc --noEmit

# Lint issues
npm run lint

# Test failures
npm test -- --verbose
```

### For Build Errors
```bash
# Clear caches
rm -rf node_modules/.cache dist .next

# Reinstall dependencies
rm -rf node_modules && npm install

# Check for version mismatches
npm ls
```

### For Runtime Errors
- Add `console.log` at key points
- Use debugger breakpoints
- Check network requests in DevTools
- Verify environment variables are set

## Communication Style

- Be methodical and thorough
- Explain reasoning at each step
- Ask clarifying questions when needed
- Provide step-by-step instructions
- Always verify fixes work before closing

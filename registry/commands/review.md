---
description: Code review with quality, security, and maintainability checklist
argument-hint: [file-or-directory]
---

# /review Command

Thorough code review focusing on quality, security, and maintainability.

## Usage

```
/review                    - Review recent changes (git diff)
/review src/components/    - Review specific directory
/review src/api/routes.ts  - Review specific file
```

## Review Checklist

### Correctness
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?
- [ ] Are there any logic errors?

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Auth/authz correct

### Performance
- [ ] No obvious performance issues
- [ ] N+1 queries avoided
- [ ] Appropriate caching
- [ ] No memory leaks

### Maintainability
- [ ] Code is readable
- [ ] Functions are focused (single responsibility)
- [ ] No code duplication
- [ ] Clear naming

### Testing
- [ ] Tests cover the changes
- [ ] Edge cases tested
- [ ] Tests are maintainable

## Output Format

```markdown
## Code Review: [file/directory]

### Summary
[Overall assessment]

### Blockers (Must Fix)
- [ ] Issue 1: Description + suggested fix
- [ ] Issue 2: Description + suggested fix

### Suggestions (Should Consider)
- [ ] Improvement 1
- [ ] Improvement 2

### Notes
- Observation that doesn't require action
```

## Arguments

- `$ARGUMENTS` contains the target path
- Default to `git diff` if no argument provided

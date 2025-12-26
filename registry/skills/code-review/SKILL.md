---
name: code-review
description: Thorough code review with focus on quality, security, and maintainability. Use when reviewing pull requests, auditing code changes, or ensuring code quality standards.
---

# Code Review

Systematic code review for quality, security, and maintainability.

## Review Checklist

### Correctness
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?
- [ ] Are there any logic errors?

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] Authentication/authorization correct
- [ ] Sensitive data properly handled

### Performance
- [ ] No obvious performance issues
- [ ] Database queries optimized (N+1 queries avoided)
- [ ] Appropriate caching considered
- [ ] No memory leaks
- [ ] Async operations used where beneficial

### Maintainability
- [ ] Code is readable and self-documenting
- [ ] Functions are focused (single responsibility)
- [ ] No code duplication (DRY)
- [ ] Naming is clear and consistent
- [ ] Comments explain "why", not "what"

### Testing
- [ ] Tests cover the changes
- [ ] Edge cases tested
- [ ] Tests are readable and maintainable
- [ ] No flaky tests introduced

### Architecture
- [ ] Follows existing patterns
- [ ] No unnecessary complexity (KISS)
- [ ] No premature optimization (YAGNI)
- [ ] Dependencies are appropriate

## Review Process

### 1. Understand Context
- Read the PR description
- Understand the problem being solved
- Check related issues or tickets

### 2. High-Level Review
- Does the approach make sense?
- Is the scope appropriate?
- Are there architectural concerns?

### 3. Detailed Review
- Go through changes file by file
- Check each item on the checklist
- Note issues and suggestions

### 4. Provide Feedback

**Categorize feedback:**
- **Blocker**: Must fix before merge
- **Suggestion**: Would improve but not required
- **Question**: Need clarification
- **Nitpick**: Minor style preference

**Be constructive:**
```
# Good
"Consider using a Map here for O(1) lookups instead of Array.find()"

# Avoid
"This is wrong"
```

## Common Issues to Watch

### TypeScript/JavaScript
- Unhandled promise rejections
- Type assertions (`as`) hiding issues
- Mutation of shared state
- Missing null checks

### React
- Missing dependency arrays in hooks
- Expensive computations in render
- Memory leaks from subscriptions
- Prop drilling (consider context)

### API/Backend
- Missing input validation
- Inconsistent error responses
- Missing rate limiting
- Logging sensitive data

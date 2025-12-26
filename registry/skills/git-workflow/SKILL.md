---
name: git-workflow
description: Professional git workflow management including staging, committing, branching, and pushing with security-first approach. Use when managing version control operations.
---

# Git Workflow

Secure and professional version control practices.

## Security-First Approach

**Before any git operations, scan for confidential information:**

- `.env` files and variants (`.env.local`, `.env.production`)
- Files containing API keys, tokens, or credentials
- Database connection strings
- Private keys or certificates
- Any files matching secret patterns

**If confidential information detected:** STOP and inform user what needs removal or `.gitignore` addition.

## Commit Standards

Use conventional commit format:

```
type(scope): description

[optional body]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add user login validation
fix(api): resolve timeout in database queries
docs(readme): update installation instructions
refactor(utils): simplify date formatting logic
```

## Workflow

### Staging
```bash
# Review changes
git status
git diff

# Stage specific files
git add path/to/file.ts

# Stage all changes (careful!)
git add .

# Verify staged changes
git diff --cached
```

### Committing
```bash
# Commit with message
git commit -m "type(scope): description"

# Commit with body
git commit -m "type(scope): description" -m "Detailed explanation"
```

### Branching
```bash
# Create feature branch
git checkout -b feature/feature-name

# Create fix branch
git checkout -b fix/bug-description
```

### Pushing
```bash
# Push to remote
git push origin branch-name

# Push and set upstream
git push -u origin branch-name
```

## Quality Checks

Before committing:
```bash
# Run linter
npm run lint

# Run type check
npm run typecheck

# Run tests
npm test
```

## .gitignore Essentials

Always ignore:
```
node_modules/
.env*
*.log
.DS_Store
dist/
.next/
coverage/
```

## Error Handling

- **Merge conflicts**: Guide user to resolve manually
- **Push rejected**: Explain issue and suggest `git pull --rebase`
- **No changes**: Inform user clearly
- **Detached HEAD**: Guide back to branch

---
description: Explore and understand codebase structure quickly
argument-hint: [query] [depth:1-5]
---

# /scout Command

Fast, token-efficient codebase exploration using parallel search agents.

## Usage

```
/scout "authentication flow"
/scout "API endpoints" 3
/scout "database models" 5
```

## Workflow

### 1. Spawn Parallel Agents
Launch multiple Explore subagents to search different areas:
- Each agent focuses on specific directories
- 3-minute timeout per agent
- Skip agents that don't return in time

### 2. Search Strategy
- Divide codebase intelligently by directory
- Search for relevant patterns and keywords
- Focus on finding files, not full understanding

### 3. Compile Report

Output concise findings:

```markdown
## Scout Report: [query]

### Key Files Found
- `src/auth/login.ts` - Main auth logic
- `src/api/auth/route.ts` - Auth API endpoint
- `src/middleware.ts` - Auth middleware

### Directory Structure
```
src/auth/
├── login.ts
├── logout.ts
└── session.ts
```

### Quick Observations
- Auth uses JWT tokens
- Session stored in cookies
- OAuth configured for Google

### Unresolved Questions
- Where are refresh tokens handled?
- How does role-based access work?
```

## Arguments

- `$ARGUMENTS[0]`: Search query
- `$ARGUMENTS[1]`: Depth (1-5, default 3)
  - 1: Quick surface scan
  - 3: Standard exploration
  - 5: Deep dive

## Best Practices

- Keep reports concise (sacrifice grammar for brevity)
- List file paths for easy navigation
- Note unresolved questions at the end
- Focus on structure, not implementation details

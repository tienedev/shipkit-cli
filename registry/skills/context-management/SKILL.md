---
name: context-management
description: Maintain rich project context across conversations for better codebase understanding. Use for large codebases, complex projects, or when Claude needs persistent knowledge about your project.
---

# Context Management

Maintain project context to help Claude understand your codebase better.

## Auto-Generated Context

On first interaction, gather:
- Project structure overview
- Key configuration files (package.json, tsconfig.json, etc.)
- Active file patterns and conventions
- Recent git history for context

## Memory Anchors

Use memory anchors to persist important decisions:

```
[ANCHOR: architecture-decision]
We chose Server Components by default because...
[/ANCHOR]

[ANCHOR: naming-convention]
Components use PascalCase, utilities use camelCase...
[/ANCHOR]
```

## Context Commands

- `@context` - Show current context summary
- `@refresh` - Refresh project understanding
- `@focus <path>` - Deep dive into specific area

## Project Analysis Template

When analyzing a new project:

```
1. Read root config files
   - package.json (dependencies, scripts)
   - tsconfig.json (TypeScript config)
   - .env.example (environment vars)

2. Map directory structure
   - src/ organization
   - Component patterns
   - API structure

3. Identify framework/stack
   - Frontend: React, Vue, Svelte...
   - Backend: Express, Fastify, Next.js API...
   - Database: PostgreSQL, MongoDB, Supabase...

4. Note naming conventions
   - File naming (kebab-case, camelCase)
   - Component naming
   - Variable/function patterns

5. Check existing documentation
   - README.md
   - docs/ folder
   - Inline comments
```

## Best Practices

1. **Start sessions with context**: Begin with "Let me understand your project"
2. **Use anchors for decisions**: Document architectural choices
3. **Refresh after major changes**: Update context after significant refactoring
4. **Focus for deep work**: Use @focus when working on specific areas

## CLAUDE.md Integration

This skill works best with a well-structured CLAUDE.md file:

```markdown
# Project: [Name]

## Stack
- Framework: Next.js 15
- Database: Supabase
- Styling: Tailwind CSS

## Key Directories
- `src/app/` - App router pages
- `src/components/` - React components
- `src/lib/` - Utilities and helpers

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm test` - Run tests

## Conventions
- Use Server Components by default
- Colocate related files
- Prefer composition over inheritance
```

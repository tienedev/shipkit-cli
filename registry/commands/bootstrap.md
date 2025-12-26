---
description: Bootstrap a new project with full workflow orchestration
argument-hint: [project-requirements]
---

# /bootstrap Command

Full project bootstrap from requirements to implementation.

## Usage

```
/bootstrap SaaS dashboard with auth and billing
/bootstrap E-commerce site with Next.js and Supabase
/bootstrap API backend with FastAPI and PostgreSQL
```

## Workflow

### Phase 1: Requirements
- Ask clarifying questions (one at a time)
- Understand project goals and constraints
- Identify must-have vs nice-to-have features

### Phase 2: Tech Stack
1. If user specifies stack → use it
2. Otherwise → research and recommend
3. Get user approval before proceeding
4. Document in `./docs/tech-stack.md`

### Phase 3: Planning
Create implementation plan in `./plans/`:
- Overview and phases
- Architecture decisions
- File structure
- Implementation steps
- Success criteria

**Wait for user approval before implementing.**

### Phase 4: Implementation
- Follow plan step by step
- Run type checks and builds frequently
- Commit at logical checkpoints

### Phase 5: Testing
- Write tests for critical paths
- Fix any failures
- Ensure build passes

### Phase 6: Documentation
Create/update in `./docs/`:
- `README.md` - Getting started
- `architecture.md` - System design
- `api.md` - API documentation (if applicable)

### Phase 7: Onboarding
- Guide user through setup
- Configure environment variables
- Verify everything works
- Suggest next steps

## Principles

Follow **YAGNI**, **KISS**, **DRY**:
- Don't over-engineer
- Keep it simple
- No code duplication
- Only build what's needed

## Output

At each phase, provide:
- Summary of what was done
- Any decisions made
- Questions or blockers
- Next steps

## Arguments

- `$ARGUMENTS` contains project requirements

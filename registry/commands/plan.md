---
description: Create detailed implementation plans for features and changes
argument-hint: [feature-description]
---

# /plan Command

Research, analyze, and create comprehensive implementation plans.

## Usage

```
/plan Add user authentication with OAuth
/plan Refactor database layer to use Prisma
/plan Implement real-time notifications
```

## Workflow

### 1. Understand the Request
- Clarify requirements if needed
- Identify scope and constraints
- Note any specific preferences

### 2. Research
- Analyze existing codebase patterns
- Research best practices
- Identify integration points

### 3. Design Solution
- Consider multiple approaches
- Evaluate trade-offs
- Select optimal solution
- Plan architecture changes

### 4. Create Plan

Save to `./plans/YYYYMMDD-feature-name.md`:

```markdown
# [Feature] Implementation Plan

## Overview
Brief description of what we're building and why.

## Requirements
- Functional: What it should do
- Non-functional: Performance, security, etc.

## Architecture
- Component design
- Data flow diagram
- API contracts

## Implementation Steps
1. [ ] Step 1 with specific details
2. [ ] Step 2...
3. [ ] Step 3...

## Files to Modify/Create
- `path/to/file.ts` - What changes
- `path/to/new.ts` - New file purpose

## Testing Strategy
- Unit tests for X
- Integration tests for Y
- Manual verification for Z

## Risks & Mitigations
- Risk 1 → How to mitigate
- Risk 2 → How to mitigate

## Timeline Estimate
- Phase 1: [description]
- Phase 2: [description]
```

### 5. Review
- Ensure plan is complete
- Verify all files listed
- Confirm steps are actionable

## Output

Respond with:
1. Plan file path
2. Brief summary
3. Key decisions made
4. Any questions for clarification

## Arguments

- `$ARGUMENTS` contains the feature description

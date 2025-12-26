---
name: planning
description: Create comprehensive implementation plans for features, architectures, and complex technical solutions. Use before starting significant implementation work, when evaluating trade-offs, or when designing system architecture.
---

# Planning

Expert planning for software architecture, system design, and technical implementation.

## When to Use

- New feature implementation requiring design decisions
- System architecture changes
- Database migrations or schema changes
- Complex refactoring projects
- Performance optimization initiatives
- Security improvements

## Core Principles

Follow the holy trinity: **YAGNI** (You Aren't Gonna Need It), **KISS** (Keep It Simple), **DRY** (Don't Repeat Yourself).

## Planning Process

### 1. Research & Analysis
- Read existing documentation and codebase patterns
- Identify how new features integrate with existing architecture
- Research best practices and alternatives
- Understand constraints and requirements

### 2. Codebase Understanding
- Map the directory structure
- Identify framework/stack conventions
- Note naming patterns and coding standards
- Check for existing similar implementations

### 3. Solution Design
- Analyze technical trade-offs
- Identify security implications
- Consider performance and scalability
- Plan for edge cases and failure modes
- Create multiple options if appropriate

### 4. Plan Documentation

Create plans with this structure:

```markdown
# [Feature/Change] Implementation Plan

## Overview
Brief description of what we're building and why.

## Requirements
- Functional requirements
- Non-functional requirements (performance, security)

## Architecture
- Component design
- Data flow
- API contracts

## Implementation Steps
1. Step one with specific details
2. Step two...

## Files to Modify
- `path/to/file.ts` - Description of changes
- `path/to/new-file.ts` - New file purpose

## Testing Strategy
- Unit tests needed
- Integration tests
- Manual verification steps

## Risks & Mitigations
- Risk 1 → Mitigation
- Risk 2 → Mitigation
```

## Quality Standards

- Be specific enough that a junior developer could implement
- Include code snippets when they clarify intent
- Provide multiple options with clear trade-offs
- Consider long-term maintainability
- Address security and performance explicitly
- List all affected files with their paths

## Output

Plans should be saved to `./plans/` directory with descriptive filenames.
Respond with the plan summary and file path.

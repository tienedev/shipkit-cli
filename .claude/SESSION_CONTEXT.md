# ShipKit CLI - Session Context

> **Date**: 2025-12-26
> **Purpose**: Context persistence for session continuity

## Project Summary

**ShipKit** has pivoted from a SaaS boilerplate to a **modular Claude Code configuration CLI tool**.

### Core Concept
```
npx @shipkit/cli init → Interactive module selection → .claude/ configured
```

### Key Decision: GitHub-based Registry (like shadcn/ui)
- Files copied locally, no runtime dependency
- User owns and modifies everything
- Community can contribute via PRs

## Current State

### Repository
- **Location**: `/Users/tiene/Projets/shipkit-cli`
- **Package**: `@shipkit/cli`
- **Status**: CLI scaffold complete, ready for content

### Working Commands
| Command | Status |
|---------|--------|
| `shipkit init` | ✅ Working |
| `shipkit init --minimal` | ✅ Working |
| `shipkit add <module>` | ✅ Working |
| `shipkit list` | ✅ Working |

### Created Modules
```
registry/
├── core/
│   ├── context-management/
│   ├── quality-enforcement/
│   └── rescue-debug/
├── agents/
│   ├── debugger/
│   └── code-reviewer/
└── commands/
    ├── fix/
    └── review/
```

### Documentation
- `docs/PRD.md` - Simple product spec
- `docs/ROADMAP.md` - 5-phase progress tracker

## Key Decisions Made

1. **Open source first** - No paid product until community established
2. **Modular over monolithic** - Unlike SuperClaude, install only what you need
3. **Framework-agnostic core** - Stack accelerators as optional add-ons
4. **GitHub registry** - Simple, no infrastructure to maintain
5. **shipkit.xyz domain** - Rebranded from SaaS boilerplate context

## Source Material

### Content to Port
**From**: `/Users/tiene/Projets/gn-claudekitcc/claudekit-engineer-main/.claude/`

Priority modules to port:
- `skills/sequential-thinking/` - Structured problem-solving
- `workflows/bootstrap.md` - Full project initialization
- `agents/planner.md` - Strategic planning
- `agents/researcher.md` - Research and exploration
- `agents/git-manager.md` - Git workflow
- `commands/scout.md` - Codebase exploration
- `commands/plan.md` - Implementation planning

## Next Actions

1. **Commit current state** to git
2. **Push to GitHub** as tienedev/shipkit-cli
3. **Port content** from gn-claudekitcc (Phase 2)
4. **Publish to npm** as @shipkit/cli

## Technical Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5
- **Build**: tsup
- **Linting**: Biome
- **CLI Framework**: Commander.js
- **Prompts**: prompts
- **Styling**: picocolors, ora

---

*Load this file at session start for context continuity*

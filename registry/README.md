# ShipKit Registry

Curated skills and commands for Claude Code.

## Installation

### Via Plugin Marketplace (Recommended)

```bash
# In Claude Code
/plugin marketplace add tienedev/shipkit-cli

# Then install skills
/plugin install shipkit
```

### Via CLI

```bash
npx @shipkit/cli init
```

## Available Skills

### Core Skills
| Skill | Description |
|-------|-------------|
| `context-management` | Maintain project context across conversations |
| `quality-enforcement` | Automated code quality checks |
| `rescue-debug` | Emergency debugging for broken code |
| `workflow-orchestration` | Sequential thinking for complex tasks |

### Development Skills
| Skill | Description |
|-------|-------------|
| `debugging` | Systematic debugging methodology |
| `planning` | Implementation planning and architecture |
| `research` | Technical research and documentation |
| `code-review` | Thorough code review process |
| `git-workflow` | Professional git operations |

### Stack Skills
| Skill | Description |
|-------|-------------|
| `nextjs` | Next.js 15+ patterns and best practices |
| `supabase` | Supabase database, auth, and real-time |
| `tailwind` | Tailwind CSS utilities and patterns |
| `python` | Python/FastAPI development |

## Available Commands

| Command | Description |
|---------|-------------|
| `/fix` | Quick fixes for lint, types, tests, build |
| `/review` | Code review with quality checklist |
| `/plan` | Create implementation plans |
| `/scout` | Fast codebase exploration |
| `/bootstrap` | Full project bootstrap workflow |

## Structure

```
registry/
├── .claude-plugin/
│   └── plugin.json      # Plugin metadata
├── skills/              # Skill definitions
│   ├── context-management/
│   │   └── SKILL.md
│   ├── debugging/
│   │   └── SKILL.md
│   └── ...
├── commands/            # Slash commands
│   ├── fix.md
│   ├── review.md
│   └── ...
└── README.md
```

## Creating Custom Skills

Each skill is a folder with a `SKILL.md` file:

```yaml
---
name: my-skill
description: What this skill does. Use when [trigger conditions].
---

# My Skill

Instructions for Claude...
```

## License

MIT

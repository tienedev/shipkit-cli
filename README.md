# ShipKit

**Configure Claude Code for any project** - Modular skills and commands.

[![npm version](https://img.shields.io/npm/v/@shipkit/cli.svg)](https://www.npmjs.com/package/@shipkit/cli)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Why ShipKit?

Claude Code is powerful, but configuring it optimally for each project is time-consuming. ShipKit provides:

- **Modular Configuration** - Install only what you need, not a bloated monolith
- **Anthropic Standard** - Compatible with Agent Skills ecosystem
- **Curated Quality** - Battle-tested skills and commands
- **Stack Accelerators** - Framework-specific patterns for Next.js, Python, Supabase, etc.

## Installation

### Via Plugin Marketplace (Recommended)

```bash
# In Claude Code
/plugin marketplace add tienedev/shipkit-cli
/plugin install shipkit
```

### Via CLI

```bash
# Initialize ShipKit in your project
npx @shipkit/cli init

# Or with specific options
npx @shipkit/cli init --minimal  # Only recommended modules
npx @shipkit/cli init --yes      # Skip prompts
```

## CLI Commands

### `shipkit init`

Initialize ShipKit with interactive module selection.

```bash
shipkit init [options]

Options:
  -y, --yes      Skip confirmation prompts
  -m, --minimal  Install only recommended modules
```

### `shipkit add <module>`

Add a module to your existing configuration.

```bash
shipkit add nextjs
shipkit add debugging --force  # Reinstall if exists
```

### `shipkit list`

List available or installed modules.

```bash
shipkit list              # Show all available modules
shipkit list --installed  # Show only installed modules
shipkit list -c skills    # Filter by category
```

## Available Modules

### Skills

| Module | Description |
|--------|-------------|
| `context-management` | Maintain project context across conversations |
| `quality-enforcement` | Automated code quality checks |
| `rescue-debug` | Emergency debugging for broken code |
| `workflow-orchestration` | Sequential thinking for complex tasks |
| `debugging` | Systematic debugging methodology |
| `code-review` | Thorough code review process |
| `planning` | Implementation planning and architecture |
| `research` | Technical research and documentation |
| `git-workflow` | Professional git operations |
| `nextjs` | Next.js 15+ patterns and best practices |
| `supabase` | Supabase auth, database, and RLS |
| `tailwind` | Tailwind CSS patterns |
| `python` | Python/FastAPI development |

### Commands

| Command | Description |
|---------|-------------|
| `/fix` | Quick fixes for lint, types, tests, build |
| `/review` | Code review with quality checklist |
| `/plan` | Create implementation plans |
| `/scout` | Fast codebase exploration |
| `/bootstrap` | Full project bootstrap workflow |

## How It Works

ShipKit follows the Anthropic Agent Skills standard:

1. **Plugin compatible** - Works with Claude Code plugin marketplace
2. **No runtime dependency** - Files are copied into your project
3. **Full ownership** - Modify configurations as needed
4. **Offline after init** - No network calls during development

## Project Structure

After running `shipkit init`:

```
your-project/
├── .claude/
│   ├── shipkit.json       # Your configuration
│   ├── skills/            # Installed skills
│   │   ├── debugging/
│   │   │   └── SKILL.md
│   │   └── nextjs/
│   │       └── SKILL.md
│   └── commands/          # Installed commands
│       ├── fix.md
│       └── review.md
└── CLAUDE.md              # Generated project context
```

## Contributing

We welcome contributions!

### Adding a Module

1. Fork the repository
2. Add your skill to `registry/skills/<name>/SKILL.md` or command to `registry/commands/<name>.md`
3. Follow the YAML frontmatter format:

```yaml
---
name: my-skill
description: What this skill does. Use when [trigger conditions].
---

# My Skill

Instructions for Claude...
```

4. Update `registry/registry.json`
5. Submit a PR

## License

MIT License - Use ShipKit for personal and commercial projects freely.

---

**Website**: [shipkit.xyz](https://shipkit.xyz) | **GitHub**: [tienedev/shipkit-cli](https://github.com/tienedev/shipkit-cli)

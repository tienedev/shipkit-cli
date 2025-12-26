# ShipKit - Product Requirements Document

> Simple PRD - KISS mode

## What

**ShipKit** is a CLI tool and plugin marketplace that configures Claude Code for any project with modular skills and commands.

```bash
# Via CLI
npx @shipkit/cli init

# Via Plugin Marketplace
/plugin marketplace add tienedev/shipkit-cli
```

## Why

1. **Claude Code is powerful but unconfigured** - Most developers don't optimize it
2. **Existing solutions load everything** - SuperClaude = bloated context
3. **No modular approach exists** - Install only what you need
4. **Standard format** - Compatible with Anthropic's Agent Skills ecosystem

## How

### Core Concept

```
Registry (GitHub) → CLI or Plugin → .claude/ (local)
```

- **Plugin marketplace compatible** (Anthropic standard)
- **GitHub-based registry** (like shadcn/ui)
- Files copied into project (no runtime dependency)
- User owns and can modify everything

### Module Categories

| Category | Purpose |
|----------|---------|
| **Skills** | Capabilities and patterns (debugging, planning, nextjs, etc.) |
| **Commands** | Slash commands (/fix, /review, /plan, /scout, /bootstrap) |

### CLI Commands

```bash
shipkit init              # Interactive setup
shipkit init --minimal    # Recommended only
shipkit add <module>      # Add module
shipkit list              # Show modules
```

### Plugin Installation

```bash
# In Claude Code
/plugin marketplace add tienedev/shipkit-cli
/plugin install shipkit
```

## Who

**Target**: Developers who use Claude Code and want maximum productivity.

**Not for**: Complete beginners, non-Claude Code users.

## Differentiators

| Others | ShipKit |
|--------|---------|
| Load everything | Install only what you need |
| Monolithic | Modular + composable |
| Custom format | Anthropic standard format |
| Hard to contribute | Easy community packs |
| Runtime dependency | Files copied locally |

## Business Model

**Open source** (MIT) - Build community first.

Future options:
- Sponsorships
- Enterprise support
- Premium packs (if demand)

## Success Metrics

1. GitHub stars (visibility)
2. npm downloads (usage)
3. Plugin installs (ecosystem)
4. Community contributions (ecosystem)

## Non-Goals

- Not a SaaS product
- Not framework-specific (core is agnostic)
- Not trying to replace Claude Code docs

---

*Document version: 2.0 - 2025-12-26*

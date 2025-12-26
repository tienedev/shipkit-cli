# ShipKit Roadmap

> Last updated: 2025-12-26

## Phase 1: Foundation ✅

- [x] Project scaffold (TypeScript, tsup, Biome)
- [x] CLI entry point with Commander.js
- [x] `shipkit init` command (interactive + minimal mode)
- [x] `shipkit add` command
- [x] `shipkit list` command
- [x] Local fallback registry

## Phase 2: Plugin Marketplace ✅

- [x] Restructure to Anthropic Agent Skills standard format
- [x] Create `.claude-plugin/plugin.json` for marketplace compatibility
- [x] Simplify categories: `skills/` + `commands/`
- [x] Port content from gn-claudekitcc:
  - [x] workflow-orchestration (sequential-thinking)
  - [x] planning skill
  - [x] research skill
  - [x] debugging skill
  - [x] code-review skill
  - [x] git-workflow skill
  - [x] scout command
  - [x] plan command
  - [x] bootstrap command
- [x] Create stack skills:
  - [x] nextjs
  - [x] supabase
  - [x] python
  - [x] tailwind
- [x] Update CLI for new format

## Phase 3: Distribution 🔄

- [ ] Push to GitHub (tienedev/shipkit-cli)
- [ ] Test plugin installation: `/plugin marketplace add tienedev/shipkit-cli`
- [ ] Set up GitHub Actions for CI
- [ ] Publish to npm as @shipkit/cli
- [ ] Test `npx @shipkit/cli init` flow

## Phase 4: Website 🌐

- [ ] Landing page at shipkit.xyz
- [ ] Module documentation
- [ ] Getting started guide
- [ ] Contributing guide

## Phase 5: Community 👥

- [ ] Add CONTRIBUTING.md
- [ ] Module submission guidelines
- [ ] Community Discord/GitHub Discussions
- [ ] First external contributions

## Future Ideas 💡

- [ ] `shipkit update` - Update installed modules
- [ ] `shipkit remove` - Remove modules
- [ ] `shipkit doctor` - Diagnose config issues
- [ ] Module versioning
- [ ] Module dependencies resolution
- [ ] Custom registry support (for teams)
- [ ] VS Code extension integration

---

## Changelog

### 2025-12-26 (v0.1.0)

**Phase 2 Complete - Plugin Marketplace Format**

- Restructured to Anthropic Agent Skills standard
- Created 13 skills and 5 commands
- Added `.claude-plugin/plugin.json` for marketplace
- Updated CLI for `skills/` + `commands/` categories
- Ported best content from gn-claudekitcc
- Created stack skills (nextjs, supabase, tailwind, python)

**Skills Created:**
- context-management, quality-enforcement, rescue-debug
- workflow-orchestration, debugging, code-review
- planning, research, git-workflow
- nextjs, supabase, tailwind, python

**Commands Created:**
- /fix, /review, /plan, /scout, /bootstrap

### 2025-12-26 (Initial)
- Initial CLI scaffold created
- Basic commands working (init, add, list)
- Sample modules created
- Local fallback registry implemented

// ===========================================
// Init Command - Configure Claude Code for a project
// ===========================================

import ora from "ora";
import pc from "picocolors";
import type { ShipKitConfig } from "../types/index.js";
import {
  createClaudeDir,
  fetchModuleFiles,
  fetchRegistry,
  filterModulesByCategory,
  getCLIContext,
  logger,
  onCancel,
  printBanner,
  printNextSteps,
  printSection,
  printSuccess,
  promptConfirm,
  promptModules,
  promptOverwrite,
  writeClaudeFile,
  writeConfig,
} from "../utils/index.js";

export interface InitCommandOptions {
  yes?: boolean;
  minimal?: boolean;
}

export async function initCommand(options: InitCommandOptions = {}): Promise<void> {
  printBanner();

  const ctx = getCLIContext();

  // Check for existing configuration
  if (ctx.hasExistingConfig && !options.yes) {
    const overwrite = await promptOverwrite();
    if (!overwrite) {
      logger.info("Init cancelled. Existing configuration preserved.");
      return;
    }
  }

  // Fetch registry
  const spinner = ora("Fetching module registry...").start();

  let registry;
  try {
    registry = await fetchRegistry();
    spinner.succeed(`Found ${registry.modules.length} available modules`);
  } catch {
    spinner.fail("Failed to fetch registry");
    logger.newline();
    logger.info("Using local fallback registry...");
    registry = getLocalFallbackRegistry();
  }

  logger.newline();

  // Get modules by category
  const skillModules = filterModulesByCategory(registry, "skills");
  const commandModules = filterModulesByCategory(registry, "commands");

  let selectedSkills: string[] = [];
  let selectedCommands: string[] = [];

  if (options.minimal) {
    // Minimal mode: only recommended modules
    selectedSkills = skillModules.filter((m) => m.recommended).map((m) => m.name);
    selectedCommands = commandModules.filter((m) => m.recommended).map((m) => m.name);
    logger.info("Using minimal configuration (recommended modules only)");
  } else {
    // Interactive mode
    printSection("Skills", "Capabilities and patterns for Claude Code");
    selectedSkills = await promptModules(skillModules, "Select skills to install");

    printSection("Commands", "Slash commands for common workflows");
    selectedCommands = await promptModules(commandModules, "Select commands to install");
  }

  // Confirm selection
  logger.newline();
  const totalSelected = selectedSkills.length + selectedCommands.length;

  if (totalSelected === 0) {
    logger.warn("No modules selected. Creating empty .claude structure.");
  } else {
    logger.info(`Selected ${pc.bold(String(totalSelected))} modules:`);
    if (selectedSkills.length) logger.dim(`    Skills: ${selectedSkills.join(", ")}`);
    if (selectedCommands.length) logger.dim(`    Commands: ${selectedCommands.join(", ")}`);
  }

  logger.newline();

  if (!options.yes) {
    const proceed = await promptConfirm("Proceed with installation?");
    if (!proceed) {
      onCancel();
      return;
    }
  }

  // Create .claude directory
  createClaudeDir(ctx.cwd);

  // Install selected modules
  const installSpinner = ora("Installing modules...").start();
  const allSelected = [...selectedSkills, ...selectedCommands];

  let installed = 0;
  for (const moduleName of allSelected) {
    const module = registry.modules.find((m) => m.name === moduleName);
    if (!module) continue;

    try {
      installSpinner.text = `Installing ${moduleName}...`;

      if (module.category === "skills") {
        // Skills: fetch directory with SKILL.md
        const files = await fetchModuleFiles(module.path);
        for (const [filename, content] of files) {
          const targetPath = `skills/${module.name}/${filename}`;
          writeClaudeFile(targetPath, content, ctx.cwd);
        }
      } else {
        // Commands: single .md file
        const files = await fetchModuleFiles(module.path);
        for (const [filename, content] of files) {
          // Commands go directly in commands/ as name.md
          const targetPath = `commands/${module.name}.md`;
          writeClaudeFile(targetPath, content, ctx.cwd);
        }
      }

      installed++;
    } catch (error) {
      logger.debug(`Failed to install ${moduleName}: ${error}`);
    }
  }

  installSpinner.succeed(`Installed ${installed} modules`);

  // Write config
  const config: ShipKitConfig = {
    version: registry.version,
    modules: allSelected,
    installedAt: new Date().toISOString(),
  };
  writeConfig(config, ctx.cwd);

  // Generate CLAUDE.md
  generateClaudeMd(ctx.cwd, allSelected, registry);

  // Success message
  printSuccess(installed);
  printNextSteps();
}

/**
 * Generate CLAUDE.md with project context
 */
function generateClaudeMd(
  cwd: string,
  modules: string[],
  registry: { version: string; modules: { name: string; description: string }[] }
): void {
  const moduleDescriptions = modules
    .map((name) => {
      const mod = registry.modules.find((m) => m.name === name);
      return mod ? `- **${name}**: ${mod.description}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const content = `# Project Configuration

> Generated by [ShipKit](https://shipkit.xyz) v${registry.version}

## Installed Modules

${moduleDescriptions || "No modules installed"}

## Usage

Claude Code will automatically load skills from \`.claude/skills/\` and commands from \`.claude/commands/\`.

### Available Commands

Check \`.claude/commands/\` for available slash commands like:
- \`/fix\` - Quick fixes for lint, types, tests, build
- \`/review\` - Code review with quality checklist
- \`/plan\` - Create implementation plans

### Available Skills

Check \`.claude/skills/\` for capabilities like:
- Debugging methodology
- Code review patterns
- Framework-specific knowledge

---

*Regenerate this file with \`shipkit init\`*
`;

  writeClaudeFile("../CLAUDE.md", content, cwd);
  logger.success("Generated CLAUDE.md");
}

/**
 * Local fallback registry for offline mode
 */
function getLocalFallbackRegistry() {
  return {
    version: "0.1.0",
    modules: [
      {
        name: "context-management",
        description: "Maintain project context across conversations",
        category: "skills" as const,
        path: "skills/context-management",
        recommended: true,
        tags: ["essential"],
      },
      {
        name: "quality-enforcement",
        description: "Automated code quality checks and best practices",
        category: "skills" as const,
        path: "skills/quality-enforcement",
        recommended: true,
        tags: ["essential"],
      },
      {
        name: "rescue-debug",
        description: "Emergency debugging for broken code",
        category: "skills" as const,
        path: "skills/rescue-debug",
        recommended: true,
        tags: ["essential"],
      },
      {
        name: "debugging",
        description: "Systematic debugging methodology",
        category: "skills" as const,
        path: "skills/debugging",
        recommended: true,
        tags: ["essential"],
      },
      {
        name: "code-review",
        description: "Thorough code review process",
        category: "skills" as const,
        path: "skills/code-review",
        recommended: true,
        tags: ["quality"],
      },
      {
        name: "planning",
        description: "Implementation planning and architecture",
        category: "skills" as const,
        path: "skills/planning",
        recommended: false,
        tags: ["planning"],
      },
      {
        name: "nextjs",
        description: "Next.js 15+ patterns and best practices",
        category: "skills" as const,
        path: "skills/nextjs",
        recommended: false,
        tags: ["frontend"],
      },
      {
        name: "supabase",
        description: "Supabase database, auth, and real-time",
        category: "skills" as const,
        path: "skills/supabase",
        recommended: false,
        tags: ["backend"],
      },
      {
        name: "fix",
        description: "Quick fixes for common issues",
        category: "commands" as const,
        path: "commands/fix.md",
        recommended: true,
        tags: ["essential"],
      },
      {
        name: "review",
        description: "Code review command",
        category: "commands" as const,
        path: "commands/review.md",
        recommended: true,
        tags: ["quality"],
      },
      {
        name: "plan",
        description: "Create implementation plans",
        category: "commands" as const,
        path: "commands/plan.md",
        recommended: false,
        tags: ["planning"],
      },
    ],
  };
}

// ===========================================
// List Command - List available/installed modules
// ===========================================

import ora from "ora";
import pc from "picocolors";
import {
  fetchRegistry,
  filterModulesByCategory,
  getCLIContext,
  logger,
  printBanner,
  readConfig,
} from "../utils/index.js";

export interface ListCommandOptions {
  installed?: boolean;
  category?: string;
}

export async function listCommand(options: ListCommandOptions = {}): Promise<void> {
  const ctx = getCLIContext();

  if (options.installed) {
    // List installed modules
    const config = readConfig(ctx.cwd);

    if (!config) {
      logger.warn("ShipKit is not initialized in this directory.");
      logger.info("Run " + logger.highlight("shipkit init") + " first.");
      return;
    }

    printBanner();
    logger.title("Installed Modules");
    logger.newline();

    if (config.modules.length === 0) {
      logger.dim("No modules installed.");
    } else {
      for (const mod of config.modules) {
        logger.info(`  ${pc.green("●")} ${mod}`);
      }
      logger.newline();
      logger.dim(`Total: ${config.modules.length} modules`);
      logger.dim(`Installed: ${config.installedAt}`);
    }

    return;
  }

  // List available modules from registry
  const spinner = ora("Fetching registry...").start();

  let registry;
  try {
    registry = await fetchRegistry();
    spinner.succeed(`Found ${registry.modules.length} modules`);
  } catch {
    spinner.warn("Using local fallback registry (GitHub not available)");
    registry = getLocalFallbackRegistry();
  }

  printBanner();

  // Get installed modules for comparison
  const config = readConfig(ctx.cwd);
  const installedModules = new Set(config?.modules ?? []);

  // Filter by category if specified
  const categories = options.category
    ? [options.category]
    : ["skills", "commands"];

  for (const category of categories) {
    const modules = filterModulesByCategory(registry, category);
    if (modules.length === 0) continue;

    logger.newline();
    logger.title(category.charAt(0).toUpperCase() + category.slice(1));

    for (const mod of modules) {
      const installed = installedModules.has(mod.name);
      const status = installed ? pc.green("●") : pc.dim("○");
      const recommended = mod.recommended ? pc.yellow(" ★") : "";
      const name = installed ? pc.bold(mod.name) : mod.name;

      console.log(`  ${status} ${name}${recommended}`);
      console.log(`    ${pc.dim(mod.description)}`);
    }
  }

  logger.newline();
  logger.dim(`${pc.green("●")} installed  ${pc.dim("○")} available  ${pc.yellow("★")} recommended`);
  logger.newline();
  logger.info(`Total: ${registry.modules.length} modules available`);
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

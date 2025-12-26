// ===========================================
// Add Command - Add modules to existing config
// ===========================================

import ora from "ora";
import type { ShipKitConfig } from "../types/index.js";
import {
  fetchModuleFiles,
  fetchRegistry,
  getCLIContext,
  isModuleInstalled,
  logger,
  readConfig,
  writeClaudeFile,
  writeConfig,
} from "../utils/index.js";

export interface AddCommandOptions {
  force?: boolean;
}

export async function addCommand(
  moduleName: string,
  options: AddCommandOptions = {}
): Promise<void> {
  const ctx = getCLIContext();

  // Check if ShipKit is initialized
  if (!ctx.hasExistingConfig) {
    logger.error("ShipKit is not initialized in this directory.");
    logger.info("Run " + logger.highlight("shipkit init") + " first.");
    process.exit(1);
  }

  // Check if already installed
  if (!options.force && isModuleInstalled(moduleName)) {
    logger.warn(`Module "${moduleName}" is already installed.`);
    logger.info("Use --force to reinstall.");
    return;
  }

  // Fetch registry
  const spinner = ora("Fetching registry...").start();

  let registry;
  try {
    registry = await fetchRegistry();
    spinner.stop();
  } catch {
    spinner.fail("Failed to fetch registry");
    process.exit(1);
  }

  // Find module
  const module = registry.modules.find((m) => m.name === moduleName);
  if (!module) {
    logger.error(`Module "${moduleName}" not found in registry.`);
    logger.newline();
    logger.info("Available modules:");
    for (const m of registry.modules) {
      logger.dim(`  - ${m.name}: ${m.description}`);
    }
    process.exit(1);
  }

  // Install module
  const installSpinner = ora(`Installing ${moduleName}...`).start();

  try {
    const files = await fetchModuleFiles(module.path);

    for (const [filename, content] of files) {
      const targetPath = `${module.category}/${module.name}/${filename}`;
      writeClaudeFile(targetPath, content, ctx.cwd);
    }

    installSpinner.succeed(`Installed ${moduleName}`);

    // Update config
    const config = readConfig(ctx.cwd) as ShipKitConfig;
    if (!config.modules.includes(moduleName)) {
      config.modules.push(moduleName);
      writeConfig(config, ctx.cwd);
    }

    logger.newline();
    logger.success(`Module "${moduleName}" added successfully!`);
    logger.dim(`Category: ${module.category}`);
    logger.dim(`Path: .claude/${module.category}/${module.name}/`);
  } catch (error) {
    installSpinner.fail(`Failed to install ${moduleName}`);
    logger.error(String(error));
    process.exit(1);
  }
}

// ===========================================
// ShipKit CLI - Entry Point
// ===========================================

import { Command } from "commander";
import { addCommand, initCommand, listCommand } from "./commands/index.js";

const program = new Command();

program
  .name("shipkit")
  .description("Configure Claude Code for any project - Modular skills, commands, and workflows")
  .version("0.1.0");

// Init command
program
  .command("init")
  .description("Initialize ShipKit in the current directory")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-m, --minimal", "Install only recommended modules")
  .action(async (options) => {
    await initCommand(options);
  });

// Add command
program
  .command("add <module>")
  .description("Add a module to your configuration")
  .option("-f, --force", "Force reinstall if already installed")
  .action(async (moduleName, options) => {
    await addCommand(moduleName, options);
  });

// List command
program
  .command("list")
  .alias("ls")
  .description("List available or installed modules")
  .option("-i, --installed", "Show only installed modules")
  .option("-c, --category <category>", "Filter by category (core, stacks, agents, commands)")
  .action(async (options) => {
    await listCommand(options);
  });

// Parse arguments
program.parse();

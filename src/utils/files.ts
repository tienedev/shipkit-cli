// ===========================================
// File System Utilities
// ===========================================

import * as fs from "node:fs";
import * as path from "node:path";
import type { CLIContext, ShipKitConfig } from "../types/index.js";
import { logger } from "./logger.js";

/**
 * Get the CLI context for the current working directory
 */
export function getCLIContext(cwd: string = process.cwd()): CLIContext {
  const claudeDir = path.join(cwd, ".claude");
  const configPath = path.join(claudeDir, "shipkit.json");
  const hasExistingConfig = fs.existsSync(configPath);

  return {
    cwd,
    configPath,
    claudeDir,
    hasExistingConfig,
  };
}

/**
 * Check if .claude directory exists
 */
export function hasClaudeDir(cwd: string = process.cwd()): boolean {
  return fs.existsSync(path.join(cwd, ".claude"));
}

/**
 * Create .claude directory structure
 */
export function createClaudeDir(cwd: string = process.cwd()): void {
  const claudeDir = path.join(cwd, ".claude");
  const dirs = ["skills", "commands"];

  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
    logger.success("Created .claude directory");
  }

  for (const dir of dirs) {
    const dirPath = path.join(claudeDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

/**
 * Write a file to the .claude directory
 */
export function writeClaudeFile(
  relativePath: string,
  content: string,
  cwd: string = process.cwd()
): void {
  const fullPath = path.join(cwd, ".claude", relativePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, content, "utf-8");
  logger.debug(`Wrote ${relativePath}`);
}

/**
 * Read ShipKit config from .claude/shipkit.json
 */
export function readConfig(cwd: string = process.cwd()): ShipKitConfig | null {
  const configPath = path.join(cwd, ".claude", "shipkit.json");

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(content) as ShipKitConfig;
  } catch {
    logger.warn("Failed to parse shipkit.json");
    return null;
  }
}

/**
 * Write ShipKit config to .claude/shipkit.json
 */
export function writeConfig(config: ShipKitConfig, cwd: string = process.cwd()): void {
  const configPath = path.join(cwd, ".claude", "shipkit.json");
  const dir = path.dirname(configPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

/**
 * Check if a module is already installed
 */
export function isModuleInstalled(
  moduleName: string,
  cwd: string = process.cwd()
): boolean {
  const config = readConfig(cwd);
  return config?.modules.includes(moduleName) ?? false;
}

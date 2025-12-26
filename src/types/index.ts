// ===========================================
// ShipKit CLI Types
// ===========================================

/**
 * Module categories available in the registry
 */
export type ModuleCategory = "skills" | "commands";

/**
 * A module in the ShipKit registry
 */
export interface RegistryModule {
  name: string;
  description: string;
  category: ModuleCategory;
  path: string;
  dependencies?: string[];
  tags?: string[];
  recommended?: boolean;
}

/**
 * The complete registry index
 */
export interface Registry {
  version: string;
  modules: RegistryModule[];
}

/**
 * Project configuration stored in .claude/shipkit.json
 */
export interface ShipKitConfig {
  version: string;
  modules: string[];
  installedAt: string;
}

/**
 * User selections during init
 */
export interface InitOptions {
  skills: string[];
  commands: string[];
}

/**
 * CLI context passed between commands
 */
export interface CLIContext {
  cwd: string;
  configPath: string;
  claudeDir: string;
  hasExistingConfig: boolean;
}

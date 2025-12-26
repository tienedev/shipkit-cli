// ===========================================
// Interactive Prompts
// ===========================================

import prompts from "prompts";
import pc from "picocolors";
import type { RegistryModule } from "../types/index.js";

/**
 * Format module for display in prompts
 */
function formatModuleChoice(module: RegistryModule): prompts.Choice {
  const recommended = module.recommended ? pc.green(" (recommended)") : "";
  return {
    title: `${module.name}${recommended}`,
    description: module.description,
    value: module.name,
    selected: module.recommended,
  };
}

/**
 * Prompt user to select modules
 */
export async function promptModules(
  modules: RegistryModule[],
  message: string
): Promise<string[]> {
  const { selected } = await prompts({
    type: "multiselect",
    name: "selected",
    message,
    choices: modules.map(formatModuleChoice),
    hint: "- Space to select. Enter to confirm",
    instructions: false,
  });

  return selected ?? [];
}

/**
 * Prompt for confirmation
 */
export async function promptConfirm(message: string): Promise<boolean> {
  const { confirmed } = await prompts({
    type: "confirm",
    name: "confirmed",
    message,
    initial: true,
  });

  return confirmed ?? false;
}

/**
 * Prompt to overwrite existing config
 */
export async function promptOverwrite(): Promise<boolean> {
  return promptConfirm(
    "A ShipKit configuration already exists. Do you want to overwrite it?"
  );
}

/**
 * Cancel handler for prompts
 */
export function onCancel(): void {
  console.log(pc.yellow("\nOperation cancelled"));
  process.exit(0);
}

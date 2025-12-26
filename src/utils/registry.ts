// ===========================================
// Registry Utilities - Fetch modules from GitHub or local
// ===========================================

import fs from "node:fs";
import path from "node:path";
import type { Registry, RegistryModule } from "../types/index.js";
import { logger } from "./logger.js";

const REGISTRY_BASE_URL =
  "https://raw.githubusercontent.com/tienedev/shipkit-cli/main/registry";
const REGISTRY_INDEX_URL = `${REGISTRY_BASE_URL}/registry.json`;

/**
 * Get local registry path from environment variable
 */
function getLocalRegistryPath(): string | null {
  return process.env.SHIPKIT_LOCAL_REGISTRY || null;
}

/**
 * Fetch the registry index from GitHub or local
 */
export async function fetchRegistry(): Promise<Registry> {
  const localPath = getLocalRegistryPath();

  if (localPath) {
    // Local mode
    const registryPath = path.join(localPath, "registry.json");
    try {
      const content = fs.readFileSync(registryPath, "utf-8");
      logger.debug(`Using local registry: ${registryPath}`);
      return JSON.parse(content) as Registry;
    } catch (error) {
      logger.error(`Failed to read local registry: ${error}`);
      throw error;
    }
  }

  // Remote mode
  try {
    const response = await fetch(REGISTRY_INDEX_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return (await response.json()) as Registry;
  } catch (error) {
    logger.error(`Failed to fetch registry: ${error}`);
    throw error;
  }
}

/**
 * Fetch a specific module's content from the registry
 */
export async function fetchModuleContent(module: RegistryModule): Promise<string> {
  const url = `${REGISTRY_BASE_URL}/${module.path}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    logger.error(`Failed to fetch module ${module.name}: ${error}`);
    throw error;
  }
}

/**
 * Fetch multiple files for a module (for directories)
 */
export async function fetchModuleFiles(
  modulePath: string
): Promise<Map<string, string>> {
  const files = new Map<string, string>();
  const localPath = getLocalRegistryPath();

  if (localPath) {
    // Local mode - read from filesystem
    return fetchModuleFilesLocal(localPath, modulePath);
  }

  // Remote mode - fetch from GitHub
  const manifestUrl = `${REGISTRY_BASE_URL}/${modulePath}/manifest.json`;

  try {
    // Fetch manifest to know what files to download
    const manifestResponse = await fetch(manifestUrl);
    if (!manifestResponse.ok) {
      // Single file module, fetch directly
      const content = await fetch(`${REGISTRY_BASE_URL}/${modulePath}`);
      if (content.ok) {
        files.set(modulePath.split("/").pop()!, await content.text());
      }
      return files;
    }

    const manifest = (await manifestResponse.json()) as { files: string[] };

    // Fetch all files in parallel
    const fetchPromises = manifest.files.map(async (file: string) => {
      const url = `${REGISTRY_BASE_URL}/${modulePath}/${file}`;
      const response = await fetch(url);
      if (response.ok) {
        files.set(file, await response.text());
      }
    });

    await Promise.all(fetchPromises);
    return files;
  } catch (error) {
    logger.debug(`Manifest not found for ${modulePath}, treating as single file`);
    return files;
  }
}

/**
 * Fetch module files from local filesystem
 */
function fetchModuleFilesLocal(
  registryPath: string,
  modulePath: string
): Map<string, string> {
  const files = new Map<string, string>();
  const fullPath = path.join(registryPath, modulePath);

  try {
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Directory - read all files
      const entries = fs.readdirSync(fullPath);
      for (const entry of entries) {
        const entryPath = path.join(fullPath, entry);
        const entryStat = fs.statSync(entryPath);
        if (entryStat.isFile()) {
          files.set(entry, fs.readFileSync(entryPath, "utf-8"));
        }
      }
    } else {
      // Single file
      const filename = modulePath.split("/").pop()!;
      files.set(filename, fs.readFileSync(fullPath, "utf-8"));
    }
  } catch (error) {
    logger.debug(`Failed to read local module ${modulePath}: ${error}`);
  }

  return files;
}

/**
 * Get modules filtered by category
 */
export function filterModulesByCategory(
  registry: Registry,
  category: string
): RegistryModule[] {
  return registry.modules.filter((m) => m.category === category);
}

/**
 * Get recommended modules
 */
export function getRecommendedModules(registry: Registry): RegistryModule[] {
  return registry.modules.filter((m) => m.recommended);
}

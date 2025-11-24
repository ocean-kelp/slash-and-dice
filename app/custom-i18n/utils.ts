import { join } from "@std/path";

/**
 * Recursively searches for a directory with the given name starting from the current directory
 * and moving up the directory tree.
 * @param dirName - The name of the directory to find (e.g., "locales")
 * @param maxDepth - Maximum depth to search up the directory tree (default: 5)
 * @returns The absolute path to the directory if found, null otherwise
 */
export async function findDirectoryRecursive(
  dirName: string,
  maxDepth: number = 5,
): Promise<string | null> {
  let currentDir = Deno.cwd();
  let depth = 0;

  while (depth < maxDepth) {
    try {
      const targetPath = join(currentDir, dirName);
      const stat = await Deno.stat(targetPath);

      if (stat.isDirectory) {
        return targetPath;
      }
    } catch {
      // Directory doesn't exist at this level, continue searching
    }

    // Move up one level
    const parentDir = join(currentDir, "..");
    if (parentDir === currentDir) break; // Reached filesystem root

    currentDir = parentDir;
    depth++;
  }

  return null;
}

/**
 * Finds the locales directory by searching from the current working directory
 * and moving up the directory tree.
 * @returns The path to the locales directory if found, null otherwise
 */
export async function findLocalesDirectory(): Promise<string | null> {
  return await findDirectoryRecursive("locales", 5);
}

/**
 * Gets the effective locales directory path, trying multiple strategies:
 * 1. Use the provided path if it exists
 * 2. Search recursively for a "locales" directory
 * @param preferredPath - The preferred path to try first
 * @returns The effective locales directory path, or null if none found
 */
export async function getEffectiveLocalesDir(
  preferredPath: string,
): Promise<string | null> {
  // First, try the preferred path
  try {
    const stat = await Deno.stat(preferredPath);
    if (stat.isDirectory) {
      return preferredPath;
    }
  } catch {
    // Preferred path doesn't exist, continue to search
  }

  // Second, try to find locales directory recursively
  const foundPath = await findLocalesDirectory();
  if (foundPath) {
    return foundPath;
  }

  return null;
}

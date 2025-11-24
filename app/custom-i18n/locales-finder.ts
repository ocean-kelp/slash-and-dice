/**
 * Recursively searches for a "locales" directory starting from the current working directory
 * and moving up the directory tree.
 * @param maxDepth - Maximum depth to search up the directory tree (default: 5)
 * @returns The absolute path to the locales directory if found, null otherwise
 */
export async function findLocalesDirectory(
  maxDepth: number = 5,
): Promise<string | null> {
  let currentDir = Deno.cwd();
  let depth = 0;

  while (depth < maxDepth) {
    try {
      const localesPath = `${currentDir}/locales`;
      const stat = await Deno.stat(localesPath);
      if (stat.isDirectory) {
        return localesPath;
      }
    } catch {
      // Directory doesn't exist, go up one level
    }

    const parentDir = `${currentDir}/..`;
    if (parentDir === currentDir) break; // Reached filesystem root
    currentDir = parentDir;
    depth++;
  }

  return null; // Not found
}

/**
 * Gets the effective locales directory path, trying multiple strategies:
 * 1. Use the provided path if it exists
 * 2. Search recursively for a "locales" directory
 * @param preferredPath - The preferred path to try first
 * @returns The effective locales directory path, or null if none found
 */
export async function getEffectiveLocalesDir(
  preferredPath: string = "./locales",
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

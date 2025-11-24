/**
 * Searches for a "locales" directory using multiple strategies:
 * 1. Check common relative paths from current directory
 * 2. Move up the directory tree and check from there
 * @returns The absolute path to the locales directory if found, null otherwise
 */
export async function findLocalesDirectory(): Promise<string | null> {
  let currentDir = Deno.cwd();

  // Common paths to check from current directory
  const commonPaths = [
    "./locales", // Same directory
    "./app/locales", // app subdirectory (most common)
    "./src/locales", // src subdirectory
    "../locales", // Parent directory
    "../app/locales", // Parent's app directory
    "../../locales", // Grandparent directory
    "../../app/locales", // Grandparent's app directory
    "/app/locales", // Absolute path (Docker)
    "/app/src/app/locales", // Docker with src structure
  ];

  for (const testPath of commonPaths) {
    try {
      const stat = await Deno.stat(testPath);
      if (stat.isDirectory) {
        return testPath;
      }
    } catch {
      // Not found, continue
    }
  }

  // If not found in common paths, try moving up directory tree
  let depth = 0;
  const maxDepth = 3;

  while (depth < maxDepth) {
    const parentDir = `${currentDir}/..`;
    if (parentDir === currentDir) {
      break; // Reached filesystem root
    }

    // Check for locales in parent and common subdirectories
    const parentPaths = [
      `${parentDir}/locales`,
      `${parentDir}/app/locales`,
      `${parentDir}/src/locales`,
    ];

    for (const testPath of parentPaths) {
      try {
        const stat = await Deno.stat(testPath);
        if (stat.isDirectory) {
          return testPath;
        }
      } catch {
        // Not found, continue
      }
    }

    currentDir = parentDir;
    depth++;
  }

  return null; // Not found
} /**
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

  // Only show error if nothing was found
  console.error("❌ Could not find locales directory at:", preferredPath);
  console.error("❌ Tried common paths including:");
  console.error("   - ./app/locales (most common)");
  console.error("   - ../app/locales (parent directory)");
  console.error("   - /app/src/app/locales (Docker absolute)");
  console.error(
    "❌ Check that the locales directory exists in your deployment",
  );
  return null;
}

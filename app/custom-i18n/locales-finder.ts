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

  console.log(`🔍 Starting locales directory search from: ${currentDir}`);

  while (depth < maxDepth) {
    try {
      const localesPath = `${currentDir}/locales`;
      console.log(`🔍 Checking path: ${localesPath}`);

      const stat = await Deno.stat(localesPath);
      if (stat.isDirectory) {
        console.log(`✅ Found locales directory at: ${localesPath}`);
        return localesPath;
      } else {
        console.log(`❌ Path exists but is not a directory: ${localesPath}`);
      }
    } catch (error) {
      console.log(`❌ Path not found: ${currentDir}/locales (${error})`);
    }

    const parentDir = `${currentDir}/..`;
    if (parentDir === currentDir) {
      console.log(`📁 Reached filesystem root at: ${currentDir}`);
      break; // Reached filesystem root
    }

    console.log(`📁 Moving up to parent: ${parentDir}`);
    currentDir = parentDir;
    depth++;
  }

  console.log(`❌ Locales directory not found after searching ${depth} levels`);
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
  console.log(
    `🔍 getEffectiveLocalesDir called with preferredPath: ${preferredPath}`,
  );

  // First, try the preferred path
  try {
    console.log(`🔍 Testing preferred path: ${preferredPath}`);
    const stat = await Deno.stat(preferredPath);
    if (stat.isDirectory) {
      console.log(
        `✅ Preferred path is valid locales directory: ${preferredPath}`,
      );
      return preferredPath;
    } else {
      console.log(
        `❌ Preferred path exists but is not a directory: ${preferredPath}`,
      );
    }
  } catch (error) {
    console.log(`❌ Preferred path not found: ${preferredPath} (${error})`);
  }

  // Second, try to find locales directory recursively
  console.log(`🔍 Starting recursive search for locales directory...`);
  const foundPath = await findLocalesDirectory();
  if (foundPath) {
    console.log(`✅ Recursive search found locales directory: ${foundPath}`);
    return foundPath;
  }

  console.log(`❌ Could not find locales directory using any strategy`);
  return null;
}

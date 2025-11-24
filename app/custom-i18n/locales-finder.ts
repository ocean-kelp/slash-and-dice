/**
 * Searches for a "locales" directory using multiple strategies:
 * 1. Check common relative paths from current directory
 * 2. Move up the directory tree and check from there
 * @returns The absolute path to the locales directory if found, null otherwise
 */
export async function findLocalesDirectory(): Promise<string | null> {
  let currentDir = Deno.cwd();

  console.log(`🔍 Starting locales directory search from: ${currentDir}`);

  // Show current directory structure
  try {
    console.log(`📂 Contents of current directory (${currentDir}):`);
    for await (const entry of Deno.readDir(currentDir)) {
      console.log(`   ${entry.isDirectory ? "📂" : "📄"} ${entry.name}`);
    }
  } catch (error) {
    console.log(`❌ Could not read current directory: ${error}`);
  }

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

  console.log(`🔍 Testing ${commonPaths.length} common paths...`);

  for (const testPath of commonPaths) {
    try {
      console.log(`🔍 Checking path: ${testPath}`);

      const stat = await Deno.stat(testPath);
      if (stat.isDirectory) {
        console.log(`✅ Found locales directory at: ${testPath}`);
        return testPath;
      } else {
        console.log(`❌ Path exists but is not a directory: ${testPath}`);
      }
    } catch (error) {
      console.log(`❌ Path not found: ${testPath} (${error})`);
    }
  }

  // If not found in common paths, try moving up directory tree
  console.log(`🔍 Common paths not found, trying directory tree traversal...`);

  let depth = 0;
  const maxDepth = 3;

  while (depth < maxDepth) {
    const parentDir = `${currentDir}/..`;
    if (parentDir === currentDir) {
      console.log(`📁 Reached filesystem root at: ${currentDir}`);
      break; // Reached filesystem root
    }

    console.log(`📁 Moving up to parent: ${parentDir}`);

    // Show parent directory structure
    try {
      console.log(`📂 Contents of parent directory (${parentDir}):`);
      for await (const entry of Deno.readDir(parentDir)) {
        console.log(`   ${entry.isDirectory ? "📂" : "📄"} ${entry.name}`);
      }

      // Check for locales in parent and common subdirectories
      const parentPaths = [
        `${parentDir}/locales`,
        `${parentDir}/app/locales`,
        `${parentDir}/src/locales`,
      ];

      for (const testPath of parentPaths) {
        try {
          console.log(`🔍 Checking parent path: ${testPath}`);
          const stat = await Deno.stat(testPath);
          if (stat.isDirectory) {
            console.log(`✅ Found locales directory at: ${testPath}`);
            return testPath;
          }
        } catch {
          // Not found, continue
        }
      }
    } catch (error) {
      console.log(`❌ Could not read parent directory: ${error}`);
    }

    currentDir = parentDir;
    depth++;
  }

  console.log(`❌ Locales directory not found after exhaustive search`);
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

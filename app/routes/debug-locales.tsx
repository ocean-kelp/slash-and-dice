import { define } from "@/utils.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    console.log("🔍 Debug route - Checking locale files...");

    try {
      // Check if locale directory exists
      const localeDir = "./locales";
      const dirExists = await Deno.stat(localeDir).then(() => true).catch(() =>
        false
      );
      console.log("Locale directory exists:", dirExists);

      if (dirExists) {
        // List all locale directories
        console.log("Available locale directories:");
        for await (const dirEntry of Deno.readDir(localeDir)) {
          console.log("  -", dirEntry.name);

          // Check common.json in each locale
          if (dirEntry.isDirectory) {
            const commonFile = `${localeDir}/${dirEntry.name}/common.json`;
            const fileExists = await Deno.stat(commonFile).then(() => true)
              .catch(() => false);
            console.log(`    common.json exists: ${fileExists}`);

            if (fileExists) {
              const content = await Deno.readTextFile(commonFile);
              console.log(`    common.json size: ${content.length} characters`);
              console.log(
                `    common.json preview: ${content.substring(0, 100)}...`,
              );
            }
          }
        }
      } else {
        console.log("❌ Locale directory does not exist!");
      }
    } catch (error) {
      console.log("❌ Error checking locale files:", (error as Error).message);
    }

    return new Response("Check logs for locale file status", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
});

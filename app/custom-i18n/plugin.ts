import { join } from "@std/path";
import { type MiddlewareFn } from "fresh";
import type { State } from "../utils.ts";

export interface I18nOptions {
  languages: string[];
  defaultLanguage: string;
  localesDir: string;
}

async function readJsonFile(filePath: string): Promise<Record<string, string>> {
  try {
    const absolutePath = join(Deno.cwd(), filePath);
    console.log(`🔍 Attempting to read JSON file: ${filePath}`);
    console.log(`🔍 Absolute path: ${absolutePath}`);
    const fileInfo = await Deno.stat(filePath);
    console.log(`📁 File exists, size: ${fileInfo.size} bytes`);

    const content = await Deno.readTextFile(filePath);

    // Skip empty files
    if (content.trim() === "") {
      console.log(`⚠️  File is empty, skipping: ${filePath}`);
      return {};
    }

    console.log(`📄 File content preview: ${content.substring(0, 200)}...`);

    const data = JSON.parse(content) as Record<string, string>;
    console.log(
      `✅ Successfully parsed JSON with ${Object.keys(data).length} keys`,
    );
    return data;
  } catch (error) {
    console.log(`❌ Failed to read/parse JSON file: ${filePath}`);
    console.log(`Error details: ${error}`);

    // Check if file exists
    try {
      await Deno.stat(filePath);
      console.log(`⚠️  File exists but parsing failed`);
    } catch (_statError) {
      console.log(`⚠️  File does not exist: ${filePath}`);
    }

    return {};
  }
}

function getPreferredLanguage(
  acceptLanguage: string,
  supportedLanguages: string[],
  defaultLanguage: string,
): string {
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=");
      return {
        code: code.toLowerCase(),
        q: qValue ? parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const lang of languages) {
    const code = lang.code.split("-")[0];
    if (supportedLanguages.includes(code)) {
      return code;
    }
  }

  return defaultLanguage;
}

export const i18nPlugin = (
  { languages, defaultLanguage, localesDir }: I18nOptions,
): MiddlewareFn<State> => {
  return async (ctx) => {
    console.log(`🌐 i18nPlugin: Processing request for URL: ${ctx.req.url}`);
    console.log(`📍 Current working directory: ${Deno.cwd()}`);

    // Test multiple possible paths for the locales directory
    const possiblePaths = [
      localesDir,
      "../locales",
      "../../locales",
      "./app/locales",
      "../app/locales",
      "../../app/locales",
      "/app/locales", // Absolute path for Docker/container environments
      "/app/src/app/locales",
    ];

    let effectiveLocalesDir = localesDir;
    console.log(`📂 Testing possible locales directory paths:`, possiblePaths);

    for (const testPath of possiblePaths) {
      try {
        console.log(`🔍 Testing path: ${testPath}`);

        // Check if directory exists
        const testStat = await Deno.stat(testPath);
        if (testStat.isDirectory) {
          console.log(`✅ Found locales directory at: ${testPath}`);
          effectiveLocalesDir = testPath;
          break;
        }
      } catch (error) {
        console.log(`❌ Path ${testPath} not found: ${error}`);
      }
    }

    // If none of the paths worked, try to find it by searching up the directory tree
    if (effectiveLocalesDir === localesDir) {
      console.log(`🔍 Searching up directory tree for locales directory...`);
      let searchDir = Deno.cwd();
      let searchDepth = 0;
      const maxSearchDepth = 5;

      while (searchDepth < maxSearchDepth) {
        const searchLocalesPath = join(searchDir, "locales");
        console.log(`   Searching at: ${searchLocalesPath}`);

        try {
          const searchStat = await Deno.stat(searchLocalesPath);
          if (searchStat.isDirectory) {
            console.log(
              `✅ Found locales directory by search at: ${searchLocalesPath}`,
            );
            effectiveLocalesDir = searchLocalesPath;
            break;
          }
        } catch (_searchError) {
          // Go up one level
          const parentDir = join(searchDir, "..");
          if (parentDir === searchDir) break; // Reached root
          searchDir = parentDir;
          searchDepth++;
        }
      }
    }

    console.log(`📁 Final effective locales directory: ${effectiveLocalesDir}`);

    // Final verification
    try {
      const finalStat = await Deno.stat(effectiveLocalesDir);
      if (!finalStat.isDirectory) {
        throw new Error(`Final path is not a directory`);
      }
      console.log(
        `✅ Final locales directory verified: ${effectiveLocalesDir}`,
      );
    } catch (finalError) {
      console.log(
        `❌ Final locales directory verification failed: ${finalError}`,
      );
      console.log(
        `⚠️  Will attempt to load translations anyway with path: ${effectiveLocalesDir}`,
      );
    }

    const url = new URL(ctx.req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    console.log(`📄 Path segments: [${pathSegments.join(", ")}]`);
    console.log(`🌍 Supported languages: [${languages.join(", ")}]`);
    console.log(`🌍 Default language: ${defaultLanguage}`);
    console.log(`📁 Effective locales directory: ${effectiveLocalesDir}`);

    // Detect the language from the first path segment
    let lang = languages.includes(pathSegments[0]) ? pathSegments[0] : null;
    console.log(`🗣️  Language from URL: ${lang || "none"}`);

    // If no language is detected in the URL, determine the user's preferred language
    if (!lang) {
      const acceptLanguage = ctx.req.headers.get("Accept-Language") || "";
      console.log(`🌐 Accept-Language header: ${acceptLanguage}`);
      lang = getPreferredLanguage(acceptLanguage, languages, defaultLanguage);
      console.log(`🗣️  Detected preferred language: ${lang}`);

      // NOTE: Removed redirect logic - just set the locale and continue
      // This allows routes to work without forced language prefixes
    }

    // Continue processing with the detected language
    const rootPath = "/" + pathSegments.slice(1).join("/");
    console.log(`🏠 Root path: ${rootPath}`);

    ctx.state.path = rootPath;
    ctx.state.locale = lang || defaultLanguage;
    console.log(`✅ Final locale: ${ctx.state.locale}`);

    // Use a flat structure for translation data to match what the translate function expects
    const translationData: Record<string, unknown> = {};

    // Helper function to flatten nested objects
    function flattenObject(
      obj: Record<string, unknown>,
      prefix = "",
    ): Record<string, unknown> {
      const flattened: Record<string, unknown> = {};

      for (const key in obj) {
        if (
          obj[key] !== null && typeof obj[key] === "object" &&
          !Array.isArray(obj[key])
        ) {
          Object.assign(
            flattened,
            flattenObject(
              obj[key] as Record<string, unknown>,
              `${prefix}${key}.`,
            ),
          );
        } else if (typeof obj[key] === "string") {
          flattened[`${prefix}${key}`] = obj[key];
        }
      }

      return flattened;
    }

    const loadTranslation = async (namespace: string) => {
      const filePath = join(
        effectiveLocalesDir,
        lang || defaultLanguage,
        `${namespace}.json`,
      );
      const absoluteFilePath = join(Deno.cwd(), filePath);
      console.log(`📚 Loading translation namespace: "${namespace}"`);
      console.log(`📄 File path: ${filePath}`);
      console.log(`📄 Absolute file path: ${absoluteFilePath}`);

      const data = await readJsonFile(filePath);
      if (Object.keys(data).length > 0) {
        const flattenedData = flattenObject(data);
        console.log(
          `✅ Successfully loaded namespace "${namespace}" with ${
            Object.keys(flattenedData).length
          } flattened keys`,
        );

        // Add namespace prefix to all flattened keys
        for (const [key, value] of Object.entries(flattenedData)) {
          translationData[`${namespace}.${key}`] = value;
        }

        console.log(
          `✅ Added ${
            Object.keys(flattenedData).length
          } flattened keys to translationData`,
        );
        console.log(
          `🔑 Sample flattened keys: [${
            Object.keys(flattenedData).slice(0, 3).join(", ")
          }${Object.keys(flattenedData).length > 3 ? "..." : ""}]`,
        );
      } else {
        console.log(
          `❌ Failed to load namespace "${namespace}" or file was empty`,
        );
      }
    };

    // Load common translations and other namespaces
    console.log(`🔄 Starting translation loading...`);
    await loadTranslation("common");
    await loadTranslation("error");
    await loadTranslation("metadata");

    console.log(
      `🔄 Loading route-specific translations for segments: [${
        pathSegments.slice(1).join(", ")
      }]`,
    );
    for (const segment of pathSegments.slice(1)) {
      await loadTranslation(segment);
    }

    console.log(`📊 Translation data summary:`);
    console.log(
      `   - Total flattened keys: ${Object.keys(translationData).length}`,
    );
    console.log(
      `   - Keys preview: [${
        Object.keys(translationData).slice(0, 5).join(", ")
      }${Object.keys(translationData).length > 5 ? "..." : ""}]`,
    );
    console.log(
      `   - Common.home.title exists: ${!!translationData[
        "common.home.title"
      ]}`,
    );
    if (translationData["common.home.title"]) {
      console.log(
        `   - Common.home.title value: "${
          translationData["common.home.title"]
        }"`,
      );
    }

    ctx.state.translationData = translationData;

    const response = await ctx.next() as Response;
    return response;
  };
};

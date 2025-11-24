import { join } from "@std/path";
import { type Middleware } from "fresh";
import type { State } from "../utils.ts";

export interface I18nOptions {
  languages: string[];
  defaultLanguage: string;
  localesDir: string;
}

async function readJsonFile(filePath: string): Promise<Record<string, string>> {
  try {
    const content = await Deno.readTextFile(filePath);

    // Skip empty files
    if (content.trim() === "") {
      return {};
    }

    const data = JSON.parse(content) as Record<string, string>;
    return data;
  } catch {
    return {}; // Silently fail for missing files
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
): Middleware<State> => {
  return async (ctx) => {
    // Final verification
    try {
      const finalStat = await Deno.stat(localesDir);
      if (!finalStat.isDirectory) {
        throw new Error("Locales directory not found");
      }
    } catch {
      console.error("❌ Could not find locales directory at:", localesDir);
      return await ctx.next() as Response; // Skip i18n if locales not found
    }

    const url = new URL(ctx.req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);

    // Detect the language from the first path segment
    let lang = languages.includes(pathSegments[0]) ? pathSegments[0] : null;

    // If no language is detected in the URL, determine the user's preferred language
    if (!lang) {
      const acceptLanguage = ctx.req.headers.get("Accept-Language") || "";
      lang = getPreferredLanguage(acceptLanguage, languages, defaultLanguage);
    }

    // Continue processing with the detected language
    const rootPath = "/" + pathSegments.slice(1).join("/");

    ctx.state.path = rootPath;
    ctx.state.locale = lang || defaultLanguage;

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
        localesDir,
        lang || defaultLanguage,
        `${namespace}.json`,
      );

      const data = await readJsonFile(filePath);
      if (Object.keys(data).length > 0) {
        const flattenedData = flattenObject(data);

        // Add namespace prefix to all flattened keys
        for (const [key, value] of Object.entries(flattenedData)) {
          translationData[`${namespace}.${key}`] = value;
        }
      }
    };

    // Load common translations and other namespaces
    await loadTranslation("common");
    await loadTranslation("error");
    await loadTranslation("metadata");

    for (const segment of pathSegments.slice(1)) {
      await loadTranslation(segment);
    }

    ctx.state.translationData = translationData;

    const response = await ctx.next() as Response;
    return response;
  };
};

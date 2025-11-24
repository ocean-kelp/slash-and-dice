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
    const content = await Deno.readTextFile(filePath);
    return JSON.parse(content) as Record<string, string>;
  } catch {
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
    const url = new URL(ctx.req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);

    // Detect the language from the first path segment
    let lang = languages.includes(pathSegments[0]) ? pathSegments[0] : null;

    // If no language is detected in the URL, determine the user's preferred language
    if (!lang) {
      const acceptLanguage = ctx.req.headers.get("Accept-Language") || "";
      lang = getPreferredLanguage(acceptLanguage, languages, defaultLanguage);

      // NOTE: Removed redirect logic - just set the locale and continue
      // This allows routes to work without forced language prefixes
    }

    // Continue processing with the detected language
    const rootPath = "/" + pathSegments.slice(1).join("/");

    ctx.state.path = rootPath;
    ctx.state.locale = lang || defaultLanguage;

    const translationData: Record<string, Record<string, string>> = {};

    const loadTranslation = async (namespace: string) => {
      const filePath = join(
        localesDir,
        lang || defaultLanguage,
        `${namespace}.json`,
      );
      const data = await readJsonFile(filePath);
      if (Object.keys(data).length > 0) {
        translationData[namespace] = data;
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

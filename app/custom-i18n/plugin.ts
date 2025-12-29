import { join } from "@std/path";
import { type Middleware } from "fresh";
import type { State } from "../utils.ts";
import { translate } from "./translator.ts";

export interface FallbackConfig {
  /**
   * Enable fallback to default language when translations are missing.
   * @default false
   */
  enabled?: boolean;
  /**
   * Show an indicator when displaying fallback content.
   * @default false
   */
  showIndicator?: boolean;
  /**
   * Custom function to format the fallback text with indicator.
   * @default (text, locale) => `${text} [${locale}]`
   */
  indicatorFormat?: (text: string, defaultLocale: string) => string;
  /**
   * Function to determine if a specific fallback text should show an indicator.
   * Allows conditional indicator display based on text length or other criteria.
   * If not provided, indicator will always show when showIndicator is enabled.
   * @param text - The fallback text content
   * @param locale - The default locale being used for fallback
   * @returns true to show indicator, false to hide it
   * @example
   * shouldShowIndicator: (text, locale) => {
   *   const wordCount = text.split(/\\s+/).filter(w => w).length;
   *   const letterCount = text.replace(/\\s/g, '').length;
   *   return wordCount >= 2 && letterCount > 10;
   * }
   */
  shouldShowIndicator?: (text: string, locale: string) => boolean;
  /**
   * Apply fallback behavior in development mode too.
   * If false (default), dev mode always shows [key] for visibility.
   * @default false
   */
  applyOnDev?: boolean;
}

export interface I18nOptions {
  languages: string[];
  defaultLanguage: string;
  localesDir: string;
  /**
   * Custom function to determine if running in production.
   * If not provided, uses Vite's import.meta.env.DEV and VITE_SIMULATE_PROD.
   * Useful for custom deployment environments or testing scenarios.
   * @example
   * isProduction: () => !import.meta.env?.DEV || import.meta.env?.VITE_SIMULATE_PROD === "true",
   * @default undefined
   */
  isProduction?: () => boolean;
  /**
   * Fallback configuration for missing translations.
   *
   * @property {boolean} [enabled=false] - Enable fallback to default language when translations are missing.
   * @property {boolean} [showIndicator=false] - Show an indicator when displaying fallback content.
   * @property {function} [indicatorFormat] - Custom function to format the fallback text with indicator. Default: `(text, locale) => ${text} [${locale}]`
   * @property {function} [shouldShowIndicator] - Function to determine if indicator should be shown for specific text. If not provided, always shows indicator when enabled.
   * @property {boolean} [applyOnDev=false] - Apply fallback behavior in development mode too. If false (default), dev mode always shows [key] for visibility.
   *
   * @example
   * fallback: {
   *   enabled: true,
   *   showIndicator: true,
   *   indicatorFormat: (text, locale) => `${text} · ${locale.toUpperCase()}`,
   *   shouldShowIndicator: (text, locale) => {
   *     const wordCount = text.split(/\\s+/).filter(w => w).length;
   *     const letterCount = text.replace(/\\s/g, '').length;
   *     return wordCount >= 2 && letterCount > 10;
   *   },
   *   applyOnDev: false
   * }
   */
  fallback?: FallbackConfig;
  /**
   * If true, show translation keys [key] in production when no translation exists.
   * Takes precedence over fallback - useful for identifying missing translations.
   * @default false
   */
  showKeysInProd?: boolean;
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
  {
    languages,
    defaultLanguage,
    localesDir,
    isProduction,
    fallback,
    showKeysInProd = false,
  }: I18nOptions,
): Middleware<State> => {
  const fallbackConfig: FallbackConfig = {
    enabled: fallback?.enabled ?? false,
    showIndicator: fallback?.showIndicator ?? false,
    indicatorFormat: fallback?.indicatorFormat ??
      ((text: string, locale: string) => `${text} [${locale}]`),
    shouldShowIndicator: fallback?.shouldShowIndicator,
    applyOnDev: fallback?.applyOnDev ?? false,
  };

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

    const loadTranslation = async (
      namespace: string,
      targetData: Record<string, unknown>,
      locale: string,
      fallbackKeysSet: Set<string>,
      isDefaultLanguage: boolean,
      trackFallbacks: boolean,
    ) => {
      const filePath = join(localesDir, locale, `${namespace}.json`);

      const data = await readJsonFile(filePath);
      if (Object.keys(data).length > 0) {
        const flattenedData = flattenObject(data);

        // Add namespace prefix to all flattened keys
        for (const [key, value] of Object.entries(flattenedData)) {
          const fullKey = `${namespace}.${key}`;
          const existedBefore = fullKey in targetData;

          targetData[fullKey] = value;

          // Track fallback keys inline during merge (only if fallback enabled)
          if (trackFallbacks) {
            if (isDefaultLanguage && !existedBefore) {
              // This is a new key from default language - mark as fallback
              fallbackKeysSet.add(fullKey);
            } else if (!isDefaultLanguage && existedBefore) {
              // Current language is overwriting a key - no longer fallback
              fallbackKeysSet.delete(fullKey);
            }
          }
        }
      }
    };

    const namespaces = [
      "common",
      "error",
      "metadata",
      ...pathSegments.slice(1),
    ];

    // Track which keys are using fallback (for indicator)
    const fallbackKeys = new Set<string>();

    // If fallback enabled and not default language, load default language first as base
    if (fallbackConfig.enabled && lang !== defaultLanguage) {
      for (const namespace of namespaces) {
        await loadTranslation(
          namespace,
          translationData,
          defaultLanguage,
          fallbackKeys,
          true,
          true,
        );
      }
    }

    // Load current language translations (overwrites defaults if any)
    for (const namespace of namespaces) {
      await loadTranslation(
        namespace,
        translationData,
        lang || defaultLanguage,
        fallbackKeys,
        false,
        fallbackConfig.enabled ?? false,
      );
    }

    // Store translation data and config in state
    ctx.state.translationData = translationData;
    ctx.state.locale = lang || defaultLanguage;

    // Create pre-configured translate function and store in state
    ctx.state.t = translate(translationData, {
      locale: lang || defaultLanguage,
      defaultLocale: defaultLanguage,
      fallbackKeys: fallbackKeys,
      showKeysInProd: showKeysInProd,
      showFallbackIndicator: fallbackConfig.showIndicator &&
        fallbackConfig.enabled,
      fallbackIndicatorFormat: fallbackConfig.indicatorFormat,
      shouldShowFallbackIndicator: fallbackConfig.shouldShowIndicator,
      applyFallbackOnDev: fallbackConfig.applyOnDev,
      isProduction: isProduction,
    });

    const response = await ctx.next() as Response;
    return response;
  };
};

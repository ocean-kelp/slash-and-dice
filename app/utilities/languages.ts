export const LANGUAGES = ["en", "es", "ja", "zh-Hant", "zh-Hans", "ko"];

export function resolveChineseLocale(token: string): string | null {
  // chinese variants: map zh-CN -> zh-Hans, zh-TW -> zh-Hant
  if (/(-|_)?(CN|SG|Hans)/i.test(token)) {
    if (LANGUAGES.includes("zh-Hans")) return "zh-Hans";
  }
  if (/(-|_)?(TW|HK|Hant)/i.test(token)) {
    if (LANGUAGES.includes("zh-Hant")) return "zh-Hant";
  }
  // Default to zh-Hans if available, otherwise zh-Hant, otherwise zh
  if (LANGUAGES.includes("zh-Hans")) return "zh-Hans";
  if (LANGUAGES.includes("zh-Hant")) return "zh-Hant";
  return null;
}

export function pickLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";

  const tokens = acceptLanguage.split(",").map((s) => s.split(";")[0].trim())
    .filter(Boolean);

  for (const token of tokens) {
    // exact match
    if (LANGUAGES.includes(token)) return token;
    // primary subtag match (en-US -> en)
    const primary = token.split(/[-_]/)[0];
    if (LANGUAGES.includes(primary)) return primary;
    // chinese variants: map zh-CN -> zh-Hans, zh-TW -> zh-Hant
    if (primary === "zh") {
      const resolved = resolveChineseLocale(token);
      if (resolved) return resolved;
    }
  }

  return "en";
}

/**
 * Creates a translator function.
 * Returns a function that translates keys using the provided translation data.
 * @param translationData - The nested translation object for the current locale.
 * @returns A function that takes a translation key and returns the translated string.
 */
export function translate(
  translationData: Record<string, unknown>,
): (key: string) => string {
  return (key: string): string => {
    const keys = key.split(".");

    let result: Record<string, unknown> | string = translationData;

    for (const k of keys) {
      if (typeof result === "object" && result !== null && k in result) {
        result = result[k] as Record<string, unknown> | string;
      } else {
        // Show warnings in development (both server and client side)
        if (import.meta.env?.DEV) {
          console.warn(`❌ Missing translation key: "${key}"`);
          console.warn(
            `   Expected structure: ${keys.join(" → ")} (missing at "${k}")`,
          );
          console.warn(`   Available keys at this level:`, Object.keys(result));
          console.warn(
            `   📁 Root keys in translation data:`,
            Object.keys(translationData),
          );
        } else {
          // Production debugging - only for missing keys that should exist
          if (
            key === "common.home.title" || key === "common.header.ariaLabel"
          ) {
            console.log(`🔍 Production debug - Missing key: "${key}"`);
            console.log(
              `🔍 Available keys:`,
              Object.keys(translationData).slice(0, 10),
            );
            console.log(`🔍 Key structure expected: ${keys.join(" → ")}`);
          }
        }

        // Development: show key in UI, Production: return empty string
        if (import.meta.env?.DEV) {
          return `[${key}]`;
        } else {
          return ""; // Clean production experience
        }
      }
    }

    if (typeof result === "string") {
      return result;
    } else {
      // Show warnings in development (both server and client side)
      if (import.meta.env?.DEV) {
        console.warn(
          `❌ Translation key "${key}" exists but is not a string value`,
        );
        console.warn(`   Expected: string, Got:`, typeof result, result);
        console.warn(
          `   📁 Root keys in translation data:`,
          Object.keys(translationData),
        );
      } else if (
        key === "common.home.title" || key === "common.header.ariaLabel"
      ) {
        console.log(
          `🔍 Production debug - Key exists but not string: "${key}"`,
        );
        console.log(`🔍 Value type:`, typeof result, result);
      }

      // Development: show key in UI, Production: return empty string
      if (import.meta.env?.DEV) {
        return `[${key}]`;
      } else {
        return "";
      }
    }
  };
}

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
    
    // Special handling for zh locale keys - resolve to appropriate variant
    if (keys[0] === "zh") {
      const resolvedLocale = resolveChineseLocale("zh");
      if (resolvedLocale) {
        keys[0] = resolvedLocale;
      }
    }
    
    let result: Record<string, unknown> | string = translationData;

    for (const k of keys) {
      if (typeof result === "object" && result !== null && k in result) {
        result = result[k] as Record<string, unknown> | string;
      } else {
        return ""; // Key not found, return empty string
      }
    }

    return typeof result === "string" ? result : ""; // Return the result if it's a string
  };
}

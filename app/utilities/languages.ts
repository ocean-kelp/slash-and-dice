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



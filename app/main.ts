import { App, staticFiles, trailingSlashes } from "fresh";
import { type State } from "./utils.ts";
import { i18nPlugin } from "./custom-i18n/plugin.ts";
import { LANGUAGES } from "./utilities/languages.ts";
import { getEffectiveLocalesDir } from "./custom-i18n/locales-finder.ts";
import { authProvidersMiddleware } from "./middlewares/auth/authProviders.ts";

export const app = new App<State>();

// static files
app.use(staticFiles());

// i18n plugin - register before loading fsRoutes so it can attach translation
// data to `ctx.state` for all routes. The plugin needs to be in the middleware
// chain prior to route registration.

// Find the effective locales directory path dynamically
let effectiveLocalesDir = "./locales";

// Try to find the locales directory using the utility function
try {
  const foundPath = await getEffectiveLocalesDir();
  if (foundPath) {
    effectiveLocalesDir = foundPath;
  }
} catch {
  // Use default path if directory finding fails
}

app.use(i18nPlugin({
  languages: LANGUAGES,
  defaultLanguage: "en",
  localesDir: effectiveLocalesDir,
  isProduction: () => !import.meta.env?.DEV || import.meta.env?.VITE_SIMULATE_PROD === "true",
  fallback: {
    enabled: true,
    showIndicator: true,
    indicatorFormat: (text, locale) => {
      const langMap: Record<string, string> = {
        "en": "EN",
        "es": "ES",
        "ja": "JA",
        "ko": "KO",
        "zh-Hans": "ZH-CN",
        "zh-Hant": "ZH-TW",
      };
      const langCode = langMap[locale] || locale.toUpperCase();

      // Return a compact, plain-text indicator that is safe to render
      // anywhere without requiring HTML or `dangerouslySetInnerHTML`.
      // Example: "Some text · (EN)"
      return `${text} · (${langCode})`;
    },
    shouldShowIndicator: (text, _locale) => {
      const wordCount = text.split(/\s+/).filter((w) => w).length;
      const letterCount = text.replace(/\s/g, "").length;
      return wordCount >= 4 && letterCount > 20;
    },
  },
}));

// Auth providers middleware - populates available OAuth providers in state
app.use(authProvidersMiddleware);

// Never allow trailing slashes in routes - must be before fsRoutes
app.use(trailingSlashes("never"));

// Include file-system based routes here (after plugins/middleware)
app.fsRoutes();

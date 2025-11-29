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
}));

// Auth providers middleware - populates available OAuth providers in state
app.use(authProvidersMiddleware);

// Never allow trailing slashes in routes - must be before fsRoutes
app.use(trailingSlashes("never"));

// Include file-system based routes here (after plugins/middleware)
app.fsRoutes();

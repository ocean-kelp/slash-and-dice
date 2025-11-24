import { App, staticFiles, trailingSlashes } from "fresh";
import { type State } from "./utils.ts";
import { i18nPlugin } from "./custom-i18n/plugin.ts";
import { LANGUAGES } from "./utilities/languages.ts";

export const app = new App<State>();

// static files
app.use(staticFiles());

// i18n plugin - register before loading fsRoutes so it can attach translation
// data to `ctx.state` for all routes. The plugin needs to be in the middleware
// chain prior to route registration.

// Find the effective locales directory path
// The app runs from /app/src in production, so we need to go up one level
let effectiveLocalesDir = "./locales";
const currentDir = Deno.cwd();
const isProduction = currentDir.includes("/app/src");
if (isProduction) {
  effectiveLocalesDir = "../locales";
}

app.use(i18nPlugin({
  languages: LANGUAGES,
  defaultLanguage: "en",
  localesDir: effectiveLocalesDir,
}));

// Never allow trailing slashes in routes - must be before fsRoutes
app.use(trailingSlashes("never"));

// Include file-system based routes here (after plugins/middleware)
app.fsRoutes();

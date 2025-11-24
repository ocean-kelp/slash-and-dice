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
console.log(`🔧 Initializing i18n plugin with config:`, {
  languages: LANGUAGES,
  defaultLanguage: "en",
  localesDir: "./locales",
  currentWorkingDir: Deno.cwd(),
});

// Determine the correct path to locales directory
// The app runs from /app/src in production, so we need to go up one level
const currentDir = Deno.cwd();
const isProduction = currentDir.includes("/app/src");
const localesDir = isProduction ? "../locales" : "./locales";

console.log(`🌍 Environment detection:`, {
  isProduction,
  currentDir,
  localesDir,
});

app.use(i18nPlugin({
  languages: LANGUAGES,
  defaultLanguage: "en",
  localesDir: localesDir,
}));

// Never allow trailing slashes in routes - must be before fsRoutes
app.use(trailingSlashes("never"));

// Include file-system based routes here (after plugins/middleware)
app.fsRoutes();

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

// Test directory structure
async function logDirectoryStructure(dir: string, depth = 0): Promise<void> {
  if (depth > 2) return; // Limit depth to avoid too much output

  try {
    const entries = [];
    for await (const entry of Deno.readDir(dir)) {
      entries.push(entry);
    }

    console.log(`${"  ".repeat(depth)}📁 ${dir}/`);
    for (const entry of entries) {
      const indent = "  ".repeat(depth + 1);
      if (entry.isDirectory) {
        console.log(`${indent}📂 ${entry.name}/`);
        if (depth < 2) {
          await logDirectoryStructure(`${dir}/${entry.name}`, depth + 1);
        }
      } else {
        console.log(`${indent}📄 ${entry.name}`);
      }
    }
  } catch (error) {
    console.log(`❌ Cannot read directory ${dir}: ${error}`);
  }
}

// Log the current directory structure
console.log(`\n🔍 Current directory structure:`);
logDirectoryStructure(currentDir).catch(console.error);

app.use(i18nPlugin({
  languages: LANGUAGES,
  defaultLanguage: "en",
  localesDir: localesDir,
}));

// Never allow trailing slashes in routes - must be before fsRoutes
app.use(trailingSlashes("never"));

// Include file-system based routes here (after plugins/middleware)
app.fsRoutes();

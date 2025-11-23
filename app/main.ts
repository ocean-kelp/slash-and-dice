import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import { i18nPlugin } from '@i18n'
import { LANGUAGES } from "./utilities/languages.ts";

export const app = new App<State>();

// static files
app.use(staticFiles());

// Include file-system based routes here
app.fsRoutes();

// i18n plugin
app.use(i18nPlugin({
    languages: LANGUAGES,
    defaultLanguage: 'en',
    localesDir: './locales',
}));
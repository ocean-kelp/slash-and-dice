import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import { i18nPlugin } from '@i18n'

export const app = new App<State>();

// static files
app.use(staticFiles());

// Include file-system based routes here
app.fsRoutes();

// i18n plugin
app.use(i18nPlugin({
    languages: ['en', 'es', 'ja', 'zh-Hant', 'zh-Hans', 'zh', 'ko'],
    defaultLanguage: 'en',
    localesDir: './locales',
}));
import { define } from "../utils.ts";
import { pickLanguage } from "../utilities/languages.ts";

export const handler = define.handlers({
  GET(ctx) {
    const lang = pickLanguage(ctx.req.headers.get("accept-language"));
    return Response.redirect(new URL(`/${lang}/home`, ctx.url), 302);
  },
});

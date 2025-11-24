import { define } from "@/utils.ts";
import { pickLanguage } from "@/utilities/languages.ts";

export const handler = define.handlers({
  GET(ctx) {
    const lang = pickLanguage(ctx.req.headers.get("accept-language"));

    // Only redirect if the detected language is different from the current locale
    if (lang !== ctx.params.locale) {
      // Build absolute URL for redirect to avoid client-side errors
      const redirectUrl = new URL(ctx.req.url);
      redirectUrl.pathname = `/${lang}/home`;

      return Response.redirect(redirectUrl, 302);
    } else {
      // Redirect to home within the same locale
      const redirectUrl = new URL(ctx.req.url);
      redirectUrl.pathname = `/${lang}/home`;

      return Response.redirect(redirectUrl, 302);
    }
  },
});

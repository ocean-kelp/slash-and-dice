import { define } from "@/utils.ts";
import { pickLanguage } from "@/utilities/languages.ts";

export const handler = define.handlers({
  GET(ctx) {
    console.log("🌍 Locale route handler triggered");
    console.log("Request URL:", ctx.req.url);
    console.log("Accept-Language:", ctx.req.headers.get("accept-language"));
    console.log("Locale param:", ctx.params.locale);
    
    const lang = pickLanguage(ctx.req.headers.get("accept-language"));
    console.log("Detected language:", lang);

    // Only redirect if the detected language is different from the current locale
    if (lang !== ctx.params.locale) {
      console.log("Language mismatch - redirecting from", ctx.params.locale, "to", lang);
      
      // Build absolute URL for redirect to avoid client-side errors
      const redirectUrl = new URL(ctx.req.url);
      redirectUrl.pathname = `/${lang}/home`;
      
      console.log("Redirecting to:", redirectUrl.toString());
      return Response.redirect(redirectUrl, 302);
    } else {
      console.log("Language matches - redirecting to home within same locale");
      
      // Redirect to home within the same locale
      const redirectUrl = new URL(ctx.req.url);
      redirectUrl.pathname = `/${lang}/home`;
      
      console.log("Redirecting to:", redirectUrl.toString());
      return Response.redirect(redirectUrl, 302);
    }
  },
});

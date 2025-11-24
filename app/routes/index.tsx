import { define } from "@/utils.ts";
import { pickLanguage } from "@/utilities/languages.ts";

export const handler = define.handlers({
  GET(ctx) {
    console.log("🚀 Root route handler triggered");
    console.log("Request URL:", ctx.req.url);
    console.log("Accept-Language:", ctx.req.headers.get("accept-language"));
    
    const lang = pickLanguage(ctx.req.headers.get("accept-language"));
    console.log("Detected language:", lang);

    // Build absolute URL for redirect to avoid client-side errors
    const redirectUrl = new URL(ctx.req.url);
    redirectUrl.pathname = `/${lang}/home`;
    
    console.log("Redirecting to:", redirectUrl.toString());

    return Response.redirect(redirectUrl, 302);
  },
});

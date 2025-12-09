import { define } from "@/utils.ts";
import { LANGUAGES, pickLanguage } from "@/utilities/languages.ts";
import { getCookieServer } from "@/services/local/storage/cookies.ts";

export const handler = define.handlers({
  GET(ctx) {
    // Check for locale cookie first (user preference)
    // Note: locale cookie is set directly without alias prefix by LanguageSelector
    const cookieHeader = ctx.req.headers.get("cookie");
    let cookieLocale: string | null = null;

    if (cookieHeader) {
      const cookies = cookieHeader.split("; ");
      for (const cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === "locale") {
          cookieLocale = decodeURIComponent(val);
          break;
        }
      }
    }

    // Use cookie locale if valid, otherwise fall back to browser preference
    let lang: string;
    if (cookieLocale && LANGUAGES.includes(cookieLocale)) {
      lang = cookieLocale;
    } else {
      lang = pickLanguage(ctx.req.headers.get("accept-language"));
    }

    // Build absolute URL for redirect to avoid client-side errors
    const redirectUrl = new URL(ctx.req.url);
    redirectUrl.pathname = `/${lang}/home`;

    return Response.redirect(redirectUrl, 302);
  },
});

import { define } from "@/utils.ts";
import { appConfig } from "@/utilities/config.ts";
import { logger } from "@/utilities/logger.ts";

/**
 * Admin API middleware - protects all /api/admin/* routes
 * Requires a valid secret key via query parameter or Authorization header
 * Adds structured logging (IP, selected headers, search params) for auditing
 */
export const handler = define.middleware(async (ctx) => {
  const url = new URL(ctx.req.url);

  const headers = ctx.req.headers;
  const ip = headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown";

  // Check for key in query params or Authorization header
  const keyFromQuery = url.searchParams.get("key");
  const keyFromHeader = headers.get("Authorization")?.replace("Bearer ", "");
  const providedKey = keyFromQuery || keyFromHeader;

  const secretKey = appConfig.adminSecret;

  const searchParams: Record<string, string> = {};
  for (const [k, v] of url.searchParams.entries()) {
    searchParams[k] = v;
  }

  const importantHeaders: Record<string, string | null> = {
    referer: headers.get("referer"),
    origin: headers.get("origin"),
    host: headers.get("host"),
    accept: headers.get("accept"),
    accept_language: headers.get("accept-language"),
    user_agent: headers.get("user-agent"),
    x_forwarded_for: headers.get("x-forwarded-for"),
    authorization: headers.get("authorization") ? "[REDACTED]" : null,
  };

  const providedKeyMasked = providedKey ? `***${providedKey.slice(-4)}` : null;

  const logEntry = {
    time: new Date().toISOString(),
    ip,
    method: ctx.req.method,
    path: url.pathname,
    searchParams,
    providedKey: providedKey
      ? { present: true, masked: providedKeyMasked }
      : { present: false },
    headers: importantHeaders,
  };

  if (!providedKey || providedKey !== secretKey) {
    logger.warn({ tag: "API ADMIN ACCESS DENIED", ...logEntry });
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  logger.info({ tag: "API ADMIN ACCESS GRANTED", ...logEntry });

  return await ctx.next();
});

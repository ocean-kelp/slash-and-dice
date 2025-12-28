import { define } from "@/utils.ts";
import { appConfig } from "@/utilities/config.ts";

/**
 * Admin middleware - protects all /admin/* routes
 * Requires a valid secret key via query parameter or header
 */
export const handler = define.middleware(async (ctx) => {
  const url = new URL(ctx.req.url);

  // Check for key in query params or Authorization header
  const keyFromQuery = url.searchParams.get("key");
  const keyFromHeader = ctx.req.headers.get("Authorization")?.replace(
    "Bearer ",
    "",
  );
  const providedKey = keyFromQuery || keyFromHeader;

  const secretKey = appConfig.adminSecret;

  // Require valid key (always, even in development)
  if (!providedKey || providedKey !== secretKey) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return await ctx.next();
});

import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";

/**
 * Catch-all route handler for Better Auth
 * Forwards all /api/auth/* requests to the Better Auth handler
 */
export const handler = define.handlers({
  async GET(ctx) {
    return await auth.handler(ctx.req);
  },
  async POST(ctx) {
    return await auth.handler(ctx.req);
  },
});

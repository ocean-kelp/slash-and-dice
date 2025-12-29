import { define } from "@/utils.ts";
import { monitoringMiddleware } from "@/middlewares/monitoring.ts";
import type { Context } from "fresh";

/**
 * Root middleware - applies to all routes
 * Syncs authenticated users to KV database
 */
export const handler = define.middleware(async (ctx) => {
  // Lazy import to avoid top-level await during module load
  const { handler: syncUserHandler } = await import(
    "@/middlewares/auth/syncUser.ts"
  );

  // Wrap the syncUser middleware inside monitoringMiddleware so all
  // requests pass through the monitoring layer and metrics are recorded.
  const wrapperCtx = {
    ...ctx,
    next: () => syncUserHandler(ctx),
  } as unknown as Context<unknown>;

  return await monitoringMiddleware(ctx.req, wrapperCtx);
});

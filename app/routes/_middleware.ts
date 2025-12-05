import { define } from "@/utils.ts";

/**
 * Root middleware - applies to all routes
 * Syncs authenticated users to KV database
 */
export const handler = define.middleware(async (ctx) => {
  // Lazy import to avoid top-level await during module load
  const { handler: syncUserHandler } = await import(
    "@/middlewares/auth/syncUser.ts"
  );

  // Run the sync middleware
  return await syncUserHandler(ctx);
});

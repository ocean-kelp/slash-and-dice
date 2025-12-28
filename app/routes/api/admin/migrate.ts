import { define } from "@/utils.ts";

/**
 * POST /api/admin/migrate
 *
 * Run database migrations via HTTP endpoint.
 * Protected by /api/admin/_middleware.ts
 *
 * Usage:
 *   curl -X POST https://your-app.deno.dev/api/admin/migrate \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"migration": "001"}'  # optional, runs all if omitted
 */
export const handler = define.handlers({
  async POST(ctx) {
    try {
      const body = await ctx.req.json().catch(() => ({}));
      const targetMigration = body.migration;

      // Import and run migrations dynamically
      const { runMigrationsFromAPI } = await import(
        "@/db/migrations/run.ts"
      );

      const result = await runMigrationsFromAPI(targetMigration);

      return new Response(
        JSON.stringify({
          success: true,
          message: result.message,
          migrations: result.applied,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Migration failed:", error);
      return new Response(
        JSON.stringify({
          error: "Migration failed",
          details: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  // GET to check migration status
  async GET(_ctx) {
    try {
      const { getMigrationStatus } = await import("@/db/migrations/run.ts");
      const status = await getMigrationStatus();

      return new Response(
        JSON.stringify(status),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Failed to get migration status:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to get migration status",
          details: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
});

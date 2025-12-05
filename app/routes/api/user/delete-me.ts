import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";

/**
 * DELETE /api/user/delete-me (or POST)
 * Deletes current user data from KV
 */
export const handler = define.handlers({
  GET(_ctx) {
    return new Response(
      JSON.stringify({
        message: "Use POST method to delete your user data",
        example: "fetch('/api/user/delete-me', { method: 'POST' })",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
  async POST(ctx) {
    try {
      // Get current session
      const session = await auth.api.getSession({ headers: ctx.req.headers });

      if (!session?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      const userId = session.user.id;

      // Lazy load to avoid top-level await
      const kv = await Deno.openKv();

      // Delete user from KV
      await kv.delete(["user", userId]);

      console.log(`🗑️ Deleted user: ${userId}`);

      return new Response(
        JSON.stringify({
          success: true,
          message:
            "User data deleted. Refresh the page to recreate with correct provider ID.",
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to delete user",
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

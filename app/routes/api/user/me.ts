import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";

/**
 * GET /api/user/me
 * Returns current user data from KV
 */
export const handler = define.handlers({
  async GET(ctx) {
    try {
      // Lazy load to avoid top-level await issues
      const { getUserById } = await import("@/db/repositories/userRepo.ts");

      // Get session
      const session = await auth.api.getSession({ headers: ctx.req.headers });

      if (!session?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Get user from KV
      const user = await getUserById(session.user.id);
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Return user data
      return new Response(
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          providerId: user.providerId,
          createdAt: user.createdAt,
          lastSeenAt: user.lastSeenAt,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error in /api/user/me:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch user",
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

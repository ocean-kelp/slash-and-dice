import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";

/**
 * POST /api/user/avatar
 * Update user's avatar selection
 */
export const handler = define.handlers({
  async POST(ctx) {
    try {
      // Lazy load to avoid top-level await issues
      const { updateUserAvatar } = await import(
        "@/db/repositories/userRepo.ts"
      );

      // Get session
      const session = await auth.api.getSession({ headers: ctx.req.headers });

      if (!session?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Parse body
      const body = await ctx.req.json();
      const { selectedAvatarUrl, avatarStyle, avatarSeed } = body;

      // Get user by email since Better Auth ID might differ from KV ID
      const { getUserByEmail } = await import("@/db/repositories/userRepo.ts");
      const user = await getUserByEmail(session.user.email);

      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Update avatar in database using KV user ID
      await updateUserAvatar(user.id, {
        selectedAvatarUrl,
        avatarStyle,
        avatarSeed,
      });

      // Update the Better Auth session with new avatar
      try {
        await auth.api.updateUser({
          headers: ctx.req.headers,
          body: {
            image: selectedAvatarUrl,
          },
        });
      } catch (error) {
        // Silently fail if session update fails
        console.error(
          "Failed to update Better Auth session:",
          error,
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error in /api/user/avatar:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
});

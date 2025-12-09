import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";

export const handler = define.handlers({
  async GET(ctx) {
    try {
      // Check if user is logged in
      const session = await auth.api.getSession({ headers: ctx.req.headers });

      if (!session?.user) {
        return Response.json({
          needsOnboarding: false,
          providers: [],
        });
      }

      // Get user data
      const { getUserById } = await import("@/db/repositories/userRepo.ts");
      const user = await getUserById(session.user.id);

      if (!user) {
        return Response.json({
          needsOnboarding: false,
          providers: [],
        });
      }

      // Check if user needs onboarding (hasn't selected an avatar)
      const needsOnboarding = !user.selectedAvatarUrl;

      return Response.json({
        needsOnboarding,
        providers: user.providers || [],
      });
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return Response.json(
        {
          needsOnboarding: false,
          providers: [],
        },
        { status: 500 },
      );
    }
  },
});

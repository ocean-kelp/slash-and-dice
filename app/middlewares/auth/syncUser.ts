import { define } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";
import {
  createUserFromOAuth,
  getUserById,
  updateLastSeen,
} from "@/db/repositories/userRepo.ts";

/**
 * Minimal middleware: Sync Better Auth session → KV
 *
 * 1. Check if user is logged in (session cookie)
 * 2. If first login → create user in KV
 * 3. If returning → update lastSeenAt
 */
export const handler = define.middleware(async (ctx) => {
  try {
    const session = await auth.api.getSession({ headers: ctx.req.headers });

    if (session?.user) {
      const { id, email, name, image } = session.user;

      // Check if user exists in KV
      let user = await getUserById(id);

      // Extract provider info from cookie
      const cookies = ctx.req.headers.get("cookie") || "";
      const providerMatch = cookies.match(
        /better-auth\.account_data=([^;]+)/,
      );
      let providerId = "unknown";
      let providerAccountId = id; // Default to user ID

      if (providerMatch) {
        try {
          let cookieValue = decodeURIComponent(providerMatch[1]);
          // Better Auth cookies have a signature after the JSON: {json}.signature
          // Remove the signature part if it exists
          const signatureIndex = cookieValue.lastIndexOf(".");
          if (signatureIndex > 0 && cookieValue[0] === "{") {
            // Find the matching closing brace
            let braceCount = 0;
            for (let i = 0; i < cookieValue.length; i++) {
              if (cookieValue[i] === "{") braceCount++;
              if (cookieValue[i] === "}") braceCount--;
              if (braceCount === 0) {
                cookieValue = cookieValue.substring(0, i + 1);
                break;
              }
            }
          }
          const accountData = JSON.parse(cookieValue);
          providerId = accountData?.providerId || "unknown";
          providerAccountId = accountData?.accountId || id;
        } catch {
          // Ignore parse errors
        }
      }

      if (!user) {
        // First login OR new provider for existing email - create or link
        user = await createUserFromOAuth({
          id,
          email,
          name: name || email.split("@")[0],
          image: image || undefined,
          providerId,
          providerAccountId,
        });
      } else {
        // Check if this provider is already linked
        const alreadyLinked = user.providers.some(
          (p) =>
            p.providerId === providerId && p.accountId === providerAccountId,
        );

        if (!alreadyLinked) {
          // Link new provider to existing user
          user.providers.push({
            providerId,
            accountId: providerAccountId,
            linkedAt: new Date(),
          });
          await getUserById(id); // Force reload to update reference
          const { saveUser } = await import("@/db/repositories/userRepo.ts");
          await saveUser(user);
        }

        // Update lastSeenAt
        await updateLastSeen(id);
      }

      // Attach user to context
      ctx.state.user = user;
    }
  } catch (error) {
    console.error("Auth sync error:", error);
    // Don't block requests if sync fails
  }

  return await ctx.next();
});

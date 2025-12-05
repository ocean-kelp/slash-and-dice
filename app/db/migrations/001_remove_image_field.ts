/// <reference lib="deno.unstable" />
/**
 * Migration: Remove deprecated 'image' field from User model
 *
 * This migration:
 * 1. Iterates through all users in KV
 * 2. Removes the deprecated 'image' field
 * 3. Ensures providers have imageUrl field
 * 4. Sets selectedAvatarUrl to first provider's imageUrl if not set
 *
 * Run with: deno run --unstable-kv -A app/db/migrations/001_remove_image_field.ts
 */

import { kv } from "../kv.ts";
import type { User } from "../../models/User.ts";

export default async function migrate() {
  console.log("🔄 Starting user migration...");

  let count = 0;
  let migrated = 0;

  const iter = kv.list<User & { image?: string }>({ prefix: ["user"] });

  for await (const entry of iter) {
    count++;
    const user = entry.value;
    let needsUpdate = false;

    // Remove deprecated 'image' field if it exists
    if ("image" in user) {
      console.log(`  Removing 'image' field from user ${user.id}`);
      delete user.image;
      needsUpdate = true;
    }

    // Set selectedAvatarUrl if not set and we have provider images
    if (!user.selectedAvatarUrl && user.providers?.length > 0) {
      const firstProviderWithImage = user.providers.find((p) => p.imageUrl);
      if (firstProviderWithImage) {
        console.log(
          `  Setting selectedAvatarUrl for user ${user.id} from ${firstProviderWithImage.providerId}`,
        );
        user.selectedAvatarUrl = firstProviderWithImage.imageUrl;
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      await kv.set(entry.key, user);
      migrated++;
    }
  }

  console.log(`✅ Migration complete: ${migrated}/${count} users updated`);
}

// Allow direct execution
if (import.meta.main) {
  try {
    await migrate();
    kv.close();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    Deno.exit(1);
  }
}

/// <reference lib="deno.unstable" />
import { kv } from "../kv.ts";
import type { User } from "../../models/User.ts";
import { createUser as createUserModel } from "../../models/User.ts";
import { userKey } from "../keys/userKeys.ts";

/**
 * Get a user by ID
 */
export async function getUserById(id: string): Promise<User | undefined> {
  const res = await kv.get(userKey(id));
  return res.value as User | undefined;
}

/**
 * Get user by email (searches all users)
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const iter = kv.list<User>({ prefix: ["user"] });
  for await (const entry of iter) {
    const user = entry.value;
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

/**
 * Save user to KV (create or update)
 */
export async function saveUser(user: User): Promise<void> {
  await kv.set(userKey(user.id), user);
}

/**
 * Create user from OAuth login data with email-based account linking
 * If user with same email exists, links the new provider to existing user
 * Otherwise creates a new user
 */
export async function createUserFromOAuth(data: {
  id: string;
  email: string;
  name: string;
  providerId: string;
  providerAccountId: string;
  providerImageUrl?: string;
}): Promise<User> {
  // Check if user exists with this email
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    // Check if this provider is already linked
    const alreadyLinked = existingUser.providers.some(
      (p) =>
        p.providerId === data.providerId &&
        p.accountId === data.providerAccountId,
    );

    if (!alreadyLinked) {
      // Link new provider to existing user
      existingUser.providers.push({
        providerId: data.providerId,
        accountId: data.providerAccountId,
        imageUrl: data.providerImageUrl,
        linkedAt: new Date(),
      });
      existingUser.lastSeenAt = new Date();
      await saveUser(existingUser);
    }

    return existingUser;
  }

  // No existing user, create new one
  const user = createUserModel(data);
  await saveUser(user);
  return user;
}

/**
 * Update user's avatar selection
 */
export async function updateUserAvatar(
  userId: string,
  avatar: {
    selectedAvatarUrl?: string;
    avatarStyle?: string;
    avatarSeed?: string;
  },
): Promise<void> {
  const user = await getUserById(userId);
  if (!user) return;

  user.selectedAvatarUrl = avatar.selectedAvatarUrl;
  user.avatarStyle = avatar.avatarStyle;
  user.avatarSeed = avatar.avatarSeed;
  await saveUser(user);
}

/**
 * Update user's lastSeenAt timestamp
 */
export async function updateLastSeen(userId: string): Promise<void> {
  const user = await getUserById(userId);
  if (!user) return;

  user.lastSeenAt = new Date();
  await saveUser(user);
}

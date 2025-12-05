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
 * Save user to KV (create or update)
 */
export async function saveUser(user: User): Promise<void> {
  await kv.set(userKey(user.id), user);
}

/**
 * Create user from OAuth login data
 */
export async function createUserFromOAuth(data: {
  id: string;
  email: string;
  name: string;
  image?: string;
  providerId: string;
}): Promise<User> {
  const user = createUserModel(data);
  await saveUser(user);
  return user;
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

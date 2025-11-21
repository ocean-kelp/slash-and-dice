/// <reference lib="deno.unstable" />
import { kv } from "../kv.ts";
import type { User } from "../../models/User.ts";
import {
  userByEmailKey,
  userByUsernameKey,
  userKey,
  userListSelector,
} from "../keys/user.ts";

/** Get a user by id (id = username in this simple example) */
export async function getUserById(id: string): Promise<User | undefined> {
  const res = await kv.get(userKey(id));
  return res.value as User | undefined;
}

/** Get a user by username (via secondary index) */
export async function getUserByUsername(
  username: string,
): Promise<User | undefined> {
  const idRes = await kv.get(userByUsernameKey(username));
  const id = idRes.value as string | undefined;
  if (!id) return undefined;
  return getUserById(id);
}

/** Get a user by email (via secondary index) */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const idRes = await kv.get(userByEmailKey(email));
  const id = idRes.value as string | undefined;
  if (!id) return undefined;
  return getUserById(id);
}

/** Create a user atomically. Uses username as id for simplicity. */
export async function createUser(user: User): Promise<void> {
  const id = user.username;
  const key = userKey(id);

  // Ensure username and email are unique: check their index keys are empty
  const tx = kv.atomic();
  tx.check({ key: userByUsernameKey(user.username), versionstamp: null });
  tx.check({ key: userByEmailKey(user.email), versionstamp: null });
  tx.set(key, user);
  tx.set(userByUsernameKey(user.username), id);
  tx.set(userByEmailKey(user.email), id);

  const res = await tx.commit();
  if (!res.ok) {
    throw new Error(
      "createUser: transaction failed (username or email already exists)",
    );
  }
}

/** Delete a user and its indices */
export async function deleteUser(id: string): Promise<void> {
  const user = await getUserById(id);
  if (!user) return;

  const tx = kv.atomic();
  tx.delete(userKey(id));
  tx.delete(userByUsernameKey(user.username));
  tx.delete(userByEmailKey(user.email));
  await tx.commit();
}

/** List users using the prefix selector. Returns an array of users and the next cursor (if any). */
export async function listUsers(limit = 20) {
  // Use the prefix selector from keys. Limit is enforced client-side to avoid selector typing issues.
  const iter = kv.list(userListSelector);
  const out: User[] = [];
  let i = 0;
  for await (const e of iter) {
    out.push(e.value as User);
    i++;
    if (i >= limit) break;
  }
  return out;
}

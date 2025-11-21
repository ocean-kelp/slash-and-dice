/// <reference lib="deno.unstable" />
// Key helpers for the User entity.
// Keep key-building logic here so repositories and migrations import the same keys.

export const userPrefix = ["user"] as const;

export const userKey = (id: string): Deno.KvKey =>
  [...userPrefix, id] as Deno.KvKey;

export const userByUsernameKey = (username: string): Deno.KvKey =>
  [
    "user_by_username",
    username,
  ] as Deno.KvKey;

export const userByEmailKey = (email: string): Deno.KvKey =>
  ["user_by_email", email] as Deno.KvKey;

export const userListSelector: Deno.KvListSelector = { prefix: userPrefix };

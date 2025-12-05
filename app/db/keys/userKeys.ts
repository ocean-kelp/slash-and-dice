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

// OAuth Account keys
export const oauthAccountPrefix = ["oauth_account"] as const;

export const oauthAccountKey = (id: string): Deno.KvKey =>
  [...oauthAccountPrefix, id] as Deno.KvKey;

// Index: Find user by OAuth provider + provider account ID
export const oauthAccountByProviderKey = (
  providerId: string,
  providerAccountId: string,
): Deno.KvKey =>
  ["oauth_by_provider", providerId, providerAccountId] as Deno.KvKey;

// Index: Find all OAuth accounts for a user
export const oauthAccountsByUserKey = (userId: string): Deno.KvKey =>
  ["oauth_by_user", userId] as Deno.KvKey;

export const oauthAccountListSelector: Deno.KvListSelector = {
  prefix: oauthAccountPrefix,
};

import type { SocialAccount } from "./SocialPlatform.ts";
import type { AuthProviderId } from "./AuthProvider.ts";

// Re-export for convenience
export type { SocialAccount } from "./SocialPlatform.ts";
export type { AuthProviderId } from "./AuthProvider.ts";

// Basic User model used across the app.
export interface User {
  /** Unique user identifier */
  id: string;
  firstName: string;
  lastName: string;
  /** Optional avatar/icon URL */
  iconUrl?: string;
  /** Unique username */
  username: string;
  /** Contact email */
  email: string;
  /** Linked social accounts */
  socialAccounts: SocialAccount[];
  /** OAuth provider used for signup (e.g., "line") */
  authProviderId?: AuthProviderId;
  /** OAuth channel used for signup (e.g., "line-jp") */
  authChannelId?: string;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/** Return the user's full name. */
export function fullName(user: User) {
  return `${user.firstName} ${user.lastName}`.trim();
}

/** Simple email validation. Not exhaustive, but good for quick checks. */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/** Create a User from a partial payload. Throws on validation failure. */
export function createUser(data: {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  iconUrl?: string;
  socialAccounts?: SocialAccount[];
  authProviderId?: AuthProviderId;
  authChannelId?: string;
}): User {
  if (!validateEmail(data.email)) {
    throw new Error("Invalid email");
  }

  const now = new Date();
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    iconUrl: data.iconUrl,
    socialAccounts: data.socialAccounts ?? [],
    authProviderId: data.authProviderId,
    authChannelId: data.authChannelId,
    createdAt: now,
    updatedAt: now,
  };
}

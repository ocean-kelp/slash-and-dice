// Supported social platforms
export type SocialPlatform =
  | "twitter"
  | "discord"
  | "youtube"
  | "twitch"
  | "instagram"
  | "tiktok"
  | "github"
  | "bluesky";

// Supported OAuth providers for authentication
export type AuthProvider =
  | "discord"
  | "kakao"
  | "line"
  | "google"
  | "wechat";

// Unified social account structure
export interface SocialAccount {
  /** Social platform identifier */
  platform: SocialPlatform;
  /** Display handle (e.g., "@john", "john#1234") */
  username: string;
  /** Full profile URL (optional, can be generated from platform + username) */
  url?: string;
  /** True if user authenticated with this provider */
  verified?: boolean;
}

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
  /** OAuth provider used for signup */
  authProvider?: AuthProvider;
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
  authProvider?: AuthProvider;
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
    authProvider: data.authProvider,
    createdAt: now,
    updatedAt: now,
  };
}

// Linked OAuth provider info
export interface LinkedProvider {
  providerId: string; // "google", "discord", "line-jp", etc.
  accountId: string; // Provider's unique ID for this user
  imageUrl?: string; // Avatar URL from this provider
  linkedAt: Date; // When this provider was linked
}

// Basic User model used across the app.
export interface User {
  /** Unique user identifier (generated on first signup) */
  id: string;
  /** Contact email */
  email: string;
  /** User's display name */
  name: string;
  /** List of linked OAuth providers */
  providers: LinkedProvider[];
  /** User's chosen avatar URL (can be from provider or DiceBear) */
  selectedAvatarUrl?: string;
  /** DiceBear style if using generated avatar */
  avatarStyle?: string;
  /** DiceBear seed if using generated avatar */
  avatarSeed?: string;
  /** Account creation timestamp */
  createdAt: Date;
  /** Last seen/active timestamp */
  lastSeenAt: Date;
}

/** Create a User from OAuth login data. */
export function createUser(data: {
  id: string;
  email: string;
  name: string;
  providerId: string;
  providerAccountId: string;
  providerImageUrl?: string;
}): User {
  const now = new Date();
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    providers: [{
      providerId: data.providerId,
      accountId: data.providerAccountId,
      imageUrl: data.providerImageUrl,
      linkedAt: now,
    }],
    createdAt: now,
    lastSeenAt: now,
  };
}

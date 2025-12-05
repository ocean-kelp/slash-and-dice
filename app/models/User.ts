// Linked OAuth provider info
export interface LinkedProvider {
  providerId: string; // "google", "discord", "line-jp", etc.
  accountId: string; // Provider's unique ID for this user
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
  /** Optional avatar/icon URL */
  image?: string;
  /** List of linked OAuth providers */
  providers: LinkedProvider[];
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
  image?: string;
  providerId: string;
  providerAccountId: string;
}): User {
  const now = new Date();
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    image: data.image,
    providers: [{
      providerId: data.providerId,
      accountId: data.providerAccountId,
      linkedAt: now,
    }],
    createdAt: now,
    lastSeenAt: now,
  };
}

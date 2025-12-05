// Basic User model used across the app.
export interface User {
  /** Unique user identifier (from OAuth provider) */
  id: string;
  /** Contact email */
  email: string;
  /** User's display name */
  name: string;
  /** Optional avatar/icon URL */
  image?: string;
  /** OAuth provider used for signup (e.g., "google", "discord") */
  providerId: string;
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
}): User {
  const now = new Date();
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    image: data.image,
    providerId: data.providerId,
    createdAt: now,
    lastSeenAt: now,
  };
}

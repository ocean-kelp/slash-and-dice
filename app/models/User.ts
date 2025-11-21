// Basic User model used across the app.
export interface User {
  firstName: string;
  lastName: string;
  /** Optional avatar/icon URL */
  iconUrl?: string;
  /** Unique username */
  username: string;
  /** Contact email */
  email: string;
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
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  iconUrl?: string;
}): User {
  if (!validateEmail(data.email)) {
    throw new Error("Invalid email");
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    iconUrl: data.iconUrl,
  };
}

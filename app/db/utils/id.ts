/**
 * Generate a unique ID using crypto.randomUUID().
 * Returns a standard UUID v4 string.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

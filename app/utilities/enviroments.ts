// Environment utilities
// Returns true if running in a browser (client-side)
export function isClient(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

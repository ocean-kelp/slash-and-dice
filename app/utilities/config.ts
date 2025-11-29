// Server-side configuration utilities
// This file handles environment variable access ONLY
// For auth provider setup, see auth-providers.ts

import { isClient } from "./enviroments.ts";

/**
 * Throws an error if called from client-side code.
 * Use this to guard server-only operations.
 */
function assertServer(operation: string): void {
  if (isClient()) {
    throw new Error(
      `[Config Error] "${operation}" can only be accessed on the server side.`,
    );
  }
}

/**
 * Gets an environment variable value.
 * Throws if called on client-side or if the variable is not set (unless optional).
 */
export function getEnv(key: string, required = true): string {
  assertServer(`getEnv(${key})`);

  const value = Deno.env.get(key);

  if (!value && required) {
    throw new Error(
      `[Config Error] Missing required environment variable: ${key}`,
    );
  }

  return value ?? "";
}

/**
 * Checks if an environment variable has a non-empty value.
 */
export function hasEnv(key: string): boolean {
  assertServer(`hasEnv(${key})`);
  const value = Deno.env.get(key);
  return !!value && value.trim() !== "";
}

/**
 * Core application configuration - only env vars
 */
export const appConfig = {
  /** Better Auth secret for signing tokens */
  get authSecret() {
    return getEnv("BETTER_AUTH_SECRET");
  },
  /** Base URL for auth callbacks */
  get authBaseUrl() {
    return getEnv("BETTER_AUTH_URL", false) || "http://localhost:8000";
  },
};

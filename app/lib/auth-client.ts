import { createAuthClient } from "better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";
import { isClient } from "@/utilities/enviroments.ts";
import { appConfig } from "@/utilities/config.ts";

/**
 * Get the auth client base URL
 * - Client-side: uses the current browser origin (e.g., http://localhost:5173)
 * - Server-side: uses the BETTER_AUTH_URL env var via appConfig
 */
function getBaseURL(): string {
  if (isClient()) {
    return globalThis.location.origin;
  }
  // Server-side: use env var from config
  return appConfig.authBaseUrl;
}

/**
 * Auth client for browser-side authentication
 * Uses genericOAuthClient plugin to support LINE multi-channel and WeChat
 */
export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [genericOAuthClient()],
});

/**
 * Sign in with a social provider
 * For LINE, use the country-specific providerId (e.g., "line-jp", "line-th", "line-tw", "line-id")
 * For other providers, use the base providerId (e.g., "discord", "google", "kakao", "wechat")
 */
export async function signInWithProvider(providerId: string) {
  return await authClient.signIn.social({
    provider: providerId,
  });
}

/**
 * Sign out the current user
 */
export async function signOut() {
  return await authClient.signOut();
}

/**
 * Get the current session
 */
export async function getSession() {
  return await authClient.getSession();
}

// Re-export types for convenience
export type { Session, User } from "better-auth/types";

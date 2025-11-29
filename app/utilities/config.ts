// Server-side configuration utilities
// This file should ONLY be imported from server-side code (routes, middlewares, services)

import { isClient } from "./enviroments.ts";
import type { AuthProvider } from "@/models/User.ts";

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
 * Auth provider credentials - only accessible server-side
 */
export const authConfig = {
  get secret() {
    return getEnv("BETTER_AUTH_SECRET");
  },
  get baseUrl() {
    return getEnv("BETTER_AUTH_URL", false) || "http://localhost:8000";
  },

  discord: {
    get clientId() {
      return getEnv("DISCORD_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("DISCORD_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("DISCORD_CLIENT_ID") && hasEnv("DISCORD_CLIENT_SECRET");
    },
  },

  google: {
    get clientId() {
      return getEnv("GOOGLE_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("GOOGLE_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("GOOGLE_CLIENT_ID") && hasEnv("GOOGLE_CLIENT_SECRET");
    },
  },

  kakao: {
    get clientId() {
      return getEnv("KAKAO_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("KAKAO_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("KAKAO_CLIENT_ID") && hasEnv("KAKAO_CLIENT_SECRET");
    },
  },

  line: {
    get clientId() {
      return getEnv("LINE_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("LINE_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("LINE_CLIENT_ID") && hasEnv("LINE_CLIENT_SECRET");
    },
  },

  wechat: {
    get clientId() {
      return getEnv("WECHAT_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("WECHAT_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("WECHAT_CLIENT_ID") && hasEnv("WECHAT_CLIENT_SECRET");
    },
  },
};

/**
 * Returns a list of configured auth providers.
 * Use this to pass to client-side components.
 */
export function getAvailableAuthProviders(): AuthProvider[] {
  assertServer("getAvailableAuthProviders");

  const providers: AuthProvider[] = [];

  if (authConfig.discord.isConfigured) providers.push("discord");
  if (authConfig.google.isConfigured) providers.push("google");
  if (authConfig.kakao.isConfigured) providers.push("kakao");
  if (authConfig.line.isConfigured) providers.push("line");
  if (authConfig.wechat.isConfigured) providers.push("wechat");

  return providers;
}

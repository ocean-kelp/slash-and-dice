// Auth provider configuration and utilities
// This file handles auth provider setup and channel selection logic

import type { AuthProviderId } from "@/models/AuthProvider.ts";
import { hasEnv, getEnv } from "./config.ts";

/** Regional provider configuration */
export interface RegionalProviderConfig {
  clientId: string;
  clientSecret: string;
  isConfigured: boolean;
}

/** Helper to create regional provider config */
function createRegionalConfig(
  base: string,
  region: string,
): RegionalProviderConfig {
  const prefix = `${base.toUpperCase()}_${region.toUpperCase()}`;
  return {
    get clientId() {
      return getEnv(`${prefix}_CLIENT_ID`);
    },
    get clientSecret() {
      return getEnv(`${prefix}_CLIENT_SECRET`);
    },
    get isConfigured() {
      return hasEnv(`${prefix}_CLIENT_ID`) && hasEnv(`${prefix}_CLIENT_SECRET`);
    },
  };
}

/** Regions for LINE */
export type LineRegion = "jp" | "th" | "tw" | "id";
/** Regions for WeChat */
export type WeChatRegion = "cn";

/** Regions that can have regional providers */
export const LINE_REGIONS: LineRegion[] = ["jp", "th", "tw", "id"];
export const WECHAT_REGIONS: WeChatRegion[] = ["cn"];

/**
 * Auth provider credentials configuration
 * Supports both base providers and regional variants
 */
export const authProviders = {
  // Simple providers (no regional variants)
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

  // LINE - regional channels only (no base LINE, JP is global default)
  line: {
    // Regional channels - JP serves as global default
    jp: createRegionalConfig("LINE", "jp"),
    th: createRegionalConfig("LINE", "th"),
    tw: createRegionalConfig("LINE", "tw"),
    id: createRegionalConfig("LINE", "id"),
    /** Check if any LINE channel is configured */
    get isConfigured() {
      return LINE_REGIONS.some((region) => this[region]?.isConfigured);
    },
  },

  // WeChat - regional variants
  wechat: {
    // Base WeChat (fallback if no regional)
    get clientId() {
      return getEnv("WECHAT_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("WECHAT_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("WECHAT_CLIENT_ID") && hasEnv("WECHAT_CLIENT_SECRET");
    },
    // Regional channels
    cn: createRegionalConfig("WECHAT", "cn"),
  },
};

/**
 * Returns a list of configured auth provider IDs.
 * Includes base providers only (e.g., "line", not "line-jp").
 * Channel selection happens at auth time based on user's country.
 */
export function getAvailableAuthProviders(): AuthProviderId[] {
  const providers: AuthProviderId[] = [];

  // Check simple providers
  if (authProviders.discord.isConfigured) providers.push("discord");
  if (authProviders.google.isConfigured) providers.push("google");
  if (authProviders.kakao.isConfigured) providers.push("kakao");

  // Check LINE - include if any channel is configured
  const hasLineChannels = LINE_REGIONS.some(
    (region) => authProviders.line[region]?.isConfigured
  );
  if (hasLineChannels) {
    providers.push("line");
  }

  // Check WeChat - include if any channel (base or regional) is configured
  const hasWechatChannels =
    authProviders.wechat.isConfigured ||
    WECHAT_REGIONS.some((region) => authProviders.wechat[region]?.isConfigured);
  if (hasWechatChannels) {
    providers.push("wechat");
  }

  return providers;
}

/**
 * Check if a specific regional channel is configured for LINE
 */
export function isLineChannelConfigured(region: LineRegion): boolean {
  return authProviders.line[region]?.isConfigured ?? false;
}

/**
 * Check if a specific regional channel is configured for WeChat
 */
export function isWeChatChannelConfigured(region: WeChatRegion): boolean {
  return authProviders.wechat[region]?.isConfigured ?? false;
}

/**
 * Get configured LINE regions
 */
export function getConfiguredLineRegions(): LineRegion[] {
  return LINE_REGIONS.filter((region) => authProviders.line[region]?.isConfigured);
}

/**
 * Get configured WeChat regions
 */
export function getConfiguredWeChatRegions(): WeChatRegion[] {
  return WECHAT_REGIONS.filter((region) => authProviders.wechat[region]?.isConfigured);
}

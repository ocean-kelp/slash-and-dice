// Auth provider configuration and utilities
// This file handles auth provider setup and channel selection logic

import type { AuthProviderId, AuthProvider } from "@/models/AuthProvider.ts";
import type { AuthChannel } from "@/models/AuthChannel.ts";
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

/** Countries for LINE */
export type LineCountry = "jp" | "th" | "tw" | "id";
/** Countries for WeChat */
export type WeChatCountry = "cn";

/** Countries that can have LINE channels */
export const LINE_COUNTRIES: LineCountry[] = ["jp", "th", "tw", "id"];
export const WECHAT_COUNTRIES: WeChatCountry[] = ["cn"];

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

  // LINE - country-specific channels (JP, TH, TW, ID)
  line: {
    jp: createRegionalConfig("LINE", "jp"),
    th: createRegionalConfig("LINE", "th"),
    tw: createRegionalConfig("LINE", "tw"),
    id: createRegionalConfig("LINE", "id"),
    /** Check if any LINE channel is configured */
    get isConfigured() {
      return LINE_COUNTRIES.some((country) => this[country]?.isConfigured);
    },
  },

  // WeChat - country-specific channels
  wechat: {
    // Base WeChat (fallback if no country-specific)
    get clientId() {
      return getEnv("WECHAT_CLIENT_ID");
    },
    get clientSecret() {
      return getEnv("WECHAT_CLIENT_SECRET");
    },
    get isConfigured() {
      return hasEnv("WECHAT_CLIENT_ID") && hasEnv("WECHAT_CLIENT_SECRET");
    },
    // Country-specific channels
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

  // Check LINE - include if any country channel is configured
  const hasLineChannels = LINE_COUNTRIES.some(
    (country) => authProviders.line[country]?.isConfigured
  );
  if (hasLineChannels) {
    providers.push("line");
  }

  // Check WeChat - include if any channel (base or country-specific) is configured
  const hasWechatChannels =
    authProviders.wechat.isConfigured ||
    WECHAT_COUNTRIES.some((country) => authProviders.wechat[country]?.isConfigured);
  if (hasWechatChannels) {
    providers.push("wechat");
  }

  return providers;
}

/**
 * Check if a specific country channel is configured for LINE
 */
export function isLineChannelConfigured(country: LineCountry): boolean {
  return authProviders.line[country]?.isConfigured ?? false;
}

/**
 * Check if a specific country channel is configured for WeChat
 */
export function isWeChatChannelConfigured(country: WeChatCountry): boolean {
  return authProviders.wechat[country]?.isConfigured ?? false;
}

/**
 * Get configured LINE countries
 */
export function getConfiguredLineCountries(): LineCountry[] {
  return LINE_COUNTRIES.filter((country) => authProviders.line[country]?.isConfigured);
}

/**
 * Get configured WeChat countries
 */
export function getConfiguredWeChatCountries(): WeChatCountry[] {
  return WECHAT_COUNTRIES.filter((country) => authProviders.wechat[country]?.isConfigured);
}

/**
 * Returns full AuthProvider objects with their configured channels.
 * This is used by the UI to show providers and their channel options.
 */
export function getAvailableAuthProvidersWithChannels(): AuthProvider[] {
  const providers: AuthProvider[] = [];

  // Discord - single channel provider
  if (authProviders.discord.isConfigured) {
    providers.push({
      id: "discord",
      labelKey: "common.header.userOptions.signInDiscord",
      icon: "/svg/discord.svg",
      channels: [{ id: "default", labelKey: "common.auth.channels.default", isDefault: true }],
      hasMultipleChannels: false,
    });
  }

  // Google - single channel provider
  if (authProviders.google.isConfigured) {
    providers.push({
      id: "google",
      labelKey: "common.header.userOptions.signInGoogle",
      icon: "/svg/google.svg",
      channels: [{ id: "default", labelKey: "common.auth.channels.default", isDefault: true }],
      hasMultipleChannels: false,
    });
  }

  // Kakao - single channel provider
  if (authProviders.kakao.isConfigured) {
    providers.push({
      id: "kakao",
      labelKey: "common.header.userOptions.signInKakao",
      icon: "/svg/kakao.svg",
      channels: [{ id: "default", labelKey: "common.auth.channels.default", isDefault: true }],
      hasMultipleChannels: false,
    });
  }

  // LINE - multi-channel provider (country-specific)
  const lineChannels: AuthChannel[] = LINE_COUNTRIES
    .filter((country) => authProviders.line[country]?.isConfigured)
    .map((country, index) => ({
      id: country,
      labelKey: `common.auth.channels.line.${country}`,
      isDefault: index === 0, // First configured channel is default
    }));
  
  if (lineChannels.length > 0) {
    providers.push({
      id: "line",
      labelKey: "common.header.userOptions.signInLine",
      icon: "/svg/line.svg",
      channels: lineChannels,
      hasMultipleChannels: lineChannels.length > 1,
    });
  }

  // WeChat - can have base + country-specific channels
  const wechatChannels: AuthChannel[] = [];
  
  // Add base WeChat if configured
  if (authProviders.wechat.isConfigured) {
    wechatChannels.push({
      id: "default",
      labelKey: "common.auth.channels.wechat.default",
      isDefault: true,
    });
  }
  
  // Add country-specific WeChat channels
  WECHAT_COUNTRIES.forEach((country) => {
    if (authProviders.wechat[country]?.isConfigured) {
      wechatChannels.push({
        id: country,
        labelKey: `common.auth.channels.wechat.${country}`,
        isDefault: wechatChannels.length === 0, // Default if no base channel
      });
    }
  });

  if (wechatChannels.length > 0) {
    providers.push({
      id: "wechat",
      labelKey: "common.header.userOptions.signInWechat",
      icon: "/svg/wechat.svg",
      channels: wechatChannels,
      hasMultipleChannels: wechatChannels.length > 1,
    });
  }

  return providers;
}

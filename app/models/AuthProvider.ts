import type { AuthChannel } from "./AuthChannel.ts";

// Supported auth provider types
export type AuthProviderId =
  | "discord"
  | "kakao"
  | "line"
  | "google"
  | "wechat";

/**
 * An auth provider represents a social login service (Discord, LINE, etc.)
 * Each provider can have one or more channels for different regions.
 */
export interface AuthProvider {
  /** Provider identifier */
  id: AuthProviderId;
  /** Display name i18n key */
  labelKey: string;
  /** Icon path */
  icon: string;
  /** Available channels for this provider */
  channels: AuthChannel[];
  /** Whether this provider has multiple channels (shows channel picker) */
  hasMultipleChannels: boolean;
}

/** Check if a provider needs channel selection UI */
export function needsChannelSelection(provider: AuthProvider): boolean {
  return provider.hasMultipleChannels && provider.channels.length > 1;
}

/** Get the default channel for a provider */
export function getDefaultChannel(provider: AuthProvider): AuthChannel | undefined {
  return provider.channels.find((c) => c.isDefault);
}

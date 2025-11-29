// Supported social platforms for user profile display
export type SocialPlatform =
  | "twitter"
  | "discord"
  | "youtube"
  | "twitch"
  | "instagram"
  | "tiktok"
  | "github"
  | "bluesky";

// Unified social account structure
export interface SocialAccount {
  /** Social platform identifier */
  platform: SocialPlatform;
  /** Display handle (e.g., "@john", "john#1234") */
  username: string;
  /** Full profile URL (optional, can be generated from platform + username) */
  url?: string;
  /** True if user authenticated with this provider */
  verified?: boolean;
}

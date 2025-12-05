import { betterAuth } from "better-auth";
import { genericOAuth, line } from "better-auth/plugins";
import { appConfig } from "@/utilities/config.ts";
import { authProviders } from "@/utilities/auth-providers.ts";

// Build LINE channel configs using the line() helper for multi-channel support
const lineConfigs = [
  // Japan channel
  ...(authProviders.line.jp.isConfigured
    ? [
      line({
        providerId: "line-jp",
        clientId: authProviders.line.jp.clientId,
        clientSecret: authProviders.line.jp.clientSecret,
      }),
    ]
    : []),
  // Thailand channel
  ...(authProviders.line.th.isConfigured
    ? [
      line({
        providerId: "line-th",
        clientId: authProviders.line.th.clientId,
        clientSecret: authProviders.line.th.clientSecret,
      }),
    ]
    : []),
  // Taiwan channel
  ...(authProviders.line.tw.isConfigured
    ? [
      line({
        providerId: "line-tw",
        clientId: authProviders.line.tw.clientId,
        clientSecret: authProviders.line.tw.clientSecret,
      }),
    ]
    : []),
  // Indonesia channel
  ...(authProviders.line.id.isConfigured
    ? [
      line({
        providerId: "line-id",
        clientId: authProviders.line.id.clientId,
        clientSecret: authProviders.line.id.clientSecret,
      }),
    ]
    : []),
];

// Combine all generic OAuth configs
const genericOAuthConfigs = [...lineConfigs];

export const auth = betterAuth({
  secret: appConfig.authSecret,
  baseURL: appConfig.authBaseUrl,
  trustedOrigins: appConfig.authTrustedOrigins,

  // Session configuration - 90 days for fan community app (stateless mode)
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 90 * 24 * 60 * 60, // 90 days cache duration
      strategy: "jwe", // Encrypted JSON Web Encryption
      refreshCache: true, // Enable stateless refresh
    },
  },

  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie
  },

  socialProviders: {
    // Discord
    ...(authProviders.discord.isConfigured && {
      discord: {
        clientId: authProviders.discord.clientId,
        clientSecret: authProviders.discord.clientSecret,
      },
    }),

    // Google
    ...(authProviders.google.isConfigured && {
      google: {
        clientId: authProviders.google.clientId,
        clientSecret: authProviders.google.clientSecret,
      },
    }),

    // Kakao
    ...(authProviders.kakao.isConfigured && {
      kakao: {
        clientId: authProviders.kakao.clientId,
        clientSecret: authProviders.kakao.clientSecret,
      },
    }),
    // Note: LINE is now handled via genericOAuth plugin for multi-channel support
  },

  plugins: [
    // LINE multi-channel
    ...(genericOAuthConfigs.length > 0
      ? [genericOAuth({ config: genericOAuthConfigs })]
      : []),
  ],
});

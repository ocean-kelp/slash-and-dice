import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { appConfig } from "@/utilities/config.ts";
import { authProviders } from "@/utilities/auth-providers.ts";

export const auth = betterAuth({
  secret: appConfig.authSecret,
  baseURL: appConfig.authBaseUrl,

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

    // LINE - Japan (global default)
    ...(authProviders.line.jp.isConfigured && {
      line: {
        clientId: authProviders.line.jp.clientId,
        clientSecret: authProviders.line.jp.clientSecret,
      },
    }),

    // LINE - Thailand
    ...(authProviders.line.th.isConfigured && {
      "line-th": {
        clientId: authProviders.line.th.clientId,
        clientSecret: authProviders.line.th.clientSecret,
      },
    }),

    // LINE - Taiwan
    ...(authProviders.line.tw.isConfigured && {
      "line-tw": {
        clientId: authProviders.line.tw.clientId,
        clientSecret: authProviders.line.tw.clientSecret,
      },
    }),

    // LINE - Indonesia
    ...(authProviders.line.id.isConfigured && {
      "line-id": {
        clientId: authProviders.line.id.clientId,
        clientSecret: authProviders.line.id.clientSecret,
      },
    }),
  },

  plugins: [
    // WeChat via Generic OAuth (not natively supported by Better Auth)
    ...(authProviders.wechat.isConfigured
      ? [
          genericOAuth({
            config: [
              {
                providerId: "wechat",
                clientId: authProviders.wechat.clientId,
                clientSecret: authProviders.wechat.clientSecret,
                authorizationUrl: "https://open.weixin.qq.com/connect/qrconnect",
                tokenUrl: "https://api.weixin.qq.com/sns/oauth2/access_token",
                scopes: ["snsapi_login"],
                // WeChat uses 'appid' instead of 'client_id'
                authorizationUrlParams: {
                  appid: authProviders.wechat.clientId,
                },
              },
            ],
          }),
        ]
      : []),
  ],
});

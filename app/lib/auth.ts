import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { authConfig } from "@/utilities/config.ts";

export const auth = betterAuth({
  secret: authConfig.secret,
  baseURL: authConfig.baseUrl,

  socialProviders: {
    discord: {
      clientId: authConfig.discord.clientId,
      clientSecret: authConfig.discord.clientSecret,
    },
    google: {
      clientId: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
    },
    kakao: {
      clientId: authConfig.kakao.clientId,
      clientSecret: authConfig.kakao.clientSecret,
    },
    line: {
      clientId: authConfig.line.clientId,
      clientSecret: authConfig.line.clientSecret,
    },
  },

  plugins: [
    // WeChat via Generic OAuth (not natively supported)
    genericOAuth({
      config: [
        {
          providerId: "wechat",
          clientId: authConfig.wechat.clientId,
          clientSecret: authConfig.wechat.clientSecret,
          authorizationUrl: "https://open.weixin.qq.com/connect/qrconnect",
          tokenUrl: "https://api.weixin.qq.com/sns/oauth2/access_token",
          scopes: ["snsapi_login"],
          // WeChat uses 'appid' instead of 'client_id'
          authorizationUrlParams: {
            appid: authConfig.wechat.clientId,
          },
        },
      ],
    }),
  ],
});

import { createDefine } from "fresh";
import type { TranslationState } from "./custom-i18n/types.ts";
import type { AuthProviderId } from "@/models/AuthProvider.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State extends TranslationState {
  shared: string;
  /** Available auth providers based on configured credentials */
  availableAuthProviders?: AuthProviderId[];
}

export const define = createDefine<State>();

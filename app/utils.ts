import { createDefine } from "fresh";
import type { TranslationState } from "./custom-i18n/types.ts";
import type { AuthProvider } from "@/models/AuthProvider.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State extends TranslationState {
  shared: string;
  /** Available auth providers with their configured channels */
  availableAuthProviders?: AuthProvider[];
}

export const define = createDefine<State>();

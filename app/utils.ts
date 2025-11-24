import { createDefine } from "fresh";
import type { TranslationState } from "./custom-i18n/types.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State extends TranslationState {
  shared: string;
}

export const define = createDefine<State>();

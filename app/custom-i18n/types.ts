import type { TranslationConfig } from "./translator.ts";

export interface TranslationState extends Record<string, unknown> {
  translationData: Record<string, unknown>;
  translationConfig: TranslationConfig;
  path: string;
  locale: string;
  t: (key: string) => string;
}

export interface FreshContext<State> {
  req: Request;
  state: State;
  next: () => Promise<Response | void>;
}

export type MiddlewareFn<State> = (
  ctx: FreshContext<State>,
) => Response | Promise<Response | void>;

export interface I18nOptions {
  languages: string[];
  defaultLanguage: string;
  localesDir: string;
}

export interface TranslationState extends Record<string, unknown> {
  translationData: Record<string, unknown>;
  path: string;
  locale: string;
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

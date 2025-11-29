import { type Middleware } from "fresh";
import type { State } from "@/utils.ts";
import { getAvailableAuthProviders } from "@/utilities/auth-providers.ts";

/**
 * Middleware that populates available auth providers in state.
 * This runs server-side and checks which OAuth providers are configured.
 */
export const authProvidersMiddleware: Middleware<State> = async (ctx) => {
  ctx.state.availableAuthProviders = getAvailableAuthProviders();
  return await ctx.next() as Response;
};

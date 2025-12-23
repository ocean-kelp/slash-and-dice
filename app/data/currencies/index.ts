import { CURRENCIES_DATA } from "./data.ts";
import { Currency, CurrencyId } from "./types.ts";

export const currencies: readonly Currency[] = CURRENCIES_DATA;

export const currenciesById: Record<CurrencyId, Currency> = Object.fromEntries(
  currencies.map((c) => [c.id, c]),
) as Record<CurrencyId, Currency>;

export default currencies;

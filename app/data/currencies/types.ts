import { CURRENCIES_DATA } from "./data.ts";

export type CurrencyId = (typeof CURRENCIES_DATA)[number]["id"];

export interface Currency {
  id: CurrencyId;
  name: string;
  icon: string;
}

export type CurrenciesCollection = Record<CurrencyId, Currency>;

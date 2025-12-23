export interface Currency {
  id: string;
  name: string;
  icon: string;
}

export type CurrenciesCollection = Record<string, Currency>;

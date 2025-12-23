import type { Currency } from "./types.ts";

export const currencies: Currency[] = [
  {
    id: "gem",
    name: "Gem",
    icon: "/game/data/currencies/gem.png",
  },
  {
    id: "riftstone",
    name: "Riftstone",
    icon: "/game/data/currencies/riftstone.png",
  },
  {
    id: "soulstone",
    name: "Soulstone",
    icon: "/game/data/currencies/soulstone.png",
  },
];

export const currenciesById: Record<string, Currency> = Object.fromEntries(
  currencies.map((c) => [c.id, c]),
);

export default currencies;

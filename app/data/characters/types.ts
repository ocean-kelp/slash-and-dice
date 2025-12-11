// Character interfaces for TypeScript validation

export interface CharacterStats {
  id: number;
  hp: number;
  critRate: number;
  atkSpeed: number;
  moveSpeed: number;
  skillDmg: number;
  atkPower: number;
}

export interface CharacterPrice {
  gem?: number;
  riftstone?: number;
  soulstone?: number;
}

export interface Character {
  // Keep `id` optional to match existing JSON/TS entries that include it,
  // while allowing models that omit it.
  id?: number;
  name: string;
  price?: CharacterPrice;
  stats: CharacterStats;
}

// Type for characters collection
export type CharactersCollection = Record<string, Character>;

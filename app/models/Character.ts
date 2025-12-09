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
  name: string;
  price?: CharacterPrice;
  stats: CharacterStats;
}

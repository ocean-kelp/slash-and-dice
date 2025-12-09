export interface CharacterStats {
  id: number;
  hp: number;
  critRate: number;
  atkSpeed: number;
  moveSpeed: number;
  skillDmg: number;
  atkPower: number;
}

export interface Character {
  name: string;
  stats: CharacterStats;
}

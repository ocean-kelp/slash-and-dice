import { Character } from "../types.ts";

export const gunner: Character = {
  id: 7,
  name: "gunner",
  price: {
    gem: 4000,
  },
  stats: {
    id: 7,
    hp: 5,
    critRate: 0.20,
    atkSpeed: 0.72,
    moveSpeed: 8.8,
    skillDmg: 0.15,
    atkPower: 24.5,
  },
};

export default gunner;

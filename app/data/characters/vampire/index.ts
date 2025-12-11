import { Character } from "../types.ts";

export const vampire: Character = {
  id: 9,
  name: "vampire",
  price: {
    gem: 4000,
  },
  stats: {
    id: 9,
    hp: 8,
    critRate: 0.00,
    atkSpeed: 0.33,
    moveSpeed: 8.0,
    skillDmg: 0.15,
    atkPower: 20.5,
  },
};

export default vampire;

import { Character } from "../types.ts";

export const ronin: Character = {
  id: 6,
  name: "ronin",
  price: {
    gem: 4000,
  },
  stats: {
    id: 6,
    hp: 5,
    critRate: 0.22,
    atkSpeed: 0.81,
    moveSpeed: 7.7,
    skillDmg: 0.10,
    atkPower: 27,
  },
};

export default ronin;

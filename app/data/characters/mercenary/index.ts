import { Character } from "../types.ts";

export const mercenary: Character = {
  id: 8,
  name: "mercenary",
  price: {
    gem: 4000,
  },
  stats: {
    id: 8,
    hp: 6,
    critRate: 0.15,
    atkSpeed: 0.51,
    moveSpeed: 7.8,
    skillDmg: 0.30,
    atkPower: 31,
  },
};

export default mercenary;

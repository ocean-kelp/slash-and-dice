import { Character } from "../types.ts";

export const knight: Character = {
  id: 1,
  name: "knight",
  price: {
    gem: 0,
  },
  stats: {
    id: 1,
    hp: 6,
    critRate: 0.15,
    atkSpeed: 1.3,
    moveSpeed: 8.5,
    skillDmg: 0.23,
    atkPower: 31,
  },
};

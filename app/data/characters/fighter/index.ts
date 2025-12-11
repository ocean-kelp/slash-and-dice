import { Character } from "../types.ts";

export const fighter: Character = {
  id: 2,
  name: "fighter",
  price: {
    gem: 3000,
  },
  stats: {
    id: 2,
    hp: 6,
    critRate: 0.15,
    atkSpeed: 1.12,
    moveSpeed: 8.8,
    skillDmg: 0.23,
    atkPower: 33.5,
  },
};

export default fighter;

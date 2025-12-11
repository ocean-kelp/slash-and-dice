import { Character } from "../types.ts";

export const guardian: Character = {
  id: 11,
  name: "guardian",
  price: {
    gem: 4000,
  },
  stats: {
    id: 11,
    hp: 3,
    critRate: 0.02,
    atkSpeed: 0.83,
    moveSpeed: 7.8,
    skillDmg: 0.26,
    atkPower: 30,
  },
};

export default guardian;

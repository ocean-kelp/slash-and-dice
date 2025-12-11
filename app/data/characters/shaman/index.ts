import { Character } from "../types.ts";

export const shaman: Character = {
  id: 10,
  name: "shaman",
  price: {
    gem: 4000,
  },
  stats: {
    id: 10,
    hp: 4,
    critRate: 0.05,
    atkSpeed: 1.17,
    moveSpeed: 8.3,
    skillDmg: 0.15,
    atkPower: 22,
  },
};

export default shaman;

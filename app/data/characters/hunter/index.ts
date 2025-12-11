import { Character } from "../types.ts";

export const hunter: Character = {
  id: 4,
  name: "hunter",
  price: {
    gem: 4000,
  },
  stats: {
    id: 4,
    hp: 5,
    critRate: 0.15,
    atkSpeed: 0.85,
    moveSpeed: 8.8,
    skillDmg: 0.15,
    atkPower: 28,
  },
};

export default hunter;

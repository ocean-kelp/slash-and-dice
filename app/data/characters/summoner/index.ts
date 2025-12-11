import { Character } from "../types.ts";

export const summoner: Character = {
  id: 12,
  name: "summoner",
  price: {
    gem: 4000,
  },
  stats: {
    id: 12,
    hp: 6,
    critRate: 0.15,
    atkSpeed: 0.78,
    moveSpeed: 8.5,
    skillDmg: 0.23,
    atkPower: 33,
  },
};

export default summoner;

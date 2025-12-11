import { Character } from "../types.ts";

export const werewolf: Character = {
  id: 15,
  name: "werewolf",
  price: {
    gem: 4000,
  },
  stats: {
    id: 15,
    hp: 7,
    critRate: 0.15,
    atkSpeed: 1.18,
    moveSpeed: 8.0,
    skillDmg: 0.18,
    atkPower: 25,
  },
};

export default werewolf;

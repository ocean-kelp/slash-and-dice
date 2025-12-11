import { Character } from "./types.ts";

// Import all character modules
import { knight } from "./knight/index.ts";
import { fighter } from "./fighter/index.ts";
import { hunter } from "./hunter/index.ts";
import { slayer } from "./slayer/index.ts";
import { ronin } from "./ronin/index.ts";
import { gunner } from "./gunner/index.ts";
import { mercenary } from "./mercenary/index.ts";
import { vampire } from "./vampire/index.ts";
import { shaman } from "./shaman/index.ts";
import { guardian } from "./guardian/index.ts";
import { summoner } from "./summoner/index.ts";
import { dragonian } from "./dragonian/index.ts";
import { predator } from "./predator/index.ts";
import { werewolf } from "./werewolf/index.ts";
import { doppelganger } from "./doppelganger/index.ts";
import { assasin } from "./assasin/index.ts";
import { bjornYandel } from "./bjorn-yandel/index.ts";
import { soulEater } from "./soul-eater/index.ts";
import { mage } from "./mage/index.ts";

// Merge all characters into one collection
export const allCharacters: Record<string, Character> = {
  knight,
  fighter,
  hunter,
  slayer,
  ronin,
  gunner,
  mercenary,
  vampire,
  shaman,
  guardian,
  summoner,
  dragonian,
  predator,
  werewolf,
  doppelganger,
  assasin,
  bjornYandel,
  soulEater,
  mage,
};

// Export individual characters for direct access if needed
export {
  assasin,
  bjornYandel,
  doppelganger,
  dragonian,
  fighter,
  guardian,
  gunner,
  hunter,
  knight,
  mage,
  mercenary,
  predator,
  ronin,
  shaman,
  slayer,
  soulEater,
  summoner,
  vampire,
  werewolf,
};

// Export types for use throughout your application
export type {
  Character,
  CharacterPrice,
  CharactersCollection,
  CharacterStats,
} from "./types.ts";

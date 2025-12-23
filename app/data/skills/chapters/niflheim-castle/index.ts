import type { Skill } from "../../types.ts";
import { lightningStrike } from "./lightning-strike.ts";
import { pulseBomb } from "./pulse-bomb.ts";
import { needleThrow } from "./needle-throw.ts";
import { flameSpear } from "./flame-spear.ts";
import { flash } from "./flash.ts";
import { bloodSpear } from "./blood-spear.ts";
import { lightFlash } from "./light-flash.ts";
import { crimsonRain } from "./crimson-rain.ts";
import { glacialShield } from "./glacial-shield.ts";
import { deathStigma } from "./death-stigma.ts";
import { radianceStigma } from "./radiance-stigma.ts";
import { bleedingStigma } from "./bleeding-stigma.ts";

export const niflheimCastleSkills: Record<string, Skill> = {
  [lightningStrike.id]: lightningStrike,
  [pulseBomb.id]: pulseBomb,
  [needleThrow.id]: needleThrow,
  [flameSpear.id]: flameSpear,
  [flash.id]: flash,
  [bloodSpear.id]: bloodSpear,
  [lightFlash.id]: lightFlash,
  [crimsonRain.id]: crimsonRain,
  [glacialShield.id]: glacialShield,
  [deathStigma.id]: deathStigma,
  [radianceStigma.id]: radianceStigma,
  [bleedingStigma.id]: bleedingStigma,
};

export default niflheimCastleSkills;

import type { Skill } from "../../types.ts";
import { crushingBite } from "./crushing-bite.ts";
import { abyssalExecution } from "./abyssal-execution.ts";
import { sandspike } from "./sandspike.ts";
import { desertVortex } from "./desert-vortex.ts";
import { sacrificialStake } from "./sacrificial-stake.ts";
import { pactOfImmortality } from "./pact-of-immortality.ts";
import { sandArrow } from "./sand-arrow.ts";
import { sandSoldier } from "./sand-soldier.ts";
import { solarOrb } from "./solar-orb.ts";
import { cactusBomb } from "./cactus-bomb.ts";
import { talismanRain } from "./talisman-rain.ts";
import { arcaneBeam } from "./arcane-beam.ts";
import { chainOfDeath } from "./chain-of-death.ts";
import { guardiansShield } from "./guardians-shield.ts";
import { flameDragonsTribute } from "./flame-dragons-tribute.ts";
import { vesselOfSouls } from "./vessel-of-souls.ts";
import { sandBarrier } from "./sand-barrier.ts";
import { assassination } from "./assassination.ts";

export const desertOfTheRedSunSkills: Record<string, Skill> = {
  [crushingBite.id]: crushingBite,
  [abyssalExecution.id]: abyssalExecution,
  [sandspike.id]: sandspike,
  [desertVortex.id]: desertVortex,
  [sacrificialStake.id]: sacrificialStake,
  [pactOfImmortality.id]: pactOfImmortality,
  [sandArrow.id]: sandArrow,
  [sandSoldier.id]: sandSoldier,
  [solarOrb.id]: solarOrb,
  [cactusBomb.id]: cactusBomb,
  [talismanRain.id]: talismanRain,
  [arcaneBeam.id]: arcaneBeam,
  [chainOfDeath.id]: chainOfDeath,
  [guardiansShield.id]: guardiansShield,
  [flameDragonsTribute.id]: flameDragonsTribute,
  [vesselOfSouls.id]: vesselOfSouls,
  [sandBarrier.id]: sandBarrier,
  [assassination.id]: assassination,
};

export default desertOfTheRedSunSkills;

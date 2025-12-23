import type { Skill } from "../../types.ts";
import { iceSpear } from "./ice-spear.ts";
import { toxicGasExplosion } from "./toxic-gas-explosion.ts";
import { toxicBlade } from "./toxic-blade.ts";
import { icicleSpike } from "./icicle-spike.ts";
import { deathRay } from "./death-ray.ts";

export const toxicSwampSkills: Record<string, Skill> = {
  [iceSpear.id]: iceSpear,
  [toxicGasExplosion.id]: toxicGasExplosion,
  [toxicBlade.id]: toxicBlade,
  [icicleSpike.id]: icicleSpike,
  [deathRay.id]: deathRay,
};

export default toxicSwampSkills;

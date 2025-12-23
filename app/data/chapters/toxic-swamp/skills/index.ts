import type { Skill } from "@/data/skills/types.ts";
import { iceSpear } from "./ice-spear.ts";
import { toxicGasExplosion } from "./toxic-gas-explosion.ts";
import { toxicBlade } from "./toxic-blade.ts";
import { icicleSpike } from "./icicle-spike.ts";
import { deathRay } from "./death-ray.ts";
import { applyToxin } from "./apply-toxin.ts";
import { fireball } from "./fireball.ts";
import { daggerThrow } from "./dagger-throw.ts";

export const toxicSwampSkills: Record<string, Skill> = {
  [iceSpear.id]: iceSpear,
  [toxicGasExplosion.id]: toxicGasExplosion,
  [toxicBlade.id]: toxicBlade,
  [icicleSpike.id]: icicleSpike,
  [deathRay.id]: deathRay,
  [applyToxin.id]: applyToxin,
  [fireball.id]: fireball,
  [daggerThrow.id]: daggerThrow,
};

export default toxicSwampSkills;

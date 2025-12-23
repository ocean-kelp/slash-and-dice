import type { Skill } from "../../types.ts";
import { successiveStrike } from "./successive-strike.ts";
import { severBlade } from "./sever-blade.ts";
import { chainLightning } from "./chain-lightning.ts";
import { venomDispersion } from "./venom-dispersion.ts";
import { frenziedSlam } from "./frenzied-slam.ts";
import { traumaticSmite } from "./traumatic-smite.ts";
import { icicleSpike } from "./icicle-spike.ts";
import { flameBombThrow } from "./flame-bomb-throw.ts";
import { toxicBlade } from "./toxic-blade.ts";
import { frostBombThrow } from "./frost-bomb-throw.ts";
import { plasma } from "./plasma.ts";
import { hatredSpike } from "./hatred-spike.ts";
import { shurikenManeuver } from "./shuriken-maneuver.ts";
import { callLightning } from "./call-lightning.ts";
import { rampage } from "./rampage.ts";
import { flameZone } from "./flame-zone.ts";
import { neurotoxin } from "./neurotoxin.ts";
import { venomCloud } from "./venom-cloud.ts";
import { barrier } from "./barrier.ts";
import { ghostGlide } from "./ghost-glide.ts";
import { meditation } from "./meditation.ts";
import { enchantment } from "./enchantment.ts";
import { overdrive } from "./overdrive.ts";
import { electricStigma } from "./electric-stigma.ts";
import { flameStigma } from "./flame-stigma.ts";
import { iceStigma } from "./ice-stigma.ts";

export const prisonCampSkills: Record<string, Skill> = {
  [successiveStrike.id]: successiveStrike,
  [severBlade.id]: severBlade,
  [chainLightning.id]: chainLightning,
  [venomDispersion.id]: venomDispersion,
  [frenziedSlam.id]: frenziedSlam,
  [traumaticSmite.id]: traumaticSmite,
  [icicleSpike.id]: icicleSpike,
  [flameBombThrow.id]: flameBombThrow,
  [toxicBlade.id]: toxicBlade,
  [frostBombThrow.id]: frostBombThrow,
  [plasma.id]: plasma,
  [hatredSpike.id]: hatredSpike,
  [shurikenManeuver.id]: shurikenManeuver,
  [callLightning.id]: callLightning,
  [rampage.id]: rampage,
  [flameZone.id]: flameZone,
  [neurotoxin.id]: neurotoxin,
  [venomCloud.id]: venomCloud,
  [barrier.id]: barrier,
  [ghostGlide.id]: ghostGlide,
  [meditation.id]: meditation,
  [enchantment.id]: enchantment,
  [overdrive.id]: overdrive,
  [electricStigma.id]: electricStigma,
  [flameStigma.id]: flameStigma,
  [iceStigma.id]: iceStigma,
};

export default prisonCampSkills;

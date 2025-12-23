import type { Skill } from "@/data/skills/types.ts";
import { rockShot } from "./rock-shot.ts";
import { darkSphere } from "./dark-sphere.ts";
import { freezingSmite } from "./freezing-smite.ts";
import { flameVortex } from "./flame-vortex.ts";
import { explosiveMarble } from "./explosive-marble.ts";
import { blazingRay } from "./blazing-ray.ts";
import { ignition } from "./ignition.ts";
import { superSmite } from "./super-smite.ts";
import { tornadoArrow } from "./tornado-arrow.ts";
import { justiceSword } from "./justice-sword.ts";
import { spaceFissure } from "./space-fissure.ts";
import { unleashBlood } from "./unleash-blood.ts";
import { iceArrow } from "./ice-arrow.ts";
import { swordSpin } from "./sword-spin.ts";
import { plasmaBarrier } from "./plasma-barrier.ts";
import { niflheimSwordsmanship } from "./niflheim-swordsmanship.ts";
import { dragonsPrudence } from "./dragons-prudence.ts";
import { bloodySwordStrike } from "./bloody-sword-strike.ts";
import { iceFamiliar } from "./ice-familiar.ts";
import { shooterDrone } from "./shooter-drone.ts";

export const outskirtsOfNiflheimSkills: Record<string, Skill> = {
  [rockShot.id]: rockShot,
  [darkSphere.id]: darkSphere,
  [freezingSmite.id]: freezingSmite,
  [flameVortex.id]: flameVortex,
  [explosiveMarble.id]: explosiveMarble,
  [blazingRay.id]: blazingRay,
  [ignition.id]: ignition,
  [superSmite.id]: superSmite,
  [tornadoArrow.id]: tornadoArrow,
  [justiceSword.id]: justiceSword,
  [spaceFissure.id]: spaceFissure,
  [unleashBlood.id]: unleashBlood,
  [iceArrow.id]: iceArrow,
  [swordSpin.id]: swordSpin,
  [plasmaBarrier.id]: plasmaBarrier,
  [niflheimSwordsmanship.id]: niflheimSwordsmanship,
  [dragonsPrudence.id]: dragonsPrudence,
  [bloodySwordStrike.id]: bloodySwordStrike,
  [iceFamiliar.id]: iceFamiliar,
  [shooterDrone.id]: shooterDrone,
};

export default outskirtsOfNiflheimSkills;

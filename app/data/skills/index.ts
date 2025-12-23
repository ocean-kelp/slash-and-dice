import { prisonCampSkills } from "../chapters/prison-camp/skills/index.ts";
import { toxicSwampSkills } from "../chapters/toxic-swamp/skills/index.ts";
import { outskirtsOfNiflheimSkills } from "../chapters/outskirts-of-niflheim/skills/index.ts";
import { niflheimCastleSkills } from "../chapters/niflheim-castle/skills/index.ts";
import { desertOfTheRedSunSkills } from "../chapters/desert-of-the-red-sun/skills/index.ts";
import type { Skill } from "./types.ts";

export const allSkills: Record<string, Skill> = {
  ...prisonCampSkills,
  ...toxicSwampSkills,
  ...outskirtsOfNiflheimSkills,
  ...niflheimCastleSkills,
  ...desertOfTheRedSunSkills,
};

export const skillsList: Skill[] = Object.values(allSkills);

export const getSkillById = (id: string): Skill | undefined => allSkills[id];

export default allSkills;

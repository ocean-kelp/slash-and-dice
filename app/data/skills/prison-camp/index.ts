import type { Skill } from "../types.ts";
import { successiveStrike } from "./successive-strike.ts";

export const prisonCampSkills: Record<string, Skill> = {
  [successiveStrike.id]: successiveStrike,
};

export default prisonCampSkills;

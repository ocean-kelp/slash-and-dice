import { allSkills } from "@/data/skills/index.ts";
import type { ActivationType, Skill } from "@/data/skills/types.ts";

class SkillService {
  private skills: Record<string, Skill> = allSkills;

  /**
   * Get all skills as an array
   * @returns Array of all skills
   */
  getAllSkills(): Skill[] {
    return Object.values(this.skills);
  }

  /**
   * Get a skill by its ID
   * @param id - Skill ID (e.g., "dagger-throw")
   * @returns Skill data or undefined if not found
   */
  getById(id: string): Skill | undefined {
    return this.skills[id];
  }

  /**
   * Get all skills belonging to a specific chapter
   * @param chapterId - Chapter ID (e.g., "toxic-swamp")
   * @returns Array of skills for that chapter
   */
  getByChapter(chapterId: string): Skill[] {
    return this.getAllSkills().filter((s) => s.chapterId === chapterId);
  }

  /**
   * Get skills by their activation type
   * @param type - Activation type (main, subskill, buff)
   * @returns Array of skills with that activation type
   */
  getByActivationType(type: ActivationType): Skill[] {
    return this.getAllSkills().filter((s) => s.activationType === type);
  }

  /**
   * Get the public path for a skill image
   * @param imageFilename - Filename from skill data (e.g., "Dagger Throw.png")
   * @returns Public URL path to the image
   */
  getImagePath(imageFilename: string): string {
    if (!imageFilename) return "";
    return `/game/data/skills/${imageFilename}`;
  }
}

// Export singleton instance
export const skillService = new SkillService();

import type { ActivationType, Skill } from "@/data/skills/types.ts";

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Global shared cache - loaded once and shared across all requests
let globalSkillsCache: Record<string, Skill> | null = null;
let globalSkillsArray: Skill[] | null = null;

class SkillService {
  /**
   * Get skills record (lazy loaded, globally cached)
   */
  private async getSkills(): Promise<Record<string, Skill>> {
    if (!globalSkillsCache) {
      // Lazy import - only load when first accessed
      const { allSkills } = await import("@/data/skills/index.ts");
      globalSkillsCache = allSkills;
    }
    return globalSkillsCache;
  }

  /**
   * Get skills array (cached)
   */
  private async getSkillsArray(): Promise<Skill[]> {
    if (!globalSkillsArray) {
      const skills = await this.getSkills();
      globalSkillsArray = Object.values(skills);
    }
    return globalSkillsArray;
  }

  /**
   * Get total skill count without loading all data
   * @returns Total number of skills
   */
  async getTotalCount(): Promise<number> {
    const skills = await this.getSkills();
    return Object.keys(skills).length;
  }

  /**
   * Search skills by name or ID
   * @param searchTerm - Search term to match against name or ID
   * @returns Array of matching skills
   */
  async searchByName(searchTerm: string): Promise<Skill[]> {
    const query = searchTerm.toLowerCase();
    const allSkills = await this.getSkillsArray();
    return allSkills.filter((skill) =>
      skill.name.en.toLowerCase().includes(query) ||
      skill.id.toLowerCase().includes(query)
    );
  }

  /**
   * Get paginated skills with filters
   * @param options - Pagination and filter options
   * @returns Paginated result with items and metadata
   */
  async getPaginated(options: {
    page?: number;
    pageSize?: number;
    filters?: {
      activationTypes?: string[];
      elementTypes?: string[];
      skillTypes?: string[];
      chapterIds?: string[];
      searchTerm?: string;
    };
    sortBy?: string;
  }): Promise<PaginatedResult<Skill>> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 24;
    const filters = options.filters || {};

    const baseArray = await this.getSkillsArray();
    const indices: number[] = [];

    // Build indices array instead of filtering multiple times
    for (let i = 0; i < baseArray.length; i++) {
      const skill = baseArray[i];

      // Check all filters
      if (filters.searchTerm) {
        const search = filters.searchTerm.toLowerCase();
        if (
          !skill.name.en.toLowerCase().includes(search) &&
          !skill.description.en.toLowerCase().includes(search)
        ) {
          continue;
        }
      }

      if (
        filters.activationTypes?.length &&
        !filters.activationTypes.includes(skill.activationType)
      ) {
        continue;
      }

      if (
        filters.elementTypes?.length &&
        (!skill.elementType ||
          !filters.elementTypes.includes(skill.elementType))
      ) {
        continue;
      }

      if (
        filters.skillTypes?.length &&
        !skill.skillType?.some((type) => filters.skillTypes!.includes(type))
      ) {
        continue;
      }

      if (
        filters.chapterIds?.length &&
        (!skill.chapterId || !filters.chapterIds.includes(skill.chapterId))
      ) {
        continue;
      }

      indices.push(i);
    }

    // Build filtered array only once
    const filtered = indices.map((i) => baseArray[i]);

    // Apply sorting (in-place)
    if (options.sortBy) {
      filtered.sort((a, b) => {
        switch (options.sortBy) {
          case "nameAsc":
            return a.name.en.localeCompare(b.name.en);
          case "nameDesc":
            return b.name.en.localeCompare(a.name.en);
          case "activationType":
            return a.activationType.localeCompare(b.activationType);
          case "elementType":
            return (a.elementType || "").localeCompare(b.elementType || "");
          default:
            return 0;
        }
      });
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    const items = filtered.slice(startIndex, endIndex);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  /**
   * Get a skill by its ID
   * @param id - Skill ID (e.g., "dagger-throw")
   * @returns Skill data or undefined if not found
   */
  async getById(id: string): Promise<Skill | undefined> {
    const skills = await this.getSkills();
    return skills[id];
  }

  /**
   * Get all skills belonging to a specific chapter
   * @param chapterId - Chapter ID (e.g., "toxic-swamp")
   * @returns Array of skills for that chapter
   */
  async getByChapter(chapterId: string): Promise<Skill[]> {
    const allSkills = await this.getSkillsArray();
    return allSkills.filter((s) => s.chapterId === chapterId);
  }

  /**
   * Get skills by their activation type
   * @param type - Activation type (main, subskill, buff)
   * @returns Array of skills with that activation type
   */
  async getByActivationType(type: ActivationType): Promise<Skill[]> {
    const allSkills = await this.getSkillsArray();
    return allSkills.filter((s) => s.activationType === type);
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

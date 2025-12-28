import type {
  ActivationType,
  ElementType,
  SkillType,
} from "@/data/skills/types.ts";
import type { Artifact, ArtifactType, Rarity } from "@/data/artifacts/types.ts";

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Global shared cache - loaded once and shared across all requests
let globalArtifactsCache: Record<string, Artifact> | null = null;
let globalArtifactsArray: Artifact[] | null = null;

class ArtifactService {
  /**
   * Get artifacts record (lazy loaded, globally cached)
   */
  private async getArtifacts(): Promise<Record<string, Artifact>> {
    if (!globalArtifactsCache) {
      // Lazy import - only load when first accessed
      const { allArtifacts } = await import("@/data/artifacts/index.ts");
      globalArtifactsCache = allArtifacts;
    }
    return globalArtifactsCache;
  }

  /**
   * Get artifacts array (cached)
   */
  private async getArtifactsArray(): Promise<Artifact[]> {
    if (!globalArtifactsArray) {
      const artifacts = await this.getArtifacts();
      globalArtifactsArray = Object.values(artifacts);
    }
    return globalArtifactsArray;
  }

  /**
   * Get total artifact count without loading all data
   * @returns Total number of artifacts
   */
  async getTotalCount(): Promise<number> {
    const artifacts = await this.getArtifacts();
    return Object.keys(artifacts).length;
  }

  /**
   * Search artifacts by name or ID
   * @param searchTerm - Search term to match against name or ID
   * @returns Array of matching artifacts
   */
  async searchByName(searchTerm: string): Promise<Artifact[]> {
    const query = searchTerm.toLowerCase();
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((artifact) =>
      artifact.name.en.toLowerCase().includes(query) ||
      artifact.id.toLowerCase().includes(query)
    );
  }

  /**
   * Get paginated artifacts with filters
   * @param options - Pagination and filter options
   * @returns Paginated result with items and metadata
   */
  async getPaginated(options: {
    page?: number;
    pageSize?: number;
    filters?: {
      rarityParams?: number[];
      typeParams?: string[];
      chapterIds?: string[];
      searchTerm?: string;
      cursedOnly?: boolean;
    };
    sortBy?: string;
  }): Promise<PaginatedResult<Artifact>> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 24;
    const filters = options.filters || {};
    
    const baseArray = await this.getArtifactsArray();
    const indices: number[] = [];

    // Build indices array instead of filtering multiple times
    for (let i = 0; i < baseArray.length; i++) {
      const artifact = baseArray[i];

      // Check all filters
      if (filters.searchTerm) {
        const search = filters.searchTerm.toLowerCase();
        const matchesName = artifact.name.en.toLowerCase().includes(search);
        const matchesEffect = artifact.effects.some((e) =>
          e.text.en.toLowerCase().includes(search)
        );
        if (!matchesName && !matchesEffect) {
          continue;
        }
      }

      if (
        filters.rarityParams?.length &&
        !filters.rarityParams.includes(artifact.rarity)
      ) {
        continue;
      }

      if (
        filters.typeParams?.length &&
        !filters.typeParams.includes(artifact.type)
      ) {
        continue;
      }

      if (
        filters.chapterIds?.length &&
        !filters.chapterIds.includes(artifact.chapterId)
      ) {
        continue;
      }

      if (filters.cursedOnly && artifact.cursedInfo === undefined) {
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
          case "name-asc":
            return a.name.en.localeCompare(b.name.en);
          case "name-desc":
            return b.name.en.localeCompare(a.name.en);
          case "rarity-asc":
            return a.rarity - b.rarity;
          case "rarity-desc":
            return b.rarity - a.rarity;
          case "type":
            return a.type.localeCompare(b.type);
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
   * Get an artifact by its ID
   * @param id - Artifact ID (e.g., "torn-flag")
   * @returns Artifact data or undefined if not found
   */
  async getById(id: string): Promise<Artifact | undefined> {
    const artifacts = await this.getArtifacts();
    return artifacts[id];
  }

  /**
   * Get all artifacts belonging to a specific chapter
   * @param chapterId - Chapter ID (e.g., "prison-camp")
   * @returns Array of artifacts for that chapter
   */
  async getByChapter(chapterId: string): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.chapterId === chapterId);
  }

  /**
   * Get artifacts by rarity level
   * @param rarity - Rarity enum value (1-4)
   * @returns Array of artifacts with that rarity
   */
  async getByRarity(rarity: Rarity): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.rarity === rarity);
  }

  /**
   * Get artifacts by type
   * @param type - Artifact type (usable, consumable, equipment)
   * @returns Array of artifacts with that type
   */
  async getByType(type: ArtifactType): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.type === type);
  }

  /**
   * Get artifacts that target a specific element type
   * @param elementType - Element type (e.g., FLAME, FROST)
   * @returns Array of artifacts targeting that element
   */
  async getByElement(elementType: ElementType): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) =>
      a.targets.elementTypes?.includes(elementType)
    );
  }

  /**
   * Get artifacts that target a specific activation type
   * @param activationType - Activation type (MAIN, SUB, BUFF)
   * @returns Array of artifacts targeting that activation type
   */
  async getByActivationType(activationType: ActivationType): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) =>
      a.targets.activationTypes?.includes(activationType)
    );
  }

  /**
   * Get artifacts that target a specific skill type
   * @param skillType - Skill type (e.g., MELEE, PROJECTILE, MAGIC)
   * @returns Array of artifacts targeting that skill type
   */
  async getBySkillType(skillType: SkillType): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) =>
      a.targets.skillTypes?.includes(skillType)
    );
  }

  /**
   * Get all cursed artifacts (require heart currency)
   * @returns Array of cursed artifacts
   */
  async getCursedArtifacts(): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.cursedInfo !== undefined);
  }

  /**
   * Get artifacts that don't persist after events
   * @returns Array of event-only artifacts
   */
  async getEventArtifacts(): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.persistsAfterEvent === false);
  }

  /**
   * Get artifacts that persist after events
   * @returns Array of persistent artifacts
   */
  async getPersistentArtifacts(): Promise<Artifact[]> {
    const allArtifacts = await this.getArtifactsArray();
    return allArtifacts.filter((a) => a.persistsAfterEvent === true);
  }

  /**
   * Get the public path for an artifact image
   * @param imageFilename - Filename from artifact data (e.g., "Torn Flag.png")
   * @returns Public URL path to the image
   */
  getImagePath(imageFilename: string): string {
    if (!imageFilename) return "";
    return `/game/data/artifacts/${imageFilename}`;
  }
}

// Export singleton instance
export const artifactService = new ArtifactService();

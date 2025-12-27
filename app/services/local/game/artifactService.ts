import { allArtifacts } from "@/data/artifacts/index.ts";
import type {
  ActivationType,
  ElementType,
  SkillType,
} from "@/data/skills/types.ts";
import type { Artifact, ArtifactType, Rarity } from "@/data/artifacts/types.ts";

class ArtifactService {
  private artifacts: Record<string, Artifact> = allArtifacts;

  /**
   * Get all artifacts as an array
   * @returns Array of all artifacts
   */
  getAllArtifacts(): Artifact[] {
    return Object.values(this.artifacts);
  }

  /**
   * Get an artifact by its ID
   * @param id - Artifact ID (e.g., "torn-flag")
   * @returns Artifact data or undefined if not found
   */
  getById(id: string): Artifact | undefined {
    return this.artifacts[id];
  }

  /**
   * Get all artifacts belonging to a specific chapter
   * @param chapterId - Chapter ID (e.g., "prison-camp")
   * @returns Array of artifacts for that chapter
   */
  getByChapter(chapterId: string): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.chapterId === chapterId);
  }

  /**
   * Get artifacts by rarity level
   * @param rarity - Rarity enum value (1-4)
   * @returns Array of artifacts with that rarity
   */
  getByRarity(rarity: Rarity): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.rarity === rarity);
  }

  /**
   * Get artifacts by type
   * @param type - Artifact type (usable, consumable, equipment)
   * @returns Array of artifacts with that type
   */
  getByType(type: ArtifactType): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.type === type);
  }

  /**
   * Get artifacts that target a specific element type
   * @param elementType - Element type (e.g., FLAME, FROST)
   * @returns Array of artifacts targeting that element
   */
  getByElement(elementType: ElementType): Artifact[] {
    return this.getAllArtifacts().filter((a) =>
      a.targets.elementTypes?.includes(elementType)
    );
  }

  /**
   * Get artifacts that target a specific activation type
   * @param activationType - Activation type (MAIN, SUB, BUFF)
   * @returns Array of artifacts targeting that activation type
   */
  getByActivationType(activationType: ActivationType): Artifact[] {
    return this.getAllArtifacts().filter((a) =>
      a.targets.activationTypes?.includes(activationType)
    );
  }

  /**
   * Get artifacts that target a specific skill type
   * @param skillType - Skill type (e.g., MELEE, PROJECTILE, MAGIC)
   * @returns Array of artifacts targeting that skill type
   */
  getBySkillType(skillType: SkillType): Artifact[] {
    return this.getAllArtifacts().filter((a) =>
      a.targets.skillTypes?.includes(skillType)
    );
  }

  /**
   * Get all cursed artifacts (require heart currency)
   * @returns Array of cursed artifacts
   */
  getCursedArtifacts(): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.cursedInfo !== undefined);
  }

  /**
   * Get artifacts that don't persist after events
   * @returns Array of event-only artifacts
   */
  getEventArtifacts(): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.persistsAfterEvent === false);
  }

  /**
   * Get artifacts that persist after events
   * @returns Array of persistent artifacts
   */
  getPersistentArtifacts(): Artifact[] {
    return this.getAllArtifacts().filter((a) => a.persistsAfterEvent === true);
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

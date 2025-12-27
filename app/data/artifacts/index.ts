// Aggregator for all artifacts from all chapters
import { Artifact } from "./types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";
import { prisonCampArtifacts } from "@/data/chapters/prison-camp/artifacts/index.ts";
import { toxicSwampArtifacts } from "@/data/chapters/toxic-swamp/artifacts/index.ts";
import { outskirtsOfNiflheimArtifacts } from "@/data/chapters/outskirts-of-niflheim/artifacts/index.ts";
import { niflheimCastleArtifacts } from "@/data/chapters/niflheim-castle/artifacts/index.ts";
import { desertOfTheRedSunArtifacts } from "@/data/chapters/desert-of-the-red-sun/artifacts/index.ts";

// Combine all chapter artifacts
const allChapterArtifacts = [
  ...prisonCampArtifacts,
  ...toxicSwampArtifacts,
  ...outskirtsOfNiflheimArtifacts,
  ...niflheimCastleArtifacts,
  ...desertOfTheRedSunArtifacts,
];

// Create artifact map by ID
export const allArtifacts: Record<string, Artifact> = Object.fromEntries(
  allChapterArtifacts.map((artifact) => [artifact.id, artifact]),
);

export const artifactsList: Artifact[] = Object.values(allArtifacts);

export const getArtifactById = (id: string): Artifact | undefined =>
  allArtifacts[id];

// Service functions for artifact operations
export const artifactService = {
  getAllArtifacts: () => artifactsList,
  getArtifactById: (id: string) => getArtifactById(id),
  getArtifactsByChapter: (chapterId: string) =>
    artifactsList.filter((artifact) => artifact.chapterId === chapterId),
  getArtifactsByRarity: (rarity: number) =>
    artifactsList.filter((artifact) => artifact.rarity === rarity),
  getArtifactsByType: (type: string) =>
    artifactsList.filter((artifact) => artifact.type === type),
  getArtifactsByElement: (elementType: ElementType) =>
    artifactsList.filter((artifact) =>
      artifact.targets.elementTypes?.includes(elementType)
    ),
  getArtifactsByActivationType: (activationType: ActivationType) =>
    artifactsList.filter((artifact) =>
      artifact.targets.activationTypes?.includes(activationType)
    ),
  getArtifactsBySkillType: (skillType: SkillType) =>
    artifactsList.filter((artifact) =>
      artifact.targets.skillTypes?.includes(skillType)
    ),
  getCursedArtifacts: () =>
    artifactsList.filter((artifact) => artifact.cursedInfo !== undefined),
  getEventArtifacts: () =>
    artifactsList.filter((artifact) => artifact.persistsAfterEvent === false),
  getPersistentArtifacts: () =>
    artifactsList.filter((artifact) => artifact.persistsAfterEvent === true),
};

export default allArtifacts;

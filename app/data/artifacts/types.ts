// Multi-language text interface
export interface MultiLangText {
  en: string;
  es: string;
  kr: string;
  jp: string;
  "zh-Hans": string;
  "zh-Hant": string;
}

// Rarity levels (1-4 stars)
export enum Rarity {
  ONE_STAR = 1,
  TWO_STAR = 2,
  THREE_STAR = 3,
  FOUR_STAR = 4,
}

// Artifact types
export enum ArtifactType {
  USABLE = "usable", // Takes 1 inventory slot, used once and disappears
  CONSUMABLE = "consumable", // Immediate effect on use
  EQUIPMENT = "equipment", // Takes a slot, can be discarded/replaced
}

// Source types for how artifacts are obtained
export enum SourceType {
  CHARACTER_EXCLUSIVE = "character_exclusive",
  BOSS_LOOT = "boss_loot",
  EVENT_NPC = "event_npc",
  REGULAR_NPC = "regular_npc",
  SPECIFIC_ITEM = "specific_item",
  SECRET_PUZZLE = "secret_puzzle",
}

// Source details interface
export interface Source {
  type: SourceType;
  description: MultiLangText;
  // For boss loot: probability of obtaining
  probability?: number;
  // For character exclusive: character name
  character?: string;
  // For boss loot: boss name
  boss?: string;
  // For specific item: item name
  item?: string;
}

// Import skill types for proper typing
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

// Target types for artifact effects - using proper enum types instead of raw strings
export interface ArtifactTarget {
  activationTypes?: ActivationType[]; // e.g., [ActivationType.MAIN, ActivationType.SUB]
  elementTypes?: ElementType[]; // e.g., [ElementType.BLEED, ElementType.DARKNESS]
  skillTypes?: SkillType[]; // e.g., [SkillType.PHYSICAL, SkillType.MAGIC]
}

// Effect description interface
export interface EffectDescription {
  text: MultiLangText;
  // Optional: numerical value if the effect has a specific value
  value?: number;
  // Optional: type of effect (damage, stat, etc.)
  type?: string;
}

// Import currency types
import { CurrencyId } from "@/data/currencies/types.ts";

// Artifact interface
export interface Artifact {
  id: string;
  name: MultiLangText;
  imageFilename: string;
  rarity: Rarity;
  type: ArtifactType;
  sources: Source[];
  effects: EffectDescription[];
  unlockingRequirement: MultiLangText;
  targets: ArtifactTarget;
  chapterId: string;
  persistsAfterEvent?: boolean;
  cursedInfo?: {
    currencyId: CurrencyId; // "heart" currency
    amount: number; // How many hearts required
  };
}

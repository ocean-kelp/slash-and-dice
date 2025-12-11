// Multi-language text interface
export interface MultiLangText {
  en: string;
  es: string;
  kr: string;
  jp: string;
  "zh-Hans": string;
  "zh-Hant": string;
}

// Activation types (required)
export enum ActivationType {
  MAIN = "main",
  SUB = "subskill",
  BUFF = "buff",
}

// Optional skill types
export enum SkillType {
  PROTECTION = "protection",
  PHYSICAL = "physical",
  MAGIC = "magic",
  SPELL = "spell",
  TARGETTING = "targetting",
  BOMB = "bomb",
  CURSE = "curse",
  MELEE = "melee",
  PROJECTILE = "projectile",
  SUMMON = "summon",
  CHAIN = "chain",
}

// Optional element types
export enum ElementType {
  FLAME = "flame",
  FROST = "frost",
  TOXIN = "toxin",
  LIGHTNING = "lightning",
  BLEED = "bleeed",
  DIVINITY = "divinity",
  DARKNESS = "darkness",
}

// Human-readable multilingual labels for activation types.
// These can be kept here or moved to the i18n system. They are included
// here because activation types are part of the data model and often need
// localized display names alongside skill data.
export const ActivationTypeNames: Record<ActivationType, MultiLangText> = {
  [ActivationType.MAIN]: {
    en: "Main Skill",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  [ActivationType.SUB]: {
    en: "Subskill",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  [ActivationType.BUFF]: {
    en: "Buff",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
};

// Skill modification for each level
export interface SkillModification {
  name: MultiLangText;
  description: MultiLangText;
}

// Main skill interface
export interface Skill {
  id: string;
  name: MultiLangText;
  imageFilename: string;
  inGameId: string;
  // Activation type is required and limited to predefined values
  activationType: ActivationType;

  // Optional classification fields
  skillType?: SkillType;
  elementType?: ElementType;

  description: MultiLangText;
  chapterUnlock: number;
  damage: number; // percentage (e.g., 1.5 = 150%)
  activationChance: number; // between 0 and 1
  modifications: {
    I: SkillModification;
    II: SkillModification;
    III: SkillModification;
    special: SkillModification;
  };
  // List of character IDs (their `name` field) that CANNOT use this ability
  // (blacklist). Use this when most characters can use the skill.
  excludedCharacters?: string[];
  // Chapter identifier this ability belongs to (slug from chapters list)
  chapterId?: string;
}

// Type for skills collection
export type SkillsCollection = Record<string, Skill>;

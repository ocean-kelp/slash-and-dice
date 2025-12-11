// Multi-language text interface
export interface MultiLangText {
  en: string;
  es: string;
  kr: string;
  jp: string;
  "zh-Hans": string;
  "zh-Hant": string;
}

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
  skillType: string;
  activationType: string;
  elementType: string;
  attributes: string[];
  description: MultiLangText;
  damage: number;
  activationChance: number;
  modifications: {
    I: SkillModification;
    II: SkillModification;
    III: SkillModification;
    special: SkillModification;
  };
}

// Type for skills collection
export type SkillsCollection = Record<string, Skill>;

import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Dragon's Prudence",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const dragonsPrudence: Skill = {
  id: "dragons-prudence",
  name,
  imageFilename: "dragons-prudence.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  skillType: [SkillType.PHYSICAL],
  elementType: ElementType.DARKNESS,
  description: {
    en: "Increases basic and basic-skill damage (Basic Attack Damage +8%).",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 0,
  activationChance: 0.08,
  modifications: {
    I: {
      name: {
        en: "Earth Dragon's Hardness",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Attack +0.7 for each intact heart you currently have.",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Black Dragon's Fear",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "When attacking, Basic Skill ATK +3% for 2s (stacks up to 30%).",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Fire Dragon's Blazing",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Base Skill ATK +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    special: {
      name: {
        en: "Special Mod",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "+1% additional Basic Skill ATK per 1 current Attack Damage (up to 50%)",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "outskirts-of-niflheim",
};

export default dragonsPrudence;

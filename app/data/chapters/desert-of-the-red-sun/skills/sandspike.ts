import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Sandspike",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const sandspike: Skill = {
  id: "sandspike",
  name,
  imageFilename: "Sandspike.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PHYSICAL, SkillType.MELEE, SkillType.BLEED],
  description: {
    en:
      "Strikes forward with spikes of sand. Number of Spikes: 1. 25% chance to inflict Bleed.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 1.5,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Crimson Wind",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Bleed Chance +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Spire of the Dunes",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Size +20%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Judgement of the Dunes",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +33%",
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
          "Sandspike is recast once. The recast increases in size based on Bleed chance (up to +100%).",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "desert-of-the-red-sun",
};

export default sandspike;

import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Enchantment",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const enchantment: Skill = {
  id: "enchantment",
  name,
  imageFilename: "enchantment.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  skillType: [SkillType.PROTECTION],
  description: {
    en: "Increases skill activation chance. Base activation chance: 5%.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 0,
  activationChance: 0.05,
  modifications: {
    I: {
      name: {
        en: "Quick Stockade",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Activation Chance +5%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Multiple Stockades",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "+1% Skill Activation Chance and +1% Attack Power per 1 Main Skill equipped",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Concentration",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "+0.5% Attack Power per 1% Skill Activation Chance (does not stack with other activation chance increase tags)",
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
        en: "Skill Activation Rate +10%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "prison-camp",
};

export default enchantment;

import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Ice Arrow",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const iceArrow: Skill = {
  id: "ice-arrow",
  name,
  imageFilename: "Ice Arrow.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.MAGIC, SkillType.TARGETTING],
  elementType: ElementType.FROST,
  description: {
    en:
      "Fires ice arrows (3) at the enemy. 15% chance to apply Freeze to enemies in range.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 1.0,
  cooldown: 5.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Snipe",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +50%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Crystallization",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +35%; Skill Size +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Multishot",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Count +1",
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
        en: "Skill Count +3",
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

export default iceArrow;

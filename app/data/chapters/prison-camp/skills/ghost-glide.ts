import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Ghost Glide",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const ghostGlide: Skill = {
  id: "ghost-glide",
  name,
  imageFilename: "Ghost Glide.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  skillType: [SkillType.MAGIC],
  elementType: ElementType.LIGHTNING,
  description: {
    en: "Increases MOV SPD and ATK SPD. Base Speed Up +7%.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 0,
  activationChance: 0.07,
  modifications: {
    I: {
      name: {
        en: "Nimble Movement",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Additional SPD increase +5%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Find Weakness",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "CRIT Chance +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Crystal Tranquility",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "SPD Increase +10% after avoiding damage for 8 seconds",
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
        en: "ATK SPD Increase +10%",
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

export default ghostGlide;

import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Super Smite",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const superSmite: Skill = {
  id: "super-smite",
  name,
  imageFilename: "super-smite.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PHYSICAL, SkillType.MELEE],
  elementType: ElementType.DARKNESS,
  description: {
    en: "Powerfully smites the enemy and sends them flying.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 2.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Dragon Smite",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "Deals damage to enemies on hit when knocked back. Critical damage +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Deep Smite",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Knock Back Distance -90%; Direct Hit ATK +30%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Double Smite",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Direct Hit ATK +50%",
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
        en: "Direct Hit ATK +250%",
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

export default superSmite;

import type { MultiLangText, Skill } from "../../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../../types.ts";

const name: MultiLangText = {
  en: "Ignition",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const ignition: Skill = {
  id: "ignition",
  name,
  imageFilename: "Ignition.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MAGIC, SkillType.SPELL],
  elementType: ElementType.FLAME,
  description: {
    en:
      "Summons a wave of flames around the enemy that ignites them (DoT). 15% chance to inflict Burn.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 2.0,
  activationChance: 0.30,
  modifications: {
    I: {
      name: {
        en: "Intense Fire",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +35%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Flaming Soul",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Multi-Hit Interval -15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Burst of Fire",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +15%; Skill Size +25%",
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
        en: "Ignition Stack Limit +3; Additional Ignite +1 when ignited",
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

export default ignition;

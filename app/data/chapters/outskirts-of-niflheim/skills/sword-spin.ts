import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Sword Spin",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const swordSpin: Skill = {
  id: "sword-spin",
  name,
  imageFilename: "Sword Spin.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.PHYSICAL, SkillType.MELEE],
  elementType: ElementType.DIVINITY,
  description: {
    en: "Summons a spinning sword around you to deal damage.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 0.7,
  cooldown: 6.5,
  activationChance: 0.0,
  modifications: {
    I: {
      name: {
        en: "Extra Spin",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Spin Count +1; Spin SPD +25%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Sharp Sword",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +45%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Proficient Summon",
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
        en: "Skill Count +2",
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

export default swordSpin;

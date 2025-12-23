import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Toxic Blade",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const toxicBlade: Skill = {
  id: "toxic-blade",
  name,
  imageFilename: "Toxic Blade.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PHYSICAL, SkillType.MELEE],
  elementType: ElementType.TOXIN,
  description: {
    en:
      "Summons a venomous sword and swings it, consuming poison stacks to deal proportional damage.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 2,
  damage: 2.4,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Swing Slash",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +30%; Skill Size +35%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Spin Slash",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Toxic Blade's Additional Effect: ATK +1% per Poison stack",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Double Rush",
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
        en:
          "Removes Slash; Activates immediately on enemies within a wide range; Skill Activation Chance +30%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "toxic-swamp",
};

export default toxicBlade;

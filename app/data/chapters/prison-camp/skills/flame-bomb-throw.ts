import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Flame Bomb Throw",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const flameBombThrow: Skill = {
  id: "flame-bomb-throw",
  name,
  imageFilename: "flame-bomb-throw.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.BOMB],
  elementType: ElementType.FLAME,
  description: {
    en:
      "Throws an incendiary bomb that explodes and leaves a burning area dealing damage over time.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 3.0,
  activationChance: 0.14,
  modifications: {
    I: {
      name: {
        en: "Incendiary",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Burn damage +20%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Sticky Fuse",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Bomb sticks to enemies for 1s before exploding",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Conflagration",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Explosion radius +25%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    special: {
      name: {
        en: "Firestorm",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Spawns 3 smaller fires after explosion",
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

export default flameBombThrow;

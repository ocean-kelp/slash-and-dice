import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Flame Dragon's Tribute",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const flameDragonsTribute: Skill = {
  id: "flame-dragons-tribute",
  name,
  imageFilename: "Flame Dragon's Tribute.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  elementType: ElementType.FLAME,
  description: {
    en:
      "Gain a buff for each intact heart (up to 5 stacks). For each Heart: Attack Power, Attack Speed, and Movement Speed +1%.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 0.0,
  activationChance: 0.0,
  modifications: {
    I: {
      name: {
        en: "Power of the Dragon",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Max Hearts +1",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Blazing Core",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "For each current Heart, Flame Skill Activation Chance and Skill Haste +1%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Eruption",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Attack Speed +8%; Burn Damage +15%",
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
        en: "Max Hearts +1; Basic Skill has a 15% chance to inflict Burn",
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

export default flameDragonsTribute;

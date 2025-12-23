import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Pulse Bomb",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const pulseBomb: Skill = {
  id: "pulse-bomb",
  name,
  imageFilename: "Pulse Bomb.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MAGIC, SkillType.BOMB],
  elementType: ElementType.LIGHTNING,
  description: {
    en:
      "Throws a bomb that pulsates in 3 pulse releases; 40% chance to inflict Shock.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 4,
  damage: 1.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Unstable Explosion",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Pulse Blast count +1",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Extra Blast",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Activation Chance +5%; Skill Count +1",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Strong Pulse",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +15%; Skill Size +20%",
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
          "Enemies hit by the pulse are limited to 1 pulse chain reaction; Skill Count +2",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "niflheim-castle",
};

export default pulseBomb;

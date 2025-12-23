import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Guardian's Shield",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const guardiansShield: Skill = {
  id: "guardians-shield",
  name,
  imageFilename: "Guardian's Shield.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  description: {
    en: "15% chance to generate a shield when taking damage.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 0.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Numb",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Grants 1-time Super Armor when a shield is generated",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Iron Wall",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "10% chance to ignore damage while a shield is active",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Danger Sense",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Shield generation chance +5% when taking damage",
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
          "When hit, if a shield is held or generated, hurl it at the attacker to deal 100% damage and inflict stun on up to 3 enemies.",
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

export default guardiansShield;

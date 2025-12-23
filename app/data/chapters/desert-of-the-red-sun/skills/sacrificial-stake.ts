import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Sacrificial Stake",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const sacrificialStake: Skill = {
  id: "sacrificial-stake",
  name,
  imageFilename: "sacrificial-stake.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MAGIC, SkillType.SPELL],
  elementType: ElementType.DIVINITY,
  description: {
    en:
      "Summons a sacrificial stake that forces sacrifice upon enemies, dealing damage. The more Soul Hearts the player has lost, the greater the damage. Skill Damage +5% per Soul Heart lost (up to 50%).",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 1.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Whispering Prayer",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Activation Chance +18%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Minor Fury",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +25%; Skill Size -30%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Cracked Revelation",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage -15%; Skill Count +1",
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
        en: "5% chance to retrigger skill per lost Soul Heart (up to 25%)",
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

export default sacrificialStake;

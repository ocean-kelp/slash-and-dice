import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Pact of Immortality",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const pactOfImmortality: Skill = {
  id: "pact-of-immortality",
  name,
  imageFilename: "Pact of Immortality.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MAGIC, SkillType.SPELL],
  elementType: ElementType.TOXIN,
  description: {
    en:
      "Cast Undying Pact on a monster. The contracted monster deals continuous damage to nearby enemies and leaves an afterimage for 1 second upon death. 10% chance to inflict Poison. Hits 4 times.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 0.9,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Venomous Signature",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +25%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Edict of Contagion",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Poison Chance +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Cruel Edge",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Size +15%",
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
        en: "Afterimage duration +1s",
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

export default pactOfImmortality;

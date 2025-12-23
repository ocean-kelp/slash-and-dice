import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Crushing Bite",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const crushingBite: Skill = {
  id: "crushing-bite",
  name,
  imageFilename: "Crushing Bite.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PHYSICAL, SkillType.MELEE, SkillType.BLEED],
  elementType: ElementType.BLEED,
  description: {
    en:
      "Summons the fangs of a giant wolf to bite and damage enemies. Hits 2 times. 25% chance to inflict Bleed.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 1.9,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Final Execution",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "20% chance of Skill Reactivation",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Target Locked",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Activation Chance +25%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Sharp Teeth",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +10%; Bleed Chance +18%",
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
          "Grants [Burst - Crushing Bite] on Skill Hit. Maximum Burst stacks +20. [Burst - Crushing Bite]: Damage taken from this skill +1% per stack",
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

export default crushingBite;

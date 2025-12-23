import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Traumatic Smite",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const traumaticSmite: Skill = {
  id: "traumatic-smite",
  name,
  imageFilename: "Traumatic Smite.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MELEE],
  elementType: ElementType.DIVINITY,
  description: {
    en:
      "Swings a hammer to knock back the enemy. Increases the Activation Chances of all Main Skills for 2 seconds upon use.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 3.33,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Massive Impact",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +35%; Skill Size +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Blacksmith",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Activation Chance +3%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Weakness Strike",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "15% chance to deal 3 damage; Skill Damage +25%",
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
        en: "Skill Size +35%; Skill Hit Count +1",
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

export default traumaticSmite;

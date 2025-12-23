import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Meditation",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const meditation: Skill = {
  id: "meditation",
  name,
  imageFilename: "Meditation.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  skillType: [SkillType.MAGIC],
  description: {
    en: "Accelerates auto-cast skill via Skill Haste. Base Skill Haste 10.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 0,
  activationChance: 0,
  modifications: {
    I: {
      name: {
        en: "Spell Sword",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Attack power increased by 10% of Skill Haste",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Stockades Acceleration",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Cooldown Recovery Speed +10%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Roulette Of Time",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "15% chance to reactivate subskill",
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
        en: "Skill Haste +5% for each equipped subskill",
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

export default meditation;

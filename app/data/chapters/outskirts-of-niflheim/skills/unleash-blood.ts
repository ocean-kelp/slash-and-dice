import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Unleash Blood",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const unleashBlood: Skill = {
  id: "unleash-blood",
  name,
  imageFilename: "unleash-blood.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.MAGIC, SkillType.SPELL],
  elementType: ElementType.BLEED,
  description: {
    en:
      "Causes a nearby enemy to hemorrhage, inflicting Bleed and dealing damage to up to 4 targets.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 1.35,
  cooldown: 7.0,
  activationChance: 0.65,
  modifications: {
    I: {
      name: {
        en: "Bloodletting",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Size +5%; ATK +30% per Bleed stack",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Tainted Blood",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Adds additional Bleed buff stack every 0.2s for 2s",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Gaping Wound",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +45%; Skill Size +15%",
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
        en: "Recasts Unleash Blood 1 additional time to enemies hit",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "outskirts-of-niflheim",
};

export default unleashBlood;

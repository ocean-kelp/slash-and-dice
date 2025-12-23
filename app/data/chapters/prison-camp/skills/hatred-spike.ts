import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Hatred Spike",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const hatredSpike: Skill = {
  id: "hatred-spike",
  name,
  imageFilename: "hatred-spike.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MELEE],
  elementType: ElementType.BLEED,
  description: {
    en: "A hateful thrust that causes bleeding over time.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 3.0,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Harsh Wound",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Bleed damage +10%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Rancor",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Bleed duration +2s",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Siphon",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "On hit, heal 5% HP",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    special: {
      name: {
        en: "Hatred's Edge",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Bleed stacks up to 3 times",
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

export default hatredSpike;

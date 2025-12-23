import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Ice Familiar",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const iceFamiliar: Skill = {
  id: "ice-familiar",
  name,
  imageFilename: "Ice Familiar.png",
  inGameId: "",
  activationType: ActivationType.SUMMON,
  skillType: [SkillType.MAGIC, SkillType.MELEE],
  elementType: ElementType.FROST,
  description: {
    en:
      "Summons an Ice Familiar that flies to enemies and explodes (fires 3 times). 10% chance to inflict Freeze.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 3,
  damage: 2.0,
  cooldown: 2.0,
  activationChance: 0.10,
  modifications: {
    I: {
      name: {
        en: "Madness Included",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +10%; Enemy Detection Range +25%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Split Included",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Attack Count +20%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Friend Included",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Freeze Chance +15%",
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
        en: "Skill Damage +50%; Fire 1 Icicle Spike on each attack",
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

export default iceFamiliar;

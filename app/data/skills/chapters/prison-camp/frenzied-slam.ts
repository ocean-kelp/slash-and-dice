import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Frenzied Slam",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const frenziedSlam: Skill = {
  id: "frenzied-slam",
  name,
  imageFilename: "Frenzied Slam.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.MELEE],
  description: {
    en:
      "A furious overhead slam that deals area damage and briefly stuns enemies.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 4.5,
  activationChance: 0.12,
  modifications: {
    I: {
      name: {
        en: "Crushing Blow",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +20%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Extended Stun",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Stun duration +0.5s",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Rending Impact",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "10% chance to apply Bleed (2 dmg/sec) for 4s",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    special: {
      name: {
        en: "Berserker's Will",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "When HP <40%, Skill Damage +30%",
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

export default frenziedSlam;

import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Vessel of Souls",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const vesselOfSouls: Skill = {
  id: "vessel-of-souls",
  name,
  imageFilename: "vessel-of-souls.png",
  inGameId: "",
  activationType: ActivationType.BUFF,
  description: {
    en:
      "Converts all Tag Skill Damage bonuses from relics into Basic Skill Damage (up to 100%).",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 5,
  damage: 0.0,
  activationChance: 0.0,
  modifications: {
    I: {
      name: {
        en: "Arcane Lightning Conduit",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Basic Skill Damage +15%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Storm's Omen",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "For each activated Attribute Synergy (Codex) or Tag Synergy, Attack Power and Attack Speed +2% (up to 10%)",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Thunder Sigil",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Weapon Skill Cooldown reduced by 1% on enemy kill",
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
          "Critical damage increases proportionally to Basic Skill Damage increased by Skill Effects (up to 15%)",
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

export default vesselOfSouls;

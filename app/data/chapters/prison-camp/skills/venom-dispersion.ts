import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Venom Dispersion",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const venomDispersion: Skill = {
  id: "venom-dispersion",
  name,
  imageFilename: "venom-dispersion.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PROJECTILE],
  elementType: ElementType.TOXIN,
  description: {
    en:
      "Sprays toxic liquid in a circle. Sprays 3 toxic bubbles. 60% chance to inflict Poison.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 1,
  damage: 1.10,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Giant Toxic Bubble",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Explodes upon enemy contact; Skill Damage +10%; Skill Size +50%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Spreading Plague",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Count +3; Skill Penetration Count +2",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Terrible Toxin",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Count +2; Poison Chance +15%",
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
        en: "Skill Count +5",
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

export default venomDispersion;

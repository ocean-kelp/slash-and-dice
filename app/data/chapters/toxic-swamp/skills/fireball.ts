import type { MultiLangText, Skill } from "@/data/skills/types.ts";
import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";

const name: MultiLangText = {
  en: "Fireball",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const fireball: Skill = {
  id: "fireball",
  name,
  imageFilename: "fireball.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.MAGIC, SkillType.TARGETTING],
  elementType: ElementType.FLAME,
  description: {
    en:
      "Summons a fireball that goes after an enemy and explodes. 15% chance to inflict Burn.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 2,
  damage: 2.20,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Living Bomb",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "1 additional explosion of 50% Damage and Size",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Rapid Combustion",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +25%; Skill Size +30%; Skill Movement Speed -30%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Hot Potato",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +55%",
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
        en: "Skill Damage +50%; Skill Size +50%; Burn Chance +50%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "toxic-swamp",
};

export default fireball;

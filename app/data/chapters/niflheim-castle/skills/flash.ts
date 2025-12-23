import type { MultiLangText, Skill } from "../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../types.ts";

const name: MultiLangText = {
  en: "Flash",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const flash: Skill = {
  id: "flash",
  name,
  imageFilename: "Flash.png",
  inGameId: "",
  activationType: ActivationType.MAIN,
  skillType: [SkillType.PHYSICAL, SkillType.TARGETTING],
  elementType: ElementType.BLEED,
  description: {
    en:
      "Cuts through a wide straight line, bisecting it; 110% chance to inflict Bleed.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 4,
  damage: 2.8,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "One Hit Kill",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en:
          "Does not increase in number or size; base damage increases by 105% when number increases",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Mind's Eye",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +40%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Quick Claw",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Count +1",
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
        en: "Reactivates immediately upon killing an enemy",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
  },
  excludedCharacters: [],
  chapterId: "niflheim-castle",
};

export default flash;

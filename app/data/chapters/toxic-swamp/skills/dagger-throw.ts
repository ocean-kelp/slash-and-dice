import type { MultiLangText, Skill } from "../../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../../types.ts";

const name: MultiLangText = {
  en: "Dagger Throw",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const daggerThrow: Skill = {
  id: "dagger-throw",
  name,
  imageFilename: "Dagger Throw.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.PHYSICAL, SkillType.CHAIN, SkillType.TOXIN],
  elementType: ElementType.TOXIN,
  description: {
    en:
      "Throws a toxin-laced dagger that ricochets between enemies. High chance to inflict Poison.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 2,
  damage: 2.0,
  cooldown: 6.0,
  activationChance: 1.10,
  modifications: {
    I: {
      name: {
        en: "Dagger Acrobatics",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Chain +2",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Venom Dagger",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "+35% damage",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Recoil Dagger",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Splits into 2 after first hit",
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
        en: "+15% damage; Chain +3",
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

export default daggerThrow;
import type { MultiLangText, Skill } from "../../../types.ts";
import { ActivationType, ElementType, SkillType } from "../../../types.ts";

const name: MultiLangText = {
  en: "Dagger Throw",
  es: "",
  kr: "",
  jp: "",
  "zh-Hans": "",
  "zh-Hant": "",
};

export const daggerThrow: Skill = {
  id: "dagger-throw",
  name,
  imageFilename: "Dagger Throw.png",
  inGameId: "",
  activationType: ActivationType.SUB,
  skillType: [SkillType.PHYSICAL, SkillType.CHAIN],
  elementType: ElementType.TOXIN,
  description: {
    en:
      "Throws a dagger laced with toxin that ricochets around while dealing damage. High chance to inflict Poison on hit.",
    es: "",
    kr: "",
    jp: "",
    "zh-Hans": "",
    "zh-Hant": "",
  },
  chapterUnlock: 2,
  damage: 2.00,
  activationChance: 0.15,
  modifications: {
    I: {
      name: {
        en: "Dagger Acrobatics",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Chain +2",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    II: {
      name: {
        en: "Venom Dagger",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Skill Damage +35%",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
    },
    III: {
      name: {
        en: "Recoil Dagger",
        es: "",
        kr: "",
        jp: "",
        "zh-Hans": "",
        "zh-Hant": "",
      },
      description: {
        en: "Dagger splits into 2 after hitting the first target",
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
        en: "Skill Damage +15%; Skill Chain +3",
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

export default daggerThrow;

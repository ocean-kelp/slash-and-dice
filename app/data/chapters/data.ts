// Chapters list and types for game chapters
export interface MultiLangText {
  en: string;
  es: string;
  kr: string;
  jp: string;
  "zh-Hans": string;
  "zh-Hant": string;
}

export interface Chapter {
  /**
   * Chapter id/slug (use this in skill.chapterId)
   * Example: 'prison-camp'
   */
  id: string;
  name: MultiLangText;
  order?: number;
}

export const chapters: Chapter[] = [
  {
    id: "prison-camp",
    name: {
      en: "Prison Camp",
      es: "",
      kr: "",
      jp: "",
      "zh-Hans": "",
      "zh-Hant": "",
    },
    order: 1,
  },
  {
    id: "toxic-swamp",
    name: {
      en: "Toxic Swamp",
      es: "",
      kr: "",
      jp: "",
      "zh-Hans": "",
      "zh-Hant": "",
    },
    order: 2,
  },
  {
    id: "outskirts-of-niflheim",
    name: {
      en: "Outskirts of Niflheim",
      es: "",
      kr: "",
      jp: "",
      "zh-Hans": "",
      "zh-Hant": "",
    },
    order: 3,
  },
  {
    id: "niflheim-castle",
    name: {
      en: "Niflheim Castle",
      es: "",
      kr: "",
      jp: "",
      "zh-Hans": "",
      "zh-Hant": "",
    },
    order: 4,
  },
  {
    id: "desert-of-the-red-sun",
    name: {
      en: "Desert of the Red Sun",
      es: "",
      kr: "",
      jp: "",
      "zh-Hans": "",
      "zh-Hant": "",
    },
    order: 5,
  },
];

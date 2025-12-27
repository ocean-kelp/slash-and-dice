export type Feature = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: preact.JSX.Element;
  translationKey: string;
};

export const getFeatures = (t: (key: string) => string): Feature[] => [
  {
    id: "characters",
    title: t("common.home.features.characters.title"),
    description: t("common.home.features.characters.description"),
    href: "characters",
    translationKey: "common.home.features.characters",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "skills",
    title: t("common.home.features.skills.title"),
    description: t("common.home.features.skills.description"),
    href: "skills",
    translationKey: "common.home.features.skills",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 3h4v4" />
        <path d="M21 3l-15 15" />
        <path d="M3 18h3v3" />
        <path d="M16.5 20c1.576 -1.576 2.5 -4.095 2.5 -6.5c0 -4.81 -3.69 -8.5 -8.5 -8.5c-2.415 0 -4.922 .913 -6.5 2.5l12.5 12.5z" />
      </svg>
    ),
  },
  {
    id: "artifacts",
    title: t("common.home.features.artifacts.title"),
    description: t("common.home.features.artifacts.description"),
    href: "artifacts",
    translationKey: "common.home.features.artifacts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

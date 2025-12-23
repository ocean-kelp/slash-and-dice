import { chapters as chaptersData } from "./data.ts";

export type { Chapter, MultiLangText } from "./data.ts";
export { chapters } from "./data.ts";

export const chaptersById = Object.fromEntries(
  chaptersData.map((c) => [c.id, c]),
);

export default chaptersData;

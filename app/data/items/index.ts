// Aggregator for all items from all chapters
// Currently empty as items are not yet implemented in chapters

export const allItems: Record<string, any> = {};

export const itemsList: any[] = Object.values(allItems);

export const getItemById = (id: string): any | undefined => allItems[id];

export default allItems;

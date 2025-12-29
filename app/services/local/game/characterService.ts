import type { Character } from "@/data/characters/types.ts";

export interface CharacterListItem {
  name: string;
  thumbnail: string;
  gemCost?: number;
}

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Global shared cache - loaded once and shared across all requests
let globalCharactersCache: Record<string, Character> | null = null;
let globalCharactersArray: Character[] | null = null;

class CharacterService {
  /**
   * Get characters record (lazy loaded, globally cached)
   */
  private async getCharacters(): Promise<Record<string, Character>> {
    if (!globalCharactersCache) {
      // Lazy import - only load when first accessed
      const { allCharacters } = await import("@/data/characters/index.ts");
      globalCharactersCache = allCharacters;
    }
    return globalCharactersCache;
  }

  /**
   * Get characters array (cached)
   */
  private async getCharactersArray(): Promise<Character[]> {
    if (!globalCharactersArray) {
      const characters = await this.getCharacters();
      globalCharactersArray = Object.values(characters) as Character[];
    }
    return globalCharactersArray;
  }

  /**
   * Get character data by name
   * @param name - Character name (e.g., "knight")
   * @returns Character data or undefined if not found
   */
  async getByName(name: string): Promise<Character | undefined> {
    const characters = await this.getCharactersArray();
    return characters.find((c) => c.name === name);
  }

  /**
   * Search characters by name
   * @param searchTerm - Search term to match against character name
   * @returns Array of characters with key property
   */
  async searchByName(
    searchTerm: string,
  ): Promise<Array<Character & { key: string }>> {
    const query = searchTerm.toLowerCase();
    const characters = await this.getCharactersArray();
    return characters
      .filter((char) => char.name.toLowerCase().includes(query))
      .map((char) => ({ ...char, key: char.name }));
  }

  /**
   * Get paginated characters with search filter
   * @param options - Pagination and filter options
   * @returns Paginated result with items and metadata
   */
  async getPaginated(options: {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
  }): Promise<PaginatedResult<Character & { key: string }>> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 24;
    const searchTerm = options.searchTerm?.toLowerCase() || "";

    const baseArray = await this.getCharactersArray();
    const indices: number[] = [];

    // Build indices array with search filter
    for (let i = 0; i < baseArray.length; i++) {
      const character = baseArray[i];

      // Apply search filter
      if (searchTerm && !character.name.toLowerCase().includes(searchTerm)) {
        continue;
      }

      indices.push(i);
    }

    // Build filtered array with key property
    const filtered = indices.map((i) => ({
      ...baseArray[i],
      key: baseArray[i].name,
    }));

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    const items = filtered.slice(startIndex, endIndex);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  /**
   * Get thumbnail path for a character
   * @param name - Character name (e.g., "knight")
   * @returns Path to character thumbnail
   */
  getThumbnail(name: string): string {
    return `/game/characters/${name}/thumbnail.png`;
  }
}

// Export singleton instance
export const characterService = new CharacterService();

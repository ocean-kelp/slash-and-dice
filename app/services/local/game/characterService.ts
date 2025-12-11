import type { Character } from "@/data/characters/types.ts";
import { allCharacters } from "@/data/characters/index.ts";

export interface CharacterListItem {
  name: string;
  thumbnail: string;
  gemCost?: number;
}

class CharacterService {
  private characters: Character[] = Object.values(allCharacters) as Character[];

  /**
   * Get all characters (lightweight - only name, thumbnail, and gem cost)
   * @returns Array of character names with thumbnails and gem costs
   */
  getAllCharacters(): CharacterListItem[] {
    return this.characters.map((c) => ({
      name: c.name,
      thumbnail: this.getThumbnail(c.name),
      gemCost: c.price?.gem,
    }));
  }

  /**
   * Get character data by name
   * @param name - Character name (e.g., "knight")
   * @returns Character data or undefined if not found
   */
  getByName(name: string): Character | undefined {
    return this.characters.find((c) => c.name === name);
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

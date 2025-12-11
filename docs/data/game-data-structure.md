# Game Data Structure

This document outlines the structure and conventions for storing and accessing
game data in Slash & Dice.

## Overview

We use a **hybrid approach** combining static JSON files with Deno KV for
optimal performance:

- **Static JSON** - Character metadata, stats, and abilities (read-heavy, rarely
  changes)
- **Static Assets** - Images and GIFs (served from `/static/characters/`)
- **Deno KV** - User-specific data (favorites, collections, ratings)

## Directory Structure

```
app/
  data/
    characters/
      characters.json       # All character data
  data/
    characters/
      types.ts             # Canonical TypeScript interfaces (source of truth)
      index.ts             # Exports `allCharacters` collection
      {character-name}/
        index.ts           # Per-character module (exports character object)
  services/
    local/
      data/
        characterService.ts # Service layer for data access
  static/
    characters/
      {character-name}/
        thumbnail.png      # Character thumbnail
        idle.gif          # Idle animation
        attack.gif        # Attack animation
        special.gif       # Special animation
```

## Data Format

### Character JSON Structure

Location: `app/data/characters/characters.json`

```json
[
  {
    "id": 1,
    "name": "knight",
    "stats": {
      "id": 1,
      "hp": 6,
      "critRate": 0.15,
      "atkSpeed": 1.3,
      "moveSpeed": 8.5,
      "skillDmg": 0.23,
      "atkPower": 31
    }
  }
]
```

**Key Conventions:**

- `name` field serves as the character ID (used in URLs and file paths)
- All property names use **camelCase** (not kebab-case or snake_case)
- Character names should be lowercase for consistency

### TypeScript Models (canonical)

Location: `app/data/characters/types.ts`

```typescript
export interface CharacterStats {
  id: number;
  hp: number;
  critRate: number;
  atkSpeed: number;
  moveSpeed: number;
  skillDmg: number;
  atkPower: number;
}

export interface CharacterPrice {
  gem?: number;
  riftstone?: number;
  soulstone?: number;
}

export interface Character {
  id?: number; // optional in code modules
  name: string;
  price?: CharacterPrice;
  stats: CharacterStats;
}

// The `types.ts` file is the single source of truth for character shapes.
// Individual characters live under `app/data/characters/{name}/index.ts` and
// the collection `allCharacters` is exported from `app/data/characters/index.ts`.
```

## Asset Organization

### File Naming Convention

All character assets follow a consistent naming pattern:

```
/characters/{character-name}/{asset-type}.{extension}
```

**Standard Asset Types:**

- `thumbnail.png` - Character portrait/icon
- `idle.gif` - Idle animation
- `attack.gif` - Attack animation
- `special.gif` - Special ability animation
- `portrait.webp` - High-res character art (optional)

**Example:**

```
/characters/knight/thumbnail.png
/characters/knight/idle.gif
/characters/mage/thumbnail.png
```

## Service Layer

### Character Service

Location: `app/services/local/game/characterService.ts`

The character service provides a clean API for accessing character data and
assets. It now consumes the TypeScript `allCharacters` collection and the
canonical `Character` type from `app/data/characters`.

```typescript
import { characterService } from "@/services/local/game/characterService.ts";
import type { Character } from "@/data/characters/types.ts";

// Get all characters (lightweight - only name + thumbnail)
const characters = characterService.getAllCharacters();
// Returns: CharacterListItem[] = [{ name: "knight", thumbnail: "/game/characters/knight/thumbnail.png" }]

// Get full character data by name
const knight: Character | undefined = characterService.getByName("knight");

// Get asset path for a character
const thumbnail = characterService.getThumbnail("knight");
// Returns: "/game/characters/knight/thumbnail.png"
```

**Key Methods:**

1. **`getAllCharacters(): CharacterListItem[]`**
   - Returns lightweight list of all characters
   - Only includes name + thumbnail path
   - Use for character list pages to avoid loading full data

2. **`getByName(name: string): Character | undefined`**
   - Returns full character data by name
   - Use for character detail pages

3. **`getThumbnail(name: string): string`**

- Returns thumbnail path for a character
- Follows convention: `/game/characters/{name}/thumbnail.png` (service generates
  this)

## Why This Structure?

### Convention Over Configuration

We **don't store asset paths in JSON** because they follow a predictable
pattern:

❌ **Don't do this:**

```json
{
  "name": "knight",
  "assets": {
    "thumbnail": "/characters/knight/thumbnail.png",
    "idle": "/characters/knight/idle.gif"
  }
}
```

✅ **Do this instead:**

```json
{
  "name": "knight",
  "stats": { ... }
}
```

The service generates asset paths automatically based on character name.

### Benefits

1. **Performance** - Static data loads instantly, no DB queries
2. **SEO** - All character pages can be statically generated
3. **Scalability** - Easy to add hundreds of characters
4. **Type Safety** - TypeScript validates data structure
5. **Maintainability** - Single source of truth in JSON files
6. **DRY** - No duplication of file paths

## Adding New Characters

1. **Add character data to JSON:**
   ```json
   {
     "id": 2,
     "name": "mage",
     "stats": { ... }
   }
   ```

2. **Add character assets:**
   ```
   app/static/characters/mage/
     ├── thumbnail.png
     ├── idle.gif
     └── attack.gif
   ```

3. **That's it!** The service automatically picks up new characters.

## Adding New Asset Types

To add a new asset type (e.g., "portrait"):

1. **Update the service** to add a getter method:
   ```typescript
   getPortrait(name: string): string {
     return `/characters/${name}/portrait.webp`;
   }
   ```

2. **Add the asset files** to character folders

3. **Use the new method** in your components

## Future Considerations

### When to Use Deno KV

Use the database for:

- User favorites/collections
- Community ratings and votes
- User-generated content
- Dynamic content that changes frequently

### When to Add Paths to JSON

Only add asset paths to JSON if:

- You have inconsistent naming (different characters use different formats)
- You want to override specific assets
- You're hosting assets on a CDN with different URLs

Otherwise, stick with convention-based paths generated by the service.

## Internationalization

Character names in the UI should be translated:

```json
// locales/en/characters.json
{
  "characters": {
    "knight": {
      "name": "Knight",
      "description": "A brave warrior..."
    }
  }
}
```

The `name` field in the data JSON remains lowercase English (used as ID), but
display names come from translation files.

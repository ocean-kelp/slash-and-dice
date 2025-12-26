# what is an artifact for us in dungeon slasher?

- these are items that the player finds on chests or other loot sources and they
  equip, max 6 + 1 special slot activated by a specific consumable.

- they have attrs similar to those of a skill:

  - a name
  - an image
  - a list of effect descriptions texts
  - an unlocking requirement which is a textual description of what the player
    needs to do to unlock it
  - a rarity level, on the game these are shown as stars but that does not means
    that we need them like that too, there is: 1, 2, 3 and 4 stars rarity levels
  - sources:
    - some artificacts can be exclusively obtained by a specific character too,
      so if diff character then they wont be able to obtain this
    - some artifcats can be exclusively obtained by killing a certain boss too
      and this has a loot probability associated with it
    - some artifacts can be exclusively obtained by interacting with an event
      npc
    - some artifacts can be exclusively obtained by interacting with in game
      npcs that are not event related
    - some artifacts can be exclusively obtained by interacting with a specific
      item
    - some artifcats can be exclusively obtained by completing a specific in
      game secret puzzle, puzzle-ish interactions with npc do not count as this
      source category
  - type of artifacts:
    - usable items: they take 1 inventory slot but can be used once and then
      disappear
    - consumable items: immediate effect on use
    - idk what name to give to this type but these are the items that are not
      consumable or usable, they just take a slot and can only be discarded or
      replaced with another artifact
  - some artifacts have an special type (additional to the normal type mentioned
    above) which is to be cursed, cursed afticacts can only be obtained by
    sacrificing hearts on a special room or they can be obtained by events. This
    could also be counted as a source too but idk, regardless of that "cursed"
    has to be an special attr of the artifact yes or yes

  - additional attrs which are literally the same as skills:

    - belong to 1 chapter
    - items affect either the player base stats or the skill stats, this is done
      by targetting:
      - activation type skills
      - elemental type skills
      - skill type

      they can affect 0 or more of those aggreggated types, for example an item
      can be: "Bleed Darkness" which indicates that the item effects apply to
      skills that have the elemental type of bleed or darkness or both, tho it
      will apply once. And there is another notation, check this one for
      example: "ALL" that indicates that it affects absolutely all skills, and
      there is this other: "bleed+darkness" that indicates that it affects only
      skills that have both bleed and darkness elemental types. The affectation
      can also be like this: "main skill darkness" which indicates that it will
      affect skills that are either skill-type of "main skill" or elemental type
      of "darkness". So the notation is flexible enough to allow a lot of
      combinations.

      - skills that affect player base stats just indicate it on the effect
        description text, they dont have a "tag" per se but we could map it as a
        base stat by manually reading it from the description text

  - now, artifacts from an event can persist on the game even after the event is
    gone, meaning that we might need a field to indicate if the artificat
    persists after the event is gone or not

## Final Model Structure

### Core Files

```
app/data/artifacts/
├── types.ts              # TypeScript interfaces and enums
├── index.ts              # Main aggregator and service
└── readme.md             # This documentation

app/data/chapters/[chapter]/
└── artifacts/
    └── index.ts         # Chapter-specific artifacts
```

### Key Interfaces

**Artifact Interface:**

```typescript
interface Artifact {
  id: string;
  name: MultiLangText;
  imageFilename: string;
  rarity: Rarity; // 1-4 stars
  type: ArtifactType; // usable | consumable | equipment
  sources: Source[]; // How to obtain
  effects: EffectDescription[]; // What it does
  unlockingRequirement: MultiLangText;
  targets: ArtifactTarget; // Which skills it affects
  chapterId: string; // Which chapter it belongs to
  persistsAfterEvent?: boolean; // Event artifact behavior
  cursedInfo?: { // Cursed artifact information
    currencyId: CurrencyId; // "heart" currency
    amount: number; // How many hearts required (usually equals rarity)
  };
}
```

**Targeting System:**

```typescript
interface ArtifactTarget {
  activationTypes?: ActivationType[]; // [ActivationType.MAIN, ActivationType.SUB]
  elementTypes?: ElementType[]; // [ElementType.BLEED, ElementType.DARKNESS]
  skillTypes?: SkillType[]; // [SkillType.PHYSICAL, SkillType.MAGIC]
}
```

**Important:** Use enum values from the skills module, not raw strings. This
ensures type safety and consistency across the codebase.

**Source System:**

```typescript
interface Source {
  type: SourceType; // How it's obtained
  description: MultiLangText;
  probability?: number; // For boss drops
  character?: string; // For character exclusives
  boss?: string; // For boss-specific drops
  item?: string; // For item interactions
}
```

### Service Layer

The `artifactService` provides filtering methods:

- `getAllArtifacts()` - Get all artifacts
- `getArtifactsByChapter(chapterId)` - Filter by chapter
- `getArtifactsByRarity(rarity)` - Filter by star rating
- `getCursedArtifacts()` - Get cursed artifacts
- `getArtifactsByElement(elementType)` - Filter by element
- `getArtifactsByType(type)` - Filter by artifact type

### Usage Example

```typescript
import { artifactService } from "@/data/artifacts";

// Get all 4-star artifacts
const fourStarArtifacts = artifactService.getArtifactsByRarity(4);

// Get all cursed artifacts from Desert of the Red Sun
const cursedDesertArtifacts = artifactService
  .getArtifactsByChapter("desert-of-the-red-sun")
  .filter((artifact) => artifact.isCursed);
```

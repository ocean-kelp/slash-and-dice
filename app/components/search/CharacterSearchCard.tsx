import type { Character } from "@/data/characters/types.ts";
import { characterService } from "@/services/local/game/characterService.ts";

type Props = {
  character: Character;
  characterKey: string;
};

export default function CharacterSearchCard(
  { character, characterKey }: Props,
) {
  const thumbnailPath = characterService.getThumbnail(character.name);

  return (
    <a
      href={`characters/${characterKey}`}
      class="group relative bg-gray-800/30 rounded-xl border border-purple-500/20 overflow-hidden backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:bg-purple-900/20 transition-all duration-300"
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      <div class="relative flex items-center gap-4 p-4">
        {/* Character Thumbnail */}
        <div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-colors bg-gray-900/30 flex items-center justify-center">
          <img
            src={thumbnailPath}
            alt={character.name}
            class="w-full h-full object-contain"
            style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            loading="lazy"
          />
        </div>

        {/* Character Info */}
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-bold text-purple-100 group-hover:text-white transition-colors truncate capitalize">
            {character.name}
          </h3>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-xs text-gray-400 flex items-center gap-0.5">
              {Array.from({ length: character.stats.hp }).map((_, i) => (
                <img
                  key={i}
                  src="/game/data/currencies/heart.png"
                  alt="HP"
                  class="w-3.5 h-3.5"
                  style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                />
              ))}
            </span>
            <span class="text-xs text-gray-400 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" />
                <path d="M6.5 11.5l6 6" />
              </svg>
              {character.stats.atkPower} ATK
            </span>
          </div>
        </div>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

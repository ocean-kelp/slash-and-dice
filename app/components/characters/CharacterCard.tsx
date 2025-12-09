import type { CharacterListItem } from "@/services/local/game/characterService.ts";

type CharacterCardProps = {
  character: CharacterListItem;
  locale: string;
};

export default function CharacterCard(
  { character, locale }: CharacterCardProps,
) {
  return (
    <a
      href={`/${locale}/characters/${character.name}`}
      class="group relative rounded-xl border-4 border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 overflow-hidden"
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 rounded-xl bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      {/* Character Image - Designed for 2D sprites with transparent backgrounds */}
      <div class="relative aspect-square overflow-hidden flex items-center justify-center p-4">
        <img
          src={character.thumbnail}
          alt={character.name}
          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
          loading="lazy"
        />
      </div>

      {/* Character Name and Cost */}
      <div class="relative p-4 bg-gray-800/90 backdrop-blur-sm">
        <h3 class="text-lg font-bold text-purple-100 group-hover:text-white transition-colors capitalize text-center">
          {character.name}
        </h3>

        {/* Gem Cost */}
        {character.gemCost !== undefined && (
          <div class="flex items-center justify-center gap-1 mt-2">
            <img
              src="/game/data/currencies/gem.png"
              alt="Gems"
              class="w-5 h-5"
              style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            />
            <span class="text-sm font-semibold text-purple-200">
              {character.gemCost === 0
                ? "Free"
                : character.gemCost.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

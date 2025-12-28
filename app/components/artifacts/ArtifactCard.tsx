import type { Artifact } from "@/data/artifacts/types.ts";
import { artifactService } from "@/services/local/game/artifactService.ts";

interface ArtifactCardProps {
  artifact: Artifact;
  locale?: string;
  searchTerm?: string;
}

function HighlightText(
  { text, searchTerm }: { text: string; searchTerm: string },
) {
  if (!searchTerm) return <span>{text}</span>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part)
          ? (
            <mark
              key={index}
              class="bg-amber-400 text-black rounded px-1"
            >
              {part}
            </mark>
          )
          : <span key={index}>{part}</span>
      )}
    </span>
  );
}

export default function ArtifactCard(
  { artifact, locale = "en", searchTerm = "" }: ArtifactCardProps,
) {
  const imagePath = artifactService.getImagePath(artifact.imageFilename);
  const name = artifact.name[locale as keyof typeof artifact.name] ||
    artifact.name.en;

  // Type badge styling
  const typeConfig = {
    usable: { bg: "bg-yellow-600/30", text: "text-yellow-300" },
    consumable: { bg: "bg-green-600/30", text: "text-green-300" },
    equipment: { bg: "bg-blue-600/30", text: "text-blue-300" },
  };

  const typeStyle = typeConfig[artifact.type as keyof typeof typeConfig] ||
    typeConfig.equipment;

  return (
    <a
      href={`/${locale}/artifacts/${artifact.id}`}
      class="group relative break-inside-avoid mb-4 block hover:scale-[1.02] transition-transform"
    >
      {/* Artifact Image Container with Transparent Background */}
      <div class="relative w-full aspect-square flex flex-col items-center justify-center py-6">
        {/* Artifact Icon - centered and larger */}
        <div class="flex-1 flex items-center justify-center">
          <img
            src={imagePath}
            alt={name}
            class="max-w-[90px] max-h-[90px] w-full h-full object-contain drop-shadow-2xl"
            style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Rarity Stars - centered below image */}
        <div
          class={`mt-2 flex items-center justify-center ${
            artifact.rarity <= 2 ? "-space-x-1" : "gap-0.5"
          }`}
        >
          {artifact.rarity === 4
            ? (
              <img
                src={artifact.cursedInfo
                  ? "/game/data/other/rarity-4-star-red.png"
                  : "/game/data/other/rarity-4-star.png"}
                alt="4 stars"
                class="h-10 w-auto"
                style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
              />
            )
            : (
              Array.from({ length: artifact.rarity }).map((_, i) => (
                <img
                  key={i}
                  src={artifact.cursedInfo
                    ? "/game/data/other/rarity-1-star-red.png"
                    : "/game/data/other/rarity-1-star.png"}
                  alt="star"
                  class="h-8 w-auto"
                  style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                />
              ))
            )}
        </div>
      </div>

      {/* Artifact Info */}
      <div class="mt-2 rounded-lg border-2 border-purple-500/20 bg-gray-800/90 backdrop-blur-sm p-4 hover:border-purple-500/50 transition-colors">
        <h3 class="text-xl font-bold text-purple-100 text-center mb-2">
          <HighlightText text={name} searchTerm={searchTerm} />
        </h3>

        {/* Effects Summary */}
        {artifact.effects.length > 0 && (
          <p class="text-sm text-gray-400 text-center mb-3 line-clamp-2">
            <HighlightText
              text={artifact.effects[0].text.en}
              searchTerm={searchTerm}
            />
          </p>
        )}

        {/* Type Badge */}
        <div class="flex justify-center mb-3 gap-2">
          <span
            class={`px-2 py-1 ${typeStyle.bg} ${typeStyle.text} text-xs rounded capitalize`}
          >
            {artifact.type}
          </span>
          {artifact.cursedInfo && (
            <span class="px-2 py-1 bg-red-600/30 text-red-300 text-xs rounded capitalize font-semibold">
              Cursed
            </span>
          )}
        </div>

        {/* Chapter Badge */}
        <div class="flex items-center justify-center gap-2 text-sm">
          <span class="px-2 py-0.5 bg-purple-600/30 text-purple-200 rounded capitalize">
            {artifact.chapterId.replace(/-/g, " ")}
          </span>
        </div>

        {/* Cursed Cost Badge */}
        {artifact.cursedInfo && (
          <div class="mt-3 flex items-center justify-center gap-0.5">
            {Array.from({ length: artifact.cursedInfo.amount }).map((_, i) => (
              <img
                key={i}
                src="/game/data/currencies/heart.png"
                alt="heart"
                class="w-4 h-4"
                style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
              />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

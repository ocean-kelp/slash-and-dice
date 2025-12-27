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

  // Determine rarity color and label
  const rarityConfig = {
    1: { color: "gray", label: "★", glow: "rgba(156,163,175,0.3)" },
    2: { color: "green", label: "★★", glow: "rgba(34,197,94,0.3)" },
    3: { color: "blue", label: "★★★", glow: "rgba(59,130,246,0.3)" },
    4: { color: "purple", label: "★★★★", glow: "rgba(168,85,247,0.3)" },
  };

  const rarity = rarityConfig[artifact.rarity as keyof typeof rarityConfig] ||
    rarityConfig[1];

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
      {/* Artifact Image Container */}
      <div
        class="relative w-full aspect-square flex items-center justify-center p-4 rounded-t-lg bg-linear-to-br from-gray-800 to-gray-900 border-2"
        style={`border-color: ${rarity.color}; box-shadow: 0 0 20px ${rarity.glow};`}
      >
        {/* Cursed Indicator */}
        {artifact.cursedInfo && (
          <div class="absolute top-2 right-2 z-20 bg-red-600/90 backdrop-blur-sm rounded-full p-1.5 border border-red-400/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-red-100"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}

        {/* Rarity Stars */}
        <div class="absolute top-2 left-2 z-20">
          <span class={`text-${rarity.color}-400 text-sm font-bold`}>
            {rarity.label}
          </span>
        </div>

        {/* Artifact Icon */}
        <img
          src={imagePath}
          alt={name}
          class="relative z-10 w-[60%] h-[60%] object-contain drop-shadow-lg"
          style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
          loading="lazy"
        />
      </div>

      {/* Artifact Info */}
      <div class="rounded-b-lg border-2 border-t-0 bg-gray-800/90 backdrop-blur-sm p-4 hover:border-purple-500/50 transition-colors border-purple-500/20">
        <h3 class="text-lg font-bold text-purple-100 text-center mb-2 line-clamp-2">
          <HighlightText text={name} searchTerm={searchTerm} />
        </h3>

        {/* Type Badge */}
        <div class="flex justify-center mb-3">
          <span
            class={`px-2 py-1 ${typeStyle.bg} ${typeStyle.text} text-xs rounded capitalize`}
          >
            {artifact.type}
          </span>
        </div>

        {/* Effects Summary */}
        {artifact.effects.length > 0 && (
          <div class="mb-3 text-xs text-gray-400 text-center line-clamp-2">
            {artifact.effects[0].text.en}
          </div>
        )}

        {/* Chapter Badge */}
        <div class="flex items-center justify-center gap-2 text-xs">
          <span class="px-2 py-0.5 bg-purple-600/30 text-purple-200 rounded capitalize">
            {artifact.chapterId.replace(/-/g, " ")}
          </span>
        </div>
      </div>
    </a>
  );
}

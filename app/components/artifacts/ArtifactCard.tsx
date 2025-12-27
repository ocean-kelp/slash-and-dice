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
      {/* Artifact Image Container with Transparent Background */}
      <div class="relative w-full aspect-square flex flex-col items-center justify-center py-6">
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

        {/* Artifact Icon - centered and larger */}
        <div class="flex-1 flex items-center justify-center">
          <img
            src={imagePath}
            alt={name}
            class="w-[70%] h-[70%] object-contain drop-shadow-2xl"
            style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            loading="lazy"
          />
        </div>

        {/* Rarity Stars - centered below image */}
        <div class="mt-2">
          <span class="text-yellow-400 text-lg font-bold drop-shadow-lg">
            {rarity.label}
          </span>
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
        <div class="flex justify-center mb-3">
          <span
            class={`px-2 py-1 ${typeStyle.bg} ${typeStyle.text} text-xs rounded capitalize`}
          >
            {artifact.type}
          </span>
        </div>

        {/* Chapter Badge */}
        <div class="flex items-center justify-center gap-2 text-sm">
          <span class="px-2 py-0.5 bg-purple-600/30 text-purple-200 rounded capitalize">
            {artifact.chapterId.replace(/-/g, " ")}
          </span>
        </div>
      </div>
    </a>
  );
}

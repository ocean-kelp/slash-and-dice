import type { Artifact } from "@/data/artifacts/types.ts";
import { artifactService } from "@/services/local/game/artifactService.ts";

type Props = {
  artifact: Artifact;
};

export default function ArtifactSearchCard({ artifact }: Props) {
  const iconPath = artifactService.getImagePath(artifact.imageFilename);

  const rarityStars = "⭐".repeat(artifact.rarity);

  return (
    <a
      href={`artifacts/${artifact.id}`}
      class="group relative bg-amber-900/20 rounded-xl border border-amber-500/20 overflow-hidden backdrop-blur-sm hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:bg-amber-900/30 transition-all duration-300"
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      <div class="relative flex items-center gap-4 p-4">
        {/* Artifact Icon */}
        <div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-amber-500/30 group-hover:border-amber-500/50 transition-colors bg-gray-900/30 flex items-center justify-center">
          <img
            src={iconPath}
            alt={artifact.name.en}
            class="w-full h-full object-contain p-1"
            style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            loading="lazy"
          />
        </div>

        {/* Artifact Info */}
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-bold text-purple-100 group-hover:text-white transition-colors truncate">
            {artifact.name.en}
          </h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-amber-400">{rarityStars}</span>
            <span class="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 capitalize">
              {artifact.type}
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

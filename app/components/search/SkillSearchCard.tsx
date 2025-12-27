import type { Skill } from "@/data/skills/types.ts";
import { skillService } from "@/services/local/game/skillService.ts";

type Props = {
  skill: Skill;
};

export default function SkillSearchCard({ skill }: Props) {
  const iconPath = skillService.getImagePath(skill.imageFilename);

  return (
    <a
      href={`skills/${skill.id}`}
      class="group relative bg-pink-900/20 rounded-xl border border-pink-500/20 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:bg-pink-900/30 transition-all duration-300"
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      <div class="relative flex items-center gap-4 p-4">
        {/* Skill Icon */}
        <div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-pink-500/30 group-hover:border-pink-500/50 transition-colors bg-gray-900/30 flex items-center justify-center">
          <img
            src={iconPath}
            alt={skill.name.en}
            class="w-full h-full object-contain p-1"
            style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
            loading="lazy"
          />
        </div>

        {/* Skill Info */}
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-bold text-purple-100 group-hover:text-white transition-colors truncate">
            {skill.name.en}
          </h3>
          <div class="flex items-center gap-2 mt-1 flex-wrap">
            <span class="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 capitalize">
              {skill.activationType}
            </span>
            {skill.elementType && (
              <span class="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30 capitalize">
                {skill.elementType}
              </span>
            )}
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

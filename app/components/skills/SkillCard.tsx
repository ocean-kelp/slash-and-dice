import type { Skill } from "@/data/skills/types.ts";
import { skillService } from "@/services/local/game/skillService.ts";

interface SkillCardProps {
  skill: Skill;
  locale?: string;
}

export default function SkillCard({ skill, locale = "en" }: SkillCardProps) {
  const imagePath = skillService.getImagePath(skill.imageFilename);
  const name = skill.name[locale as keyof typeof skill.name] || skill.name.en;
  const description =
    skill.description[locale as keyof typeof skill.description] ||
    skill.description.en;

  const activationTypeLabel = skill.activationType === "main"
    ? "Main"
    : skill.activationType === "subskill"
    ? "Sub"
    : "Buff";

  return (
    <div class="group relative break-inside-avoid mb-4">
      {/* Skill Image Container with Prism Box */}
      <div class="relative w-full aspect-square flex items-end justify-center pb-6">
        {/* Prism Box Container */}
        <img
          src="/game/data/skills/skill-prism-box-container.png"
          alt=""
          class="absolute inset-0 w-full h-full object-contain"
          style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
        />

        {/* Skill Icon */}
        <img
          src={imagePath}
          alt={name}
          class="relative z-10 w-8 h-8 object-contain"
          loading="lazy"
        />
      </div>

      {/* Skill Info */}
      <div class="mt-2 rounded-lg border-2 border-purple-500/20 bg-gray-800/90 backdrop-blur-sm p-3 hover:border-purple-500/50 transition-colors">
        <h3 class="text-xs font-bold text-purple-100 text-center mb-1">
          {name}
        </h3>
        <p class="text-[10px] text-gray-400 text-center mb-2">
          {description}
        </p>
        <div class="flex items-center justify-center gap-2 text-[10px]">
          <span class="px-2 py-0.5 bg-purple-600/30 text-purple-200 rounded">
            {activationTypeLabel}
          </span>
          <span class="text-orange-400">
            {(skill.damage * 100).toFixed(0)}% DMG
          </span>
        </div>
      </div>
    </div>
  );
}

import type { Skill } from "@/data/skills/types.ts";
import { skillService } from "@/services/local/game/skillService.ts";

interface SkillCardProps {
  skill: Skill;
  locale?: string;
  searchTerm?: string;
}

function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    '<mark class="bg-yellow-300/80 text-yellow-900 rounded px-1">$1</mark>',
  );
}

export default function SkillCard(
  { skill, locale = "en", searchTerm = "" }: SkillCardProps,
) {
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

  const highlightedName = highlightText(name, searchTerm);
  const highlightedDescription = highlightText(description, searchTerm);

  return (
    <a
      href={`/${locale}/skills/${skill.id}`}
      class="group relative break-inside-avoid mb-4 block hover:scale-[1.02] transition-transform"
    >
      {/* Skill Image Container with Prism Box */}
      <div class="relative w-full aspect-square flex items-center justify-center pt-4">
        {/* Prism Box Container */}
        <img
          src="/game/data/skills/skill-prism-box-container.png"
          alt=""
          class="absolute inset-0 w-full h-full object-contain"
          style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
        />

        {/* Skill Icon - scales relative to container */}
        <img
          src={imagePath}
          alt={name}
          class="relative z-10 w-[35%] h-[35%] object-contain"
          style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
          loading="lazy"
        />
      </div>

      {/* Skill Info */}
      <div class="mt-2 rounded-lg border-2 border-purple-500/20 bg-gray-800/90 backdrop-blur-sm p-4 hover:border-purple-500/50 transition-colors">
        <h3 class="text-xl font-bold text-purple-100 text-center mb-2">
          <span dangerouslySetInnerHTML={{ __html: highlightedName }} />
        </h3>
        <p class="text-sm text-gray-400 text-center mb-3">
          <span dangerouslySetInnerHTML={{ __html: highlightedDescription }} />
        </p>

        {/* Skill Type Badges */}
        {skill.skillType && skill.skillType.length > 0 && (
          <div class="flex flex-wrap gap-1.5 justify-center mb-3">
            {skill.skillType.filter(Boolean).map((type) => (
              <span
                key={type}
                class="px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded"
              >
                {type
                  .split("_")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() +
                      word.slice(1).toLowerCase(),
                  )
                  .join(" ")}
              </span>
            ))}
          </div>
        )}

        {/* Element Type Badge */}
        {skill.elementType && (
          <div class="flex justify-center mb-3">
            <span class="px-2 py-1 bg-cyan-600/30 text-cyan-300 text-xs rounded">
              {skill.elementType
                .charAt(0)
                .toUpperCase() + skill.elementType.slice(1).toLowerCase()}
            </span>
          </div>
        )}

        <div class="flex items-center justify-center gap-2 text-sm">
          <span class="px-2 py-0.5 bg-purple-600/30 text-purple-200 rounded">
            {activationTypeLabel}
          </span>
          <span class="text-orange-400">
            {(skill.damage * 100).toFixed(0)}% DMG
          </span>
        </div>
      </div>
    </a>
  );
}

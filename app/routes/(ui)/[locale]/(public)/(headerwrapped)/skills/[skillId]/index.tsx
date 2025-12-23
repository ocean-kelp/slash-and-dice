import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import { skillService } from "@/services/local/game/skillService.ts";
import type { Skill } from "@/data/skills/types.ts";
import { chapters } from "@/data/chapters/index.ts";
import BackButton from "./(_islands)/BackButton.tsx";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const { skillId } = ctx.params;
    const skill = skillService.getById(skillId);

    if (!skill) {
      return new Response("Skill not found", { status: 404 });
    }

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        skill,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  skill?: Skill;
};

export default function SkillDetailPage({ data, url }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});
  const skill = data.skill;
  const locale = url.pathname.split("/")[1] || "en";

  if (!skill) {
    return <div>Skill not found</div>;
  }

  const name = skill.name[locale as keyof typeof skill.name] || skill.name.en;
  const description =
    skill.description[locale as keyof typeof skill.description] ||
    skill.description.en;
  const imagePath = skillService.getImagePath(skill.imageFilename);

  const activationTypeLabel = skill.activationType === "main"
    ? "Main Skill"
    : skill.activationType === "subskill"
    ? "Subskill"
    : "Buff";

  const chapter = chapters.find((c) => c.id === skill.chapterId);
  const chapterName = chapter?.name[locale as keyof typeof chapter.name] ||
    chapter?.name.en || "Unknown";

  return (
    <>
      <head>
        <title>{name} - Skills - Slash & Dice</title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-4xl mx-auto">
          {/* Back Link */}
          <BackButton label={t("common.skills.backLink")} />

          {/* Main Card */}
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
            {/* Header Section */}
            <div class="bg-linear-to-r from-purple-900/40 via-purple-800/30 to-purple-900/40 p-8 border-b border-purple-500/20">
              <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                {/* Skill Image */}
                <div class="relative w-48 h-48 shrink-0 mx-auto md:mx-0">
                  <img
                    src="/game/data/skills/skill-prism-box-container.png"
                    alt=""
                    class="absolute inset-0 w-full h-full object-contain"
                    style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                  />
                  <div class="absolute inset-0 flex items-center justify-center pt-6">
                    <img
                      src={imagePath}
                      alt={name}
                      class="w-[45%] h-[45%] object-contain"
                      style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                    />
                  </div>
                </div>

                {/* Title and Description */}
                <div class="flex-1 text-center md:text-left">
                  <h1 class="text-4xl font-extrabold text-purple-100 mb-4">
                    {name}
                  </h1>
                  <p class="text-lg text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div class="p-6 bg-gray-900/30 border-b border-gray-700/50">
              <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                {/* Activation Type */}
                <span class="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-lg font-semibold">
                  {activationTypeLabel}
                </span>

                {/* Chapter */}
                {chapter && (
                  <span class="px-4 py-2 bg-indigo-600/30 text-indigo-200 rounded-lg font-semibold">
                    {chapterName}
                  </span>
                )}

                {/* Element Type */}
                {skill.elementType && (
                  <span class="px-4 py-2 bg-cyan-600/30 text-cyan-200 rounded-lg font-semibold">
                    {skill.elementType.charAt(0).toUpperCase() +
                      skill.elementType.slice(1)}
                  </span>
                )}

                {/* Skill Types */}
                {skill.skillType && skill.skillType.length > 0 &&
                  skill.skillType.filter(Boolean).map((type) => (
                    <span
                      key={type}
                      class="px-4 py-2 bg-blue-600/30 text-blue-200 rounded-lg font-semibold"
                    >
                      {type
                        .split("_")
                        .map((word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </span>
                  ))}
              </div>
            </div>

            {/* Stats Section */}
            <div class="p-6 border-b border-gray-700/50">
              <h2 class="text-2xl font-bold text-purple-100 mb-4">
                {t("common.skills.statistics")}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                  <div class="text-sm text-gray-400 mb-1">
                    {t("common.skills.damage")}
                  </div>
                  <div class="text-2xl font-bold text-orange-400">
                    {(skill.damage * 100).toFixed(0)}%
                  </div>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                  <div class="text-sm text-gray-400 mb-1">
                    {t("common.skills.activationChance")}
                  </div>
                  <div class="text-2xl font-bold text-green-400">
                    {(skill.activationChance * 100).toFixed(0)}%
                  </div>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                  <div class="text-sm text-gray-400 mb-1">
                    {t("common.skills.chapterUnlock")}
                  </div>
                  <div class="text-2xl font-bold text-purple-400">
                    {chapterName}
                  </div>
                </div>
                <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                  <div class="text-sm text-gray-400 mb-1">
                    {t("common.skills.inGameId")}
                  </div>
                  <div class="text-lg font-mono text-gray-300">
                    {skill.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Modifications Section */}
            <div class="p-6">
              <h2 class="text-2xl font-bold text-purple-100 mb-4">
                {t("common.skills.modifications")}
              </h2>
              <div class="space-y-4">
                {/* Level I */}
                <div class="bg-gray-900/50 rounded-lg p-4 border border-blue-500/30">
                  <h3 class="text-lg font-bold text-blue-300 mb-2">
                    {t("common.skills.levelI")}: {skill.modifications.I.name.en}
                  </h3>
                  <p class="text-gray-300">
                    {skill.modifications.I.description.en}
                  </p>
                </div>

                {/* Level II */}
                <div class="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/30">
                  <h3 class="text-lg font-bold text-cyan-300 mb-2">
                    {t("common.skills.levelII")}:{" "}
                    {skill.modifications.II.name.en}
                  </h3>
                  <p class="text-gray-300">
                    {skill.modifications.II.description.en}
                  </p>
                </div>

                {/* Level III */}
                <div class="bg-gray-900/50 rounded-lg p-4 border border-purple-500/30">
                  <h3 class="text-lg font-bold text-purple-300 mb-2">
                    {t("common.skills.levelIII")}:{" "}
                    {skill.modifications.III.name.en}
                  </h3>
                  <p class="text-gray-300">
                    {skill.modifications.III.description.en}
                  </p>
                </div>

                {/* Special */}
                <div class="bg-gray-900/50 rounded-lg p-4 border border-orange-500/30">
                  <h3 class="text-lg font-bold text-orange-300 mb-2">
                    {t("common.skills.special")}:{" "}
                    {skill.modifications.special.name.en}
                  </h3>
                  <p class="text-gray-300">
                    {skill.modifications.special.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Excluded Characters (if any) */}
            {skill.excludedCharacters && skill.excludedCharacters.length > 0 &&
              (
                <div class="p-6 bg-red-900/20 border-t border-red-500/20">
                  <h2 class="text-xl font-bold text-red-300 mb-3">
                    {t("common.skills.restrictedCharacters")}
                  </h2>
                  <p class="text-gray-300 mb-2">
                    {t("common.skills.restrictedCharactersDescription")}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    {skill.excludedCharacters.map((charId) => (
                      <span
                        key={charId}
                        class="px-3 py-1 bg-red-600/30 text-red-200 rounded"
                      >
                        {charId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
}

import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import { skillService } from "@/services/local/game/skillService.ts";
import SkillCard from "@/components/skills/SkillCard.tsx";
import type { Skill } from "@/data/skills/types.ts";
import { SkillType } from "@/data/skills/types.ts";
import SkillsFilter from "./(_islands)/SkillsFilter.tsx";
import SearchBar from "./(_islands)/SearchBar.tsx";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const allSkills = skillService.getAllSkills();
    const url = new URL(ctx.req.url);
    const activationType = url.searchParams.get("activation");
    const elementType = url.searchParams.get("element");
    const skillType = url.searchParams.get("type");
    const chapterId = url.searchParams.get("chapter");
    const searchTerm = url.searchParams.get("search") || "";

    // Filter skills based on query parameters
    let filteredSkills = allSkills;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredSkills = filteredSkills.filter((s) =>
        s.name.en.toLowerCase().includes(search) ||
        s.description.en.toLowerCase().includes(search)
      );
    }

    if (activationType) {
      filteredSkills = filteredSkills.filter(
        (s) => s.activationType === activationType,
      );
    }

    if (elementType) {
      filteredSkills = filteredSkills.filter(
        (s) => s.elementType === elementType,
      );
    }

    if (skillType) {
      filteredSkills = filteredSkills.filter(
        (s) => s.skillType?.includes(skillType as SkillType),
      );
    }

    if (chapterId) {
      filteredSkills = filteredSkills.filter(
        (s) => s.chapterId === chapterId,
      );
    }

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        skills: filteredSkills,
        allSkills,
        searchParams: url.searchParams.toString(),
        searchTerm,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  skills?: Skill[];
  allSkills?: Skill[];
  searchParams?: string;
  searchTerm?: string;
};

export default function SkillsPage({ data, url }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});
  const skills = data.skills ?? [];
  const allSkills = data.allSkills ?? [];
  const searchTerm = data.searchTerm ?? "";
  const searchParams = data.searchParams ?? "";
  const locale = url.pathname.split("/")[1] || "en";
  const urlObj = new URL(url);
  const searchValue = urlObj.searchParams.get("search") || "";

  return (
    <>
      <head>
        <title>{t("common.skills.title")} - Slash & Dice</title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-12">
            <h1 class="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              {t("common.skills.title")}
            </h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("common.skills.description")}
            </p>
          </div>

          {/* Stats Bar */}
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 mb-8">
            <div class="flex flex-wrap items-center justify-center gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-300">
                  {skills.length}
                </div>
                <div class="text-sm text-gray-500">
                  {skills.length === allSkills.length
                    ? "Total Skills"
                    : "Filtered Skills"}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-300">
                  {skills.filter((s) => s.activationType === "main").length}
                </div>
                <div class="text-sm text-gray-500">Main Skills</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-cyan-300">
                  {skills.filter((s) => s.activationType === "subskill")
                    .length}
                </div>
                <div class="text-sm text-gray-500">Subskills</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-300">
                  {skills.filter((s) => s.activationType === "buff").length}
                </div>
                <div class="text-sm text-gray-500">Buffs</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            currentValue={searchValue}
            translationData={data.translationData}
          />

          {/* Filter Component */}
          <SkillsFilter currentParams={searchParams} />

          {/* Skills Grid - Masonry Layout */}
          <div class="columns-2 xs:columns-3 sm:columns-4 md:columns-6 lg:columns-8 xl:columns-8 gap-4">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                locale={locale}
                searchTerm={searchTerm}
              />
            ))}
          </div>

          {/* Empty State */}
          {skills.length === 0 && (
            <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-purple-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-purple-100 mb-2">
                No Skills Found
              </h2>
              <p class="text-gray-400">
                Skills data is being populated. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

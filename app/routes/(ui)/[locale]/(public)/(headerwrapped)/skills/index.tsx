import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import { skillService } from "@/services/local/game/skillService.ts";
import SkillCard from "@/components/skills/SkillCard.tsx";
import type { Skill } from "@/data/skills/types.ts";
import SkillsFilter from "./(_islands)/SkillsFilter.tsx";
import SearchBar from "@/islands/SearchBar.tsx";
import SortDropdown, { type SortOption } from "@/islands/SortDropdown.tsx";
import ClearFiltersButton from "@/islands/ClearFiltersButton.tsx";
import LayoutToggle from "@/islands/LayoutToggle.tsx";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const allSkills = skillService.getAllSkills();
    const url = new URL(ctx.req.url);
    const activationTypes = url.searchParams.getAll("activation");
    const elementTypes = url.searchParams.getAll("element");
    const skillTypes = url.searchParams.getAll("type");
    const chapterIds = url.searchParams.getAll("chapter");
    const searchTerm = url.searchParams.get("search") || "";
    const sortBy = url.searchParams.get("sort") || "";

    // Filter skills based on query parameters
    let filteredSkills = allSkills;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredSkills = filteredSkills.filter((s) =>
        s.name.en.toLowerCase().includes(search) ||
        s.description.en.toLowerCase().includes(search)
      );
    }

    if (activationTypes.length > 0) {
      filteredSkills = filteredSkills.filter(
        (s) => activationTypes.includes(s.activationType),
      );
    }

    if (elementTypes.length > 0) {
      filteredSkills = filteredSkills.filter(
        (s) => s.elementType && elementTypes.includes(s.elementType),
      );
    }

    if (skillTypes.length > 0) {
      filteredSkills = filteredSkills.filter(
        (s) => s.skillType?.some((type) => skillTypes.includes(type)),
      );
    }

    if (chapterIds.length > 0) {
      filteredSkills = filteredSkills.filter(
        (s) => s.chapterId && chapterIds.includes(s.chapterId),
      );
    }

    // Sort skills
    if (sortBy) {
      switch (sortBy) {
        case "nameAsc":
          filteredSkills.sort((a, b) => a.name.en.localeCompare(b.name.en));
          break;
        case "nameDesc":
          filteredSkills.sort((a, b) => b.name.en.localeCompare(a.name.en));
          break;
        case "activationType":
          filteredSkills.sort((a, b) =>
            a.activationType.localeCompare(b.activationType)
          );
          break;
        case "elementType":
          filteredSkills.sort((a, b) =>
            (a.elementType || "").localeCompare(b.elementType || "")
          );
          break;
      }
    }

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        skills: filteredSkills,
        allSkills,
        searchParams: url.searchParams.toString(),
        searchTerm,
        selectedActivationTypes: activationTypes.join(","),
        selectedElementTypes: elementTypes.join(","),
        selectedSkillTypes: skillTypes.join(","),
        selectedChapterIds: chapterIds.join(","),
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
  selectedActivationTypes?: string;
  selectedElementTypes?: string;
  selectedSkillTypes?: string;
  selectedChapterIds?: string;
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
  const selectedActivationTypes = data.selectedActivationTypes || "";
  const selectedElementTypes = data.selectedElementTypes || "";
  const selectedSkillTypes = data.selectedSkillTypes || "";
  const selectedChapterIds = data.selectedChapterIds || "";
  const isRowLayout = urlObj.searchParams.get("layout") === "rows";

  const sortOptions: SortOption[] = [
    { value: "nameAsc", label: t("common.skills.sortNameAsc") },
    { value: "nameDesc", label: t("common.skills.sortNameDesc") },
    { value: "activationType", label: t("common.skills.sortActivationType") },
    { value: "elementType", label: t("common.skills.sortElementType") },
  ];

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
            placeholderKey="common.skills.searchPlaceholder"
            hintKey="common.skills.searchHint"
            showClearButton
          />

          {/* Clear Filters Button */}
          <ClearFiltersButton
            hasFilters={!!selectedActivationTypes || !!selectedElementTypes ||
              !!selectedSkillTypes || !!selectedChapterIds}
            label={t("common.skills.clearFilters")}
          />

          {/* Filter and Sort Controls */}
          <div class="mb-8 flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <SkillsFilter currentParams={searchParams} />
            </div>
            <div class="w-full sm:w-auto">
              <SortDropdown
                options={sortOptions}
                currentSort={urlObj.searchParams.get("sort") || ""}
              />
            </div>
          </div>

          {/* Layout Toggle */}
          <LayoutToggle
            label={t("common.skills.layoutLabel")}
            columnLabel={t("common.skills.layoutColumn")}
            rowLabel={t("common.skills.layoutRow")}
            columnHint={t("common.skills.layoutColumnHint")}
            rowHint={t("common.skills.layoutRowHint")}
            cookieAlias="skills"
          />

          {/* Skills Grid */}
          <div
            class={isRowLayout
              ? "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-4"
              : "columns-2 xs:columns-3 sm:columns-4 md:columns-6 lg:columns-8 xl:columns-8 gap-4"}
          >
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

import { define as defineRoute, State } from "@/utils.ts";
import { PageProps } from "fresh";
import { getCookieServer } from "@/services/local/storage/cookies.ts";
import { skillService } from "@/services/local/game/skillService.ts";
import SkillCard from "@/components/skills/SkillCard.tsx";
import type { Skill } from "@/data/skills/types.ts";
import SkillsFilter from "./(_islands)/SkillsFilter.tsx";
import SearchBar from "@/islands/SearchBar.tsx";
import SortDropdown, { type SortOption } from "@/islands/SortDropdown.tsx";
import ClearFiltersButton from "@/islands/ClearFiltersButton.tsx";
import LayoutToggle from "@/islands/LayoutToggle.tsx";
import DescriptionToggle from "@/islands/DescriptionToggle.tsx";

export const handler = defineRoute.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const activationTypes = url.searchParams.getAll("activation");
    const elementTypes = url.searchParams.getAll("element");
    const skillTypes = url.searchParams.getAll("type");
    const chapterIds = url.searchParams.getAll("chapter");
    const searchTerm = url.searchParams.get("search") || "";
    const sortBy = url.searchParams.get("sort") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const itemsPerPage = 24; // Reduced for better performance

    // Read layout preference: URL > Cookie > Default (false)
    const urlLayout = url.searchParams.get("layout");
    const cookieLayout = getCookieServer(ctx.req.headers, "skills", "layout");
    const isRowLayout = urlLayout === "rows" ||
      (urlLayout === null && cookieLayout === "rows");

    // Read description preference: URL > Cookie > Default (true)
    const urlDesc = url.searchParams.get("desc");
    const cookieDesc = getCookieServer(
      ctx.req.headers,
      "skills",
      "descriptions",
    );
    const showDescriptions = urlDesc === "hide"
      ? false
      : (urlDesc === null && cookieDesc === "hide" ? false : true);

    // Use paginated service method
    const result = await skillService.getPaginated({
      page,
      pageSize: itemsPerPage,
      filters: {
        activationTypes,
        elementTypes,
        skillTypes,
        chapterIds,
        searchTerm,
      },
      sortBy,
    });

    return {
      data: {
        translationData: ctx.state.translationData,
        translationConfig: {
          ...ctx.state.translationConfig,
          fallbackKeys: Array.from(
            ctx.state.translationConfig?.fallbackKeys ?? [],
          ),
        },
        skills: result.items,
        totalAllSkills: await skillService.getTotalCount(),
        totalSkills: result.total,
        currentPage: result.page,
        totalPages: result.totalPages,
        searchParams: url.searchParams.toString(),
        searchTerm,
        selectedActivationTypes: activationTypes.join(","),
        selectedElementTypes: elementTypes.join(","),
        selectedSkillTypes: skillTypes.join(","),
        selectedChapterIds: chapterIds.join(","),
        isRowLayout,
        showDescriptions,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  translationConfig?: Record<string, unknown>;
  skills?: Skill[];
  totalAllSkills?: number;
  totalSkills?: number;
  currentPage?: number;
  totalPages?: number;
  searchParams?: string;
  searchTerm?: string;
  selectedActivationTypes?: string;
  selectedElementTypes?: string;
  selectedSkillTypes?: string;
  selectedChapterIds?: string;
  isRowLayout?: boolean;
  showDescriptions?: boolean;
};

export default function SkillsPage(
  { data, url, state }: PageProps<Props, State>,
) {
  const t = state.t;
  const skills = data.skills ?? [];
  const totalAllSkills = data.totalAllSkills ?? 0;
  const totalSkills = data.totalSkills ?? 0;
  const currentPage = data.currentPage ?? 1;
  const totalPages = data.totalPages ?? 1;
  const searchTerm = data.searchTerm ?? "";
  const searchParams = data.searchParams ?? "";
  const locale = url.pathname.split("/")[1] || "en";
  const urlObj = new URL(url);
  const searchValue = urlObj.searchParams.get("search") || "";
  const selectedActivationTypes = data.selectedActivationTypes || "";
  const selectedElementTypes = data.selectedElementTypes || "";
  const selectedSkillTypes = data.selectedSkillTypes || "";
  const selectedChapterIds = data.selectedChapterIds || "";
  const isRowLayout = data.isRowLayout ?? false;
  const showDescriptions = data.showDescriptions ?? true;

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
                  {totalSkills}
                </div>
                <div class="text-sm text-gray-500">
                  {totalSkills === totalAllSkills
                    ? t("common.skills.totalSkills")
                    : t("common.skills.filteredSkills")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-300">
                  {skills.filter((s) => s.activationType === "main").length}
                </div>
                <div class="text-sm text-gray-500">{t("common.skills.mainSkillsPage")}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-cyan-300">
                  {skills.filter((s) => s.activationType === "subskill")
                    .length}
                </div>
                <div class="text-sm text-gray-500">{t("common.skills.subskillsPage")}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-300">
                  {skills.filter((s) => s.activationType === "buff").length}
                </div>
                <div class="text-sm text-gray-500">{t("common.skills.buffsPage")}</div>
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
              <SkillsFilter
                currentParams={searchParams}
                translationData={data.translationData}
                translationConfig={data.translationConfig}
              />
            </div>
            <div class="w-full sm:w-auto">
              <SortDropdown
                options={sortOptions}
                currentSort={urlObj.searchParams.get("sort") || ""}
              />
            </div>
          </div>

          {/* Layout and Description Toggles */}
          <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <LayoutToggle
              label={t("common.skills.layoutLabel")}
              columnLabel={t("common.skills.layoutColumn")}
              rowLabel={t("common.skills.layoutRow")}
              columnHint={t("common.skills.layoutColumnHint")}
              rowHint={t("common.skills.layoutRowHint")}
              cookieAlias="skills"
              currentState={isRowLayout}
            />
            <DescriptionToggle
              label="Descriptions"
              showLabel="Show"
              hideLabel="Hide"
              cookieAlias="skills"
              currentState={showDescriptions}
            />
          </div>

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
                showDescription={showDescriptions}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div class="mt-8 flex justify-center items-center gap-2">
              <a
                href={`?${
                  new URLSearchParams({
                    ...Object.fromEntries(urlObj.searchParams),
                    page: String(Math.max(1, currentPage - 1)),
                  }).toString()
                }`}
                class={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "border-gray-700 text-gray-600 cursor-not-allowed"
                    : "border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                }`}
                aria-disabled={currentPage === 1}
              >
                Previous
              </a>
              <span class="px-4 py-2 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <a
                href={`?${
                  new URLSearchParams({
                    ...Object.fromEntries(urlObj.searchParams),
                    page: String(Math.min(totalPages, currentPage + 1)),
                  }).toString()
                }`}
                class={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? "border-gray-700 text-gray-600 cursor-not-allowed"
                    : "border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                }`}
                aria-disabled={currentPage === totalPages}
              >
                Next
              </a>
            </div>
          )}

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

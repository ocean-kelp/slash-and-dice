import { define as defineRoute, State } from "@/utils.ts";
import { PageProps } from "fresh";
import { getCookieServer } from "@/services/local/storage/cookies.ts";
import { artifactService } from "@/services/local/game/artifactService.ts";
import ArtifactCard from "@/components/artifacts/ArtifactCard.tsx";
import type { Artifact } from "@/data/artifacts/types.ts";
import ArtifactsFilter from "./(_islands)/ArtifactsFilter.tsx";
import SearchBar from "@/islands/SearchBar.tsx";
import SortDropdown, { type SortOption } from "@/islands/SortDropdown.tsx";
import ClearFiltersButton from "@/islands/ClearFiltersButton.tsx";
import LayoutToggle from "@/islands/LayoutToggle.tsx";

export const handler = defineRoute.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const rarityParams = url.searchParams.getAll("rarity").map((r) =>
      parseInt(r)
    );
    const typeParams = url.searchParams.getAll("type");
    const chapterIds = url.searchParams.getAll("chapter");
    const searchTerm = url.searchParams.get("search") || "";
    const cursedOnly = url.searchParams.get("cursed") === "true";
    const sortBy = url.searchParams.get("sort") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const itemsPerPage = 24; // Reduced for better performance

    // Read layout preference: URL > Cookie > Default (false)
    const urlLayout = url.searchParams.get("layout");
    const cookieLayout = getCookieServer(
      ctx.req.headers,
      "artifacts",
      "layout",
    );
    const isRowLayout = urlLayout === "rows" ||
      (urlLayout === null && cookieLayout === "rows");

    // Use paginated service method
    const result = await artifactService.getPaginated({
      page,
      pageSize: itemsPerPage,
      filters: {
        rarityParams,
        typeParams,
        chapterIds,
        searchTerm,
        cursedOnly,
      },
      sortBy,
    });

    // Global stats (across all artifacts)
    const rarity1Total = (await artifactService.getByRarity(1)).length;
    const rarity2Total = (await artifactService.getByRarity(2)).length;
    const rarity3Total = (await artifactService.getByRarity(3)).length;
    const rarity4Total = (await artifactService.getByRarity(4)).length;
    const cursedTotal = (await artifactService.getCursedArtifacts()).length;

    return {
      data: {
        translationData: ctx.state.translationData,
        translationConfig: {
          ...ctx.state.translationConfig,
          fallbackKeys: Array.from(
            ctx.state.translationConfig?.fallbackKeys ?? [],
          ),
        },
        artifacts: result.items,
        totalAllArtifacts: await artifactService.getTotalCount(),
        totalArtifacts: result.total,
        rarity1Total,
        rarity2Total,
        rarity3Total,
        rarity4Total,
        cursedTotal,
        currentPage: result.page,
        totalPages: result.totalPages,
        searchParams: url.searchParams.toString(),
        searchTerm,
        sortBy,
        isRowLayout,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  translationConfig?: Record<string, unknown>;
  artifacts?: Artifact[];
  totalAllArtifacts?: number;
  totalArtifacts?: number;
  rarity1Total?: number;
  rarity2Total?: number;
  rarity3Total?: number;
  rarity4Total?: number;
  cursedTotal?: number;
  currentPage?: number;
  totalPages?: number;
  searchParams?: string;
  searchTerm?: string;
  sortBy?: string;
  isRowLayout?: boolean;
};

export default function ArtifactsPage(
  { data, url, state }: PageProps<Props, State>,
) {
  const t = state.t;
  const artifacts = data.artifacts ?? [];
  const totalAllArtifacts = data.totalAllArtifacts ?? 0;
  const totalArtifacts = data.totalArtifacts ?? 0;
  const rarity1Total = data.rarity1Total ?? 0;
  const rarity2Total = data.rarity2Total ?? 0;
  const rarity3Total = data.rarity3Total ?? 0;
  const rarity4Total = data.rarity4Total ?? 0;
  const cursedTotal = data.cursedTotal ?? 0;
  const currentPage = data.currentPage ?? 1;
  const totalPages = data.totalPages ?? 1;
  const searchParams = data.searchParams ?? "";
  const searchTerm = data.searchTerm ?? "";
  const sortBy = data.sortBy ?? "";
  const locale = url.pathname.split("/")[1] || "en";
  const urlObj = new URL(url);
  const isRowLayout = data.isRowLayout ?? false;

  // Sort options
  const sortOptions: SortOption[] = [
    { value: "name-asc", label: t("common.artifacts.sortNameAsc") },
    { value: "name-desc", label: t("common.artifacts.sortNameDesc") },
    { value: "rarity-asc", label: t("common.artifacts.sortRarityAsc") },
    { value: "rarity-desc", label: t("common.artifacts.sortRarityDesc") },
    { value: "type", label: t("common.artifacts.sortType") },
  ];
  const searchValue = urlObj.searchParams.get("search") || "";

  // Calculate statistics
  const cursedCount = cursedTotal;
  const rarityCount = {
    1: rarity1Total,
    2: rarity2Total,
    3: rarity3Total,
    4: rarity4Total,
  };

  return (
    <>
      <head>
        <title>{t("common.artifacts.title")} - Slash & Dice</title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-12">
            <h1 class="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              {t("common.artifacts.title")}
            </h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("common.artifacts.description")}
            </p>
          </div>

          {/* Stats Bar */}
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 mb-8">
            <div class="flex flex-wrap items-center justify-center gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-300">
                  {totalArtifacts}
                </div>
                <div class="text-sm text-gray-500">
                  {totalArtifacts === totalAllArtifacts
                    ? t("common.artifacts.totalArtifacts")
                    : t("common.artifacts.filteredArtifacts")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">
                  {rarityCount[1]}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.rarityCommon")} (page)
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-400">
                  {rarityCount[2]}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.rarityRare")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-400">
                  {rarityCount[3]}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.rarityEpic")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-yellow-400">
                  {rarityCount[4]}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.rarityLegendary")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-red-300">
                  {cursedCount}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.cursed")}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            currentValue={searchValue}
            translationData={data.translationData}
            placeholderKey="common.artifacts.searchPlaceholder"
            hintKey="common.artifacts.searchHint"
            showClearButton
          />

          {/* Clear Filters Button */}
          <ClearFiltersButton
            hasFilters={urlObj.searchParams.has("rarity") ||
              urlObj.searchParams.has("type") ||
              urlObj.searchParams.has("chapter") ||
              urlObj.searchParams.has("cursed")}
            label={t("common.artifacts.clearFilters")}
          />

          {/* Filter and Sort Controls */}
          <div class="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:items-start">
            <div class="flex-1">
              <ArtifactsFilter
                currentParams={searchParams}
                translationData={data.translationData}
                translationConfig={data.translationConfig}
              />
            </div>
            <div class="sm:w-auto">
              <SortDropdown options={sortOptions} currentSort={sortBy} />
            </div>
          </div>

          {/* Layout Toggle */}
          <LayoutToggle
            label={t("common.artifacts.layoutLabel")}
            columnLabel={t("common.artifacts.layoutColumn")}
            rowLabel={t("common.artifacts.layoutRow")}
            columnHint={t("common.artifacts.layoutColumnHint")}
            rowHint={t("common.artifacts.layoutRowHint")}
            cookieAlias="artifacts"
            currentState={isRowLayout}
          />

          {/* Artifacts Grid */}
          <div
            class={isRowLayout
              ? "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4"
              : "columns-2 xs:columns-3 sm:columns-4 md:columns-5 lg:columns-6 xl:columns-7 gap-4"}
          >
            {artifacts.map((artifact) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                locale={locale}
                searchTerm={searchTerm}
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
          {artifacts.length === 0 && (
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
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-purple-100 mb-2">
                {t("common.artifacts.noArtifactsFound")}
              </h2>
              <p class="text-gray-400">
                {t("common.artifacts.noArtifactsDescription")}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import { artifactService } from "@/services/local/game/artifactService.ts";
import ArtifactCard from "@/components/artifacts/ArtifactCard.tsx";
import type { Artifact } from "@/data/artifacts/types.ts";
import ArtifactsFilter from "./(_islands)/ArtifactsFilter.tsx";
import SearchBar from "@/islands/SearchBar.tsx";
import SortDropdown, { type SortOption } from "@/islands/SortDropdown.tsx";
import ClearFiltersButton from "@/islands/ClearFiltersButton.tsx";
import LayoutToggle from "@/islands/LayoutToggle.tsx";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const allArtifacts = artifactService.getAllArtifacts();
    const url = new URL(ctx.req.url);
    const rarityParams = url.searchParams.getAll("rarity");
    const typeParams = url.searchParams.getAll("type");
    const chapterIds = url.searchParams.getAll("chapter");
    const searchTerm = url.searchParams.get("search") || "";
    const cursedOnly = url.searchParams.get("cursed") === "true";
    const sortBy = url.searchParams.get("sort") || "";

    // Filter artifacts based on query parameters
    let filteredArtifacts = allArtifacts;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredArtifacts = filteredArtifacts.filter((a) =>
        a.name.en.toLowerCase().includes(search) ||
        a.effects.some((e) => e.text.en.toLowerCase().includes(search))
      );
    }

    if (rarityParams.length > 0) {
      const rarities = rarityParams.map((r) => parseInt(r));
      filteredArtifacts = filteredArtifacts.filter((a) =>
        rarities.includes(a.rarity)
      );
    }

    if (typeParams.length > 0) {
      filteredArtifacts = filteredArtifacts.filter((a) =>
        typeParams.includes(a.type)
      );
    }

    if (chapterIds.length > 0) {
      filteredArtifacts = filteredArtifacts.filter(
        (a) => chapterIds.includes(a.chapterId),
      );
    }

    if (cursedOnly) {
      filteredArtifacts = filteredArtifacts.filter(
        (a) => a.cursedInfo !== undefined,
      );
    }

    // Apply sorting
    if (sortBy) {
      filteredArtifacts = [...filteredArtifacts].sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.en.localeCompare(b.name.en);
          case "name-desc":
            return b.name.en.localeCompare(a.name.en);
          case "rarity-asc":
            return a.rarity - b.rarity;
          case "rarity-desc":
            return b.rarity - a.rarity;
          case "type":
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
    }

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        artifacts: filteredArtifacts,
        allArtifacts,
        searchParams: url.searchParams.toString(),
        searchTerm,
        sortBy,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  artifacts?: Artifact[];
  allArtifacts?: Artifact[];
  searchParams?: string;
  searchTerm?: string;
  sortBy?: string;
};

export default function ArtifactsPage({ data, url }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});
  const artifacts = data.artifacts ?? [];
  const allArtifacts = data.allArtifacts ?? [];
  const searchParams = data.searchParams ?? "";
  const searchTerm = data.searchTerm ?? "";
  const sortBy = data.sortBy ?? "";
  const locale = url.pathname.split("/")[1] || "en";
  const urlObj = new URL(url);
  const isRowLayout = urlObj.searchParams.get("layout") === "rows";

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
  const cursedCount = artifacts.filter((a) => a.cursedInfo !== undefined)
    .length;
  const rarityCount = {
    1: artifacts.filter((a) => a.rarity === 1).length,
    2: artifacts.filter((a) => a.rarity === 2).length,
    3: artifacts.filter((a) => a.rarity === 3).length,
    4: artifacts.filter((a) => a.rarity === 4).length,
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
                  {artifacts.length}
                </div>
                <div class="text-sm text-gray-500">
                  {artifacts.length === allArtifacts.length
                    ? t("common.artifacts.totalArtifacts")
                    : t("common.artifacts.filteredArtifacts")}
                </div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">
                  {rarityCount[1]}
                </div>
                <div class="text-sm text-gray-500">
                  {t("common.artifacts.rarityCommon")}
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

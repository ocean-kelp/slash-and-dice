import { ArtifactType } from "@/data/artifacts/types.ts";
import { chapters } from "@/data/chapters/index.ts";
import { useState } from "preact/hooks";
import { translate, TranslationConfig } from "@/custom-i18n/translator.ts";

interface ArtifactsFilterProps {
  currentParams: string;
  translationData?: Record<string, unknown>;
  translationConfig?: Omit<TranslationConfig, "fallbackKeys"> & {
    fallbackKeys?: string[];
  };
}

export default function ArtifactsFilter(
  { currentParams, translationData = {}, translationConfig }: ArtifactsFilterProps,
) {
  const config: TranslationConfig | undefined = translationConfig
    ? {
      ...translationConfig,
      fallbackKeys: new Set(translationConfig.fallbackKeys ?? []),
    }
    : undefined;

  const t = translate(translationData ?? {}, config);
  const params = new URLSearchParams(currentParams);
  const [isOpen, setIsOpen] = useState(false);

  // Parse multiple values from URL
  const [rarities, setRarities] = useState<string[]>(
    params.getAll("rarity"),
  );
  const [artifactTypes, setArtifactTypes] = useState<string[]>(
    params.getAll("type"),
  );
  const [chapterIds, setChapterIds] = useState<string[]>(
    params.getAll("chapter"),
  );
  const [cursedOnly, setCursedOnly] = useState(
    params.get("cursed") === "true",
  );

  const hasActiveFilters = rarities.length > 0 || artifactTypes.length > 0 ||
    chapterIds.length > 0 || cursedOnly;

  const toggleMultiSelect = (
    currentArray: string[],
    value: string,
    setter: (val: string[]) => void,
  ) => {
    if (currentArray.includes(value)) {
      setter(currentArray.filter((v) => v !== value));
    } else {
      setter([...currentArray, value]);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(currentParams);
    const searchTerm = params.get("search");
    const sortBy = params.get("sort");

    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("search", searchTerm);
    if (sortBy) newParams.set("sort", sortBy);

    // Add multiple values for each filter
    rarities.forEach((r) => newParams.append("rarity", r));
    artifactTypes.forEach((t) => newParams.append("type", t));
    chapterIds.forEach((c) => newParams.append("chapter", c));

    if (cursedOnly) newParams.set("cursed", "true");
    globalThis.location.search = newParams.toString();
  };

  const clearFilters = () => {
    const params = new URLSearchParams(currentParams);
    const searchTerm = params.get("search");
    const sortBy = params.get("sort");

    setRarities([]);
    setArtifactTypes([]);
    setChapterIds([]);
    setCursedOnly(false);

    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("search", searchTerm);
    if (sortBy) newParams.set("sort", sortBy);
    globalThis.location.search = newParams.toString();
  };

  return (
    <div class="mb-8">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        class="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 hover:border-purple-500/40 transition-colors flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-purple-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span class="text-lg font-semibold text-amber-100">
            {t("common.artifacts.filters")}
            {hasActiveFilters && (
              <span class="ml-2 text-sm text-purple-400">
                ({rarities.length + artifactTypes.length + chapterIds.length +
                  (cursedOnly ? 1 : 0)} active)
              </span>
            )}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`w-5 h-5 text-purple-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Drawer Content */}
      {isOpen && (
        <div class="mt-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 space-y-4 animate-fade-in">
          {/* Chapter Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              {t("common.artifacts.chapter")}
            </h3>
            <div class="flex flex-wrap gap-2">
              {chapters.map((chapter) => (
                <button
                  type="button"
                  key={chapter.id}
                  onClick={() =>
                    toggleMultiSelect(chapterIds, chapter.id, setChapterIds)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    chapterIds.includes(chapter.id)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {chapter.name.en}
                </button>
              ))}
            </div>
          </div>

          {/* Rarity Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              {t("common.artifacts.rarity")}
            </h3>
            <div class="flex flex-wrap gap-2">
              {[
                {
                  value: "1",
                  label: t("common.artifacts.rarityCommon"),
                  bgColor: "bg-white",
                  textColor: "text-black",
                },
                {
                  value: "2",
                  label: t("common.artifacts.rarityRare"),
                  bgColor: "bg-blue-600",
                  textColor: "text-white",
                },
                {
                  value: "3",
                  label: t("common.artifacts.rarityEpic"),
                  bgColor: "bg-purple-600",
                  textColor: "text-white",
                },
                {
                  value: "4",
                  label: t("common.artifacts.rarityLegendary"),
                  bgColor: "bg-yellow-500",
                  textColor: "text-black",
                },
              ].map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() =>
                    toggleMultiSelect(rarities, r.value, setRarities)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    rarities.includes(r.value)
                      ? `${r.bgColor} ${r.textColor} font-semibold`
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Type Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              {t("common.artifacts.type")}
            </h3>
            <div class="flex flex-wrap gap-2">
              {Object.values(ArtifactType).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() =>
                    toggleMultiSelect(artifactTypes, type, setArtifactTypes)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors capitalize ${
                    artifactTypes.includes(type)
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Cursed Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              {t("common.artifacts.special")}
            </h3>
            <button
              type="button"
              onClick={() => setCursedOnly(!cursedOnly)}
              class={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${
                cursedOnly
                  ? "bg-red-600 text-white"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <img
                src="/game/data/other/rarity-1-star-red.png"
                alt="cursed"
                class="h-4 w-auto"
                style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
              />
              {t("common.artifacts.cursedOnly")}
            </button>
          </div>

          {/* Action Buttons */}
          <div class="flex gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={applyFilters}
              class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              {t("common.artifacts.applyFilters")}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                class="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold rounded-lg transition-colors"
              >
                {t("common.artifacts.clearAll")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { ArtifactType } from "@/data/artifacts/types.ts";
import { chapters } from "@/data/chapters/index.ts";
import { useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";

interface ArtifactsFilterProps {
  currentParams: string;
  translationData?: Record<string, unknown>;
}

export default function ArtifactsFilter(
  { currentParams, translationData = {} }: ArtifactsFilterProps,
) {
  const t = translate(translationData);
  const params = new URLSearchParams(currentParams);
  const [isOpen, setIsOpen] = useState(false);
  const [rarity, setRarity] = useState(params.get("rarity") || "");
  const [artifactType, setArtifactType] = useState(params.get("type") || "");
  const [chapterId, setChapterId] = useState(params.get("chapter") || "");
  const [cursedOnly, setCursedOnly] = useState(
    params.get("cursed") === "true",
  );

  const hasActiveFilters = rarity || artifactType || chapterId || cursedOnly;

  const toggleFilter = (
    currentValue: string,
    value: string,
    setter: (val: string) => void,
  ) => {
    setter(currentValue === value ? "" : value);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(currentParams);
    const searchTerm = params.get("search");

    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("search", searchTerm);
    if (rarity) newParams.set("rarity", rarity);
    if (artifactType) newParams.set("type", artifactType);
    if (chapterId) newParams.set("chapter", chapterId);
    if (cursedOnly) newParams.set("cursed", "true");
    globalThis.location.search = newParams.toString();
  };

  const clearFilters = () => {
    const params = new URLSearchParams(currentParams);
    const searchTerm = params.get("search");

    setRarity("");
    setArtifactType("");
    setChapterId("");
    setCursedOnly(false);

    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("search", searchTerm);
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
                ({[rarity, artifactType, chapterId, cursedOnly ? "cursed" : ""]
                  .filter(Boolean).length} active)
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
                    toggleFilter(chapterId, chapter.id, setChapterId)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    chapterId === chapter.id
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
                  color: "gray",
                },
                {
                  value: "2",
                  label: t("common.artifacts.rarityRare"),
                  color: "green",
                },
                {
                  value: "3",
                  label: t("common.artifacts.rarityEpic"),
                  color: "blue",
                },
                {
                  value: "4",
                  label: t("common.artifacts.rarityLegendary"),
                  color: "purple",
                },
              ].map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => toggleFilter(rarity, r.value, setRarity)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    rarity === r.value
                      ? `bg-${r.color}-600 text-white`
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
                    toggleFilter(artifactType, type, setArtifactType)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors capitalize ${
                    artifactType === type
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

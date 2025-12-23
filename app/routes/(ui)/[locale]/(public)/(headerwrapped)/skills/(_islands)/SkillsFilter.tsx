import { ActivationType, ElementType, SkillType } from "@/data/skills/types.ts";
import { chapters } from "@/data/chapters/index.ts";
import { useState } from "preact/hooks";

interface SkillsFilterProps {
  currentParams: string;
}

export default function SkillsFilter({ currentParams }: SkillsFilterProps) {
  const params = new URLSearchParams(currentParams);
  const [isOpen, setIsOpen] = useState(false);
  const [activationType, setActivationType] = useState(
    params.get("activation") || "",
  );
  const [elementType, setElementType] = useState(
    params.get("element") || "",
  );
  const [skillType, setSkillType] = useState(params.get("type") || "");
  const [chapterId, setChapterId] = useState(
    params.get("chapter") || "",
  );

  const hasActiveFilters = activationType || elementType || skillType ||
    chapterId;

  const toggleFilter = (
    currentValue: string,
    value: string,
    setter: (val: string) => void,
  ) => {
    setter(currentValue === value ? "" : value);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (activationType) params.set("activation", activationType);
    if (elementType) params.set("element", elementType);
    if (skillType) params.set("type", skillType);
    if (chapterId) params.set("chapter", chapterId);
    globalThis.location.search = params.toString();
  };

  const clearFilters = () => {
    setActivationType("");
    setElementType("");
    setSkillType("");
    setChapterId("");
    globalThis.location.search = "";
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
          <span class="text-lg font-semibold text-purple-100">
            Filters
            {hasActiveFilters && (
              <span class="ml-2 text-sm text-purple-400">
                ({[activationType, elementType, skillType, chapterId].filter(
                  Boolean,
                ).length} active)
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
            <h3 class="text-sm font-semibold text-gray-400 mb-2">Chapter</h3>
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

          {/* Activation Type Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              Activation Type
            </h3>
            <div class="flex flex-wrap gap-2">
              {Object.values(ActivationType).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() =>
                    toggleFilter(activationType, type, setActivationType)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    activationType === type
                      ? "bg-orange-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {type === "main"
                    ? "Main"
                    : type === "subskill"
                    ? "Subskill"
                    : "Buff"}
                </button>
              ))}
            </div>
          </div>

          {/* Element Type Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              Element Type
            </h3>
            <div class="flex flex-wrap gap-2">
              {Object.values(ElementType).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() =>
                    toggleFilter(elementType, type, setElementType)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    elementType === type
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Type Filter */}
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-2">
              Skill Type
            </h3>
            <div class="flex flex-wrap gap-2">
              {Object.values(SkillType).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => toggleFilter(skillType, type, setSkillType)}
                  class={`px-3 py-1.5 text-sm rounded transition-colors ${
                    skillType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div class="flex gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={applyFilters}
              class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Apply Filters
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                class="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

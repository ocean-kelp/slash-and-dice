import { useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { translate } from "@/custom-i18n/translator.ts";
import { getFeatures } from "@/data/config/features.tsx";
import { allCharacters } from "@/data/characters/index.ts";
import { allSkills } from "@/data/skills/index.ts";
import { allArtifacts } from "@/data/artifacts/index.ts";
import CharacterSearchCard from "@/components/search/CharacterSearchCard.tsx";
import SkillSearchCard from "@/components/search/SkillSearchCard.tsx";
import ArtifactSearchCard from "@/components/search/ArtifactSearchCard.tsx";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock.ts";

type Props = {
  translationData?: Record<string, unknown>;
};

export default function SearchModal({ translationData }: Props) {
  const isOpen = useSignal(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [characterPage, setCharacterPage] = useState(1);
  const [skillPage, setSkillPage] = useState(1);
  const [artifactPage, setArtifactPage] = useState(1);
  const t = translate(translationData ?? {});

  // Generate smart pagination numbers (shows limited pages with ellipsis)
  const getPaginationPages = (
    currentPage: number,
    totalPages: number,
  ): (number | string)[] => {
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    if (currentPage <= 3) {
      // Near the beginning: 1 2 3 4 ... last
      pages.push(2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end: 1 ... (last-3) (last-2) (last-1) last
      pages.push(
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      // In the middle: 1 ... (current-1) current (current+1) ... last
      pages.push(
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }

    return pages;
  };

  // Lock body scroll when modal is open
  useBodyScrollLock(isOpen.value);

  // Detect OS
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMac(
        platform.includes("mac") || userAgent.includes("mac") ||
          platform.includes("iphone") || platform.includes("ipad"),
      );
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    console.log("Modal open state changed:", isOpen.value);
    if (isOpen.value) {
      console.log("Modal opened, attempting to focus input");

      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Check if we're on desktop or mobile and focus the appropriate input
          const isMobile = globalThis.innerWidth < 1024; // lg breakpoint
          const inputToFocus = isMobile
            ? mobileInputRef.current
            : desktopInputRef.current;

          console.log(
            "Screen width:",
            globalThis.innerWidth,
            "isMobile:",
            isMobile,
          );
          console.log("Input to focus:", inputToFocus);

          if (inputToFocus) {
            inputToFocus.focus();
            console.log(
              "Focus called, document.activeElement:",
              document.activeElement,
            );
            console.log(
              "Is input focused?",
              document.activeElement === inputToFocus,
            );
          } else {
            console.log("Input ref is null!");
          }
        });
      });
    }
    // Reset search when modal closes
    if (!isOpen.value) {
      setSearchQuery("");
      setCharacterPage(1);
      setSkillPage(1);
      setArtifactPage(1);
    }
  }, [isOpen.value]);

  // Close on Escape key and open on Cmd/Ctrl+K
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen.value) {
        e.preventDefault();
        isOpen.value = false;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        isOpen.value = !isOpen.value;
      }
    };
    globalThis.addEventListener("keydown", handleKeydown, { capture: true });
    return () =>
      globalThis.removeEventListener("keydown", handleKeydown, {
        capture: true,
      });
  }, []);

  const handleSearch = (e: Event) => {
    e.preventDefault();
    // Search is now live, form submission not needed
    // But keep this for potential future use or Enter key behavior
  };

  // Perform search
  const query = searchQuery.toLowerCase().trim();
  const hasQuery = query.length > 0;

  const characterResults = hasQuery
    ? Object.entries(allCharacters)
      .filter(([key, char]) =>
        key.toLowerCase().includes(query) ||
        char.name.toLowerCase().includes(query)
      )
      .map(([key, char]) => ({ key, ...char }))
    : [];

  const skillResults = hasQuery
    ? Object.entries(allSkills)
      .filter(([_, skill]) =>
        skill.name.en.toLowerCase().includes(query) ||
        skill.id.toLowerCase().includes(query)
      )
      .map(([_, skill]) => skill)
    : [];

  const artifactResults = hasQuery
    ? Object.entries(allArtifacts)
      .filter(([_, artifact]) =>
        artifact.name.en.toLowerCase().includes(query) ||
        artifact.id.toLowerCase().includes(query)
      )
      .map(([_, artifact]) => artifact)
    : [];

  // Pagination
  const RESULTS_PER_PAGE = 4;

  // Calculate pagination for characters
  const totalCharacterPages = Math.ceil(
    characterResults.length / RESULTS_PER_PAGE,
  );
  const characterStartIndex = (characterPage - 1) * RESULTS_PER_PAGE;
  const displayedCharacters = characterResults.slice(
    characterStartIndex,
    characterStartIndex + RESULTS_PER_PAGE,
  );

  // Calculate pagination for skills
  const totalSkillPages = Math.ceil(skillResults.length / RESULTS_PER_PAGE);
  const skillStartIndex = (skillPage - 1) * RESULTS_PER_PAGE;
  const displayedSkills = skillResults.slice(
    skillStartIndex,
    skillStartIndex + RESULTS_PER_PAGE,
  );

  // Calculate pagination for artifacts
  const totalArtifactPages = Math.ceil(
    artifactResults.length / RESULTS_PER_PAGE,
  );
  const artifactStartIndex = (artifactPage - 1) * RESULTS_PER_PAGE;
  const displayedArtifacts = artifactResults.slice(
    artifactStartIndex,
    artifactStartIndex + RESULTS_PER_PAGE,
  );

  const totalResults = characterResults.length + skillResults.length +
    artifactResults.length;

  return (
    <>
      {/* Modal Overlay - Rendered via portal at document body level */}
      {isOpen.value && createPortal(
        <>
          {/* Backdrop with blur */}
          <div
            class="fixed inset-0 bg-black/20 animate-fade-in"
            style="backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 9999;"
            onClick={() => {
              console.log("Backdrop clicked, closing modal");
              isOpen.value = false;
            }}
          />
          {/* Desktop Search Bar - Rendered above backdrop */}
          <div
            class="hidden lg:block fixed top-0 left-0 right-0 animate-fade-in"
            style="z-index: 10001;"
          >
            <div class="w-full mx-auto px-4 sm:px-6 lg:px-10">
              <div class="h-16 sm:h-20 flex items-center justify-center">
                <form
                  onSubmit={handleSearch}
                  class="flex w-full max-w-md xl:max-w-lg items-center gap-3 border-2 border-ocean-deep-500 rounded-full py-2.5 px-4 text-sm bg-white shadow-2xl"
                >
                  <svg
                    class="w-4 h-4 text-gray-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="6"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                  <input
                    ref={desktopInputRef}
                    type="text"
                    name="q"
                    value={searchQuery}
                    onInput={(e) =>
                      setSearchQuery((e.target as HTMLInputElement).value)}
                    placeholder={t("common.header.search.placeholder")}
                    class="flex-1 text-sm border-0 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-400"
                    autoComplete="off"
                  />
                  <kbd class="hidden xl:inline-block px-2 py-1 text-xs font-mono bg-gray-100 text-gray-600 border border-gray-300 rounded">
                    {isMac ? "⌘K" : "Ctrl+K"}
                  </kbd>
                </form>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div
            class="fixed inset-x-4 sm:inset-x-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-20 sm:top-24 animate-slide-down max-w-3xl md:w-full md:max-w-2xl lg:max-w-3xl"
            style="z-index: 10000;"
          >
            <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Search Form - Only visible on mobile */}
              <form
                onSubmit={handleSearch}
                class="relative border-b border-gray-100 lg:hidden"
              >
                <div class="flex items-center px-6 py-4 sm:py-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-3 sm:mr-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    ref={mobileInputRef}
                    type="text"
                    name="q"
                    value={searchQuery}
                    onInput={(e) =>
                      setSearchQuery((e.target as HTMLInputElement).value)}
                    placeholder={t("common.header.search.placeholder")}
                    class="flex-1 text-base sm:text-lg border-0 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-400"
                    autoComplete="off"
                  />
                  <kbd class="hidden sm:inline-block ml-3 px-2.5 py-1.5 text-xs font-mono bg-gray-100 text-gray-600 border border-gray-300 rounded-md shadow-sm">
                    {isMac ? "⌘K" : "Ctrl+K"}
                  </kbd>
                </div>
              </form>

              {/* Quick Links or Search Results */}
              <div class="relative p-5 sm:p-6 bg-linear-to-b from-gray-900 via-slate-900 to-gray-950 lg:pt-6 overflow-hidden">
                {/* Empty Circles Pattern Background */}
                <div
                  class="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage: "url('/svg/empty-circles-pattern.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "80px 80px",
                    backgroundPosition: "center",
                  }}
                />

                {/* Atmospheric Background Effect */}
                <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

                {!hasQuery
                  ? (
                    // Show Quick Access when no search query
                    <>
                      <div class="relative text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wide mb-4">
                        {t("common.header.search.quickAccess")}
                      </div>
                      <div class="relative grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                        {getFeatures(t).map((feature) => (
                          <a
                            key={feature.id}
                            href={feature.href}
                            class="group relative bg-gray-800/50 rounded-xl border border-purple-500/20 p-4 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:bg-gray-800/70 transition-all duration-300 flex flex-col"
                          >
                            {/* Card glow effect on hover */}
                            <div class="absolute inset-0 rounded-xl bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

                            <div class="relative flex items-center gap-3">
                              <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all border border-purple-500/20 shrink-0">
                                {feature.icon}
                              </div>
                              <div class="flex-1 min-w-0">
                                <h3 class="text-sm font-bold text-purple-100 group-hover:text-white transition-colors truncate">
                                  {feature.title}
                                </h3>
                                <p class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2 mt-0.5">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </>
                  )
                  : (
                    // Show Search Results
                    <div class="relative max-h-[60vh] overflow-y-auto">
                      {totalResults === 0
                        ? (
                          <div class="text-center py-8">
                            <p class="text-gray-400">
                              {t("common.header.search.noResults")}
                            </p>
                          </div>
                        )
                        : (
                          <div class="space-y-6">
                            {/* Characters */}
                            {characterResults.length > 0 && (
                              <div>
                                <h3 class="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                  </svg>
                                  {t("common.header.search.characters")}{" "}
                                  ({characterResults.length})
                                </h3>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                  {displayedCharacters.map((character) => (
                                    <CharacterSearchCard
                                      key={character.key}
                                      character={character}
                                      characterKey={character.key}
                                    />
                                  ))}
                                </div>
                                {totalCharacterPages > 1 && (
                                  <div class="mt-3 flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        setCharacterPage(
                                          Math.max(1, characterPage - 1),
                                        )}
                                      disabled={characterPage === 1}
                                      class="px-3 py-1.5 text-sm text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/20 hover:border-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      ←
                                    </button>
                                    {getPaginationPages(
                                      characterPage,
                                      totalCharacterPages,
                                    ).map((page, idx) => (
                                      page === "..."
                                        ? (
                                          <span
                                            key={`ellipsis-${idx}`}
                                            class="px-2 text-purple-300"
                                          >
                                            ...
                                          </span>
                                        )
                                        : (
                                          <button
                                            key={page}
                                            onClick={() =>
                                              setCharacterPage(page as number)}
                                            class={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                                              page === characterPage
                                                ? "bg-purple-500/30 text-purple-100 border-purple-500/50"
                                                : "text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 hover:border-purple-500/40"
                                            }`}
                                          >
                                            {page}
                                          </button>
                                        )
                                    ))}
                                    <button
                                      onClick={() =>
                                        setCharacterPage(
                                          Math.min(
                                            totalCharacterPages,
                                            characterPage + 1,
                                          ),
                                        )}
                                      disabled={characterPage ===
                                        totalCharacterPages}
                                      class="px-3 py-1.5 text-sm text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/20 hover:border-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      →
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Skills */}
                            {skillResults.length > 0 && (
                              <div>
                                <h3 class="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  >
                                    <path d="M17 3h4v4" />
                                    <path d="M21 3l-15 15" />
                                    <path d="M3 18h3v3" />
                                  </svg>
                                  {t("common.header.search.skills")}{" "}
                                  ({skillResults.length})
                                </h3>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                  {displayedSkills.map((skill) => (
                                    <SkillSearchCard
                                      key={skill.id}
                                      skill={skill}
                                    />
                                  ))}
                                </div>
                                {totalSkillPages > 1 && (
                                  <div class="mt-3 flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        setSkillPage(
                                          Math.max(1, skillPage - 1),
                                        )}
                                      disabled={skillPage === 1}
                                      class="px-3 py-1.5 text-sm text-pink-300 hover:text-pink-200 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg transition-colors border border-pink-500/20 hover:border-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      ←
                                    </button>
                                    {getPaginationPages(
                                      skillPage,
                                      totalSkillPages,
                                    ).map((page, idx) => (
                                      page === "..."
                                        ? (
                                          <span
                                            key={`ellipsis-${idx}`}
                                            class="px-2 text-pink-300"
                                          >
                                            ...
                                          </span>
                                        )
                                        : (
                                          <button
                                            key={page}
                                            onClick={() =>
                                              setSkillPage(page as number)}
                                            class={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                                              page === skillPage
                                                ? "bg-pink-500/30 text-pink-100 border-pink-500/50"
                                                : "text-pink-300 hover:text-pink-200 bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20 hover:border-pink-500/40"
                                            }`}
                                          >
                                            {page}
                                          </button>
                                        )
                                    ))}
                                    <button
                                      onClick={() =>
                                        setSkillPage(
                                          Math.min(
                                            totalSkillPages,
                                            skillPage + 1,
                                          ),
                                        )}
                                      disabled={skillPage === totalSkillPages}
                                      class="px-3 py-1.5 text-sm text-pink-300 hover:text-pink-200 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg transition-colors border border-pink-500/20 hover:border-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      →
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Artifacts */}
                            {artifactResults.length > 0 && (
                              <div>
                                <h3 class="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                  {t("common.header.search.artifacts")}{" "}
                                  ({artifactResults.length})
                                </h3>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                  {displayedArtifacts.map((artifact) => (
                                    <ArtifactSearchCard
                                      key={artifact.id}
                                      artifact={artifact}
                                    />
                                  ))}
                                </div>
                                {totalArtifactPages > 1 && (
                                  <div class="mt-3 flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        setArtifactPage(
                                          Math.max(1, artifactPage - 1),
                                        )}
                                      disabled={artifactPage === 1}
                                      class="px-3 py-1.5 text-sm text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors border border-amber-500/20 hover:border-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      ←
                                    </button>
                                    {getPaginationPages(
                                      artifactPage,
                                      totalArtifactPages,
                                    ).map((page, idx) => (
                                      page === "..."
                                        ? (
                                          <span
                                            key={`ellipsis-${idx}`}
                                            class="px-2 text-amber-300"
                                          >
                                            ...
                                          </span>
                                        )
                                        : (
                                          <button
                                            key={page}
                                            onClick={() =>
                                              setArtifactPage(page as number)}
                                            class={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                                              page === artifactPage
                                                ? "bg-amber-500/30 text-amber-100 border-amber-500/50"
                                                : "text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 hover:border-amber-500/40"
                                            }`}
                                          >
                                            {page}
                                          </button>
                                        )
                                    ))}
                                    <button
                                      onClick={() =>
                                        setArtifactPage(
                                          Math.min(
                                            totalArtifactPages,
                                            artifactPage + 1,
                                          ),
                                        )}
                                      disabled={artifactPage ===
                                        totalArtifactPages}
                                      class="px-3 py-1.5 text-sm text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors border border-amber-500/20 hover:border-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      →
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                      {/* Quick Access - Always show at the end when searching */}
                      {hasQuery && totalResults > 0 && (
                        <div class="mt-6 pt-6 border-t border-gray-700/50">
                          <h3 class="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">
                            {t("common.header.search.quickAccess")}
                          </h3>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {getFeatures(t).map((feature) => (
                              <a
                                key={feature.id}
                                href={feature.href}
                                class="group relative bg-gray-800/50 rounded-xl border border-purple-500/20 p-3 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:bg-gray-800/70 transition-all duration-300 flex items-center gap-3"
                              >
                                <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all border border-purple-500/20 shrink-0">
                                  {feature.icon}
                                </div>
                                <div class="flex-1 min-w-0">
                                  <h4 class="text-sm font-bold text-purple-100 group-hover:text-white transition-colors truncate">
                                    {feature.title}
                                  </h4>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                {/* Close hint */}
                <div class="relative mt-5 pt-4 border-t border-gray-700/50 text-center">
                  <span class="text-xs sm:text-sm text-gray-400">
                    {t("common.header.search.closeHint")}{" "}
                    <kbd class="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300 shadow-sm">
                      {t("common.header.search.closeKey")}
                    </kbd>{" "}
                    {t("common.header.search.toClose")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body,
      )}

      {/* Search Button - Icon on mobile, search bar button on desktop */}
      <div class="w-full lg:w-auto flex justify-center">
        {/* Mobile: Icon only */}
        <button
          type="button"
          onClick={() => {
            console.log("Mobile search button clicked, opening modal");
            isOpen.value = true;
          }}
          class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label={t("common.header.search.openSearch")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        {/* Desktop/Tablet: Full search bar - becomes input when open */}
        {!isOpen.value
          ? (
            <button
              type="button"
              onClick={() => {
                console.log("Desktop search bar clicked, opening modal");
                isOpen.value = true;
              }}
              class="hidden lg:flex w-full max-w-md xl:max-w-lg items-center gap-3 border border-gray-300 rounded-full py-2.5 px-4 text-sm bg-white hover:border-gray-400 transition-all text-left shadow-sm"
              aria-label={t("common.header.search.openSearch")}
            >
              <svg
                class="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              <span class="text-gray-500 flex-1">
                {t("common.header.search.placeholder")}
              </span>
              <kbd class="hidden xl:inline-block px-2 py-1 text-xs font-mono bg-gray-100 border border-gray-300 rounded">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>
          )
          : null}
      </div>
    </>
  );
}

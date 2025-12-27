import { useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { translate } from "@/custom-i18n/translator.ts";
import { getFeatures } from "@/data/config/features.tsx";

type Props = {
  translationData?: Record<string, unknown>;
};

export default function SearchModal({ translationData }: Props) {
  const isOpen = useSignal(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const t = translate(translationData ?? {});

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
    if (isOpen.value && inputRef.current) {
      console.log("Modal opened - backdrop with blur should be visible");
      inputRef.current.focus();
    }
  }, [isOpen.value]);

  // Close on Escape key and open on Cmd/Ctrl+K
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen.value) {
        isOpen.value = false;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen.value = !isOpen.value;
      }
    };
    globalThis.addEventListener("keydown", handleKeydown);
    return () => globalThis.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleSearch = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("q")?.toString().trim();

    if (query) {
      // Navigate to search results (you can customize this URL)
      globalThis.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

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
                    ref={inputRef}
                    type="text"
                    name="q"
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
                    ref={inputRef}
                    type="text"
                    name="q"
                    placeholder={t("common.header.search.placeholder")}
                    class="flex-1 text-base sm:text-lg border-0 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-400"
                    autoComplete="off"
                  />
                  <kbd class="hidden sm:inline-block ml-3 px-2.5 py-1.5 text-xs font-mono bg-gray-100 text-gray-600 border border-gray-300 rounded-md shadow-sm">
                    {isMac ? "⌘K" : "Ctrl+K"}
                  </kbd>
                </div>
              </form>

              {/* Quick Links */}
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

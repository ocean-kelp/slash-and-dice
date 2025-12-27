import { useEffect, useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";

interface SearchBarProps {
  currentValue: string;
  translationData?: Record<string, unknown>;
  placeholderKey: string;
  hintKey: string;
  showClearButton?: boolean;
}

export default function SearchBar(
  {
    currentValue,
    translationData,
    placeholderKey,
    hintKey,
    showClearButton = false,
  }: SearchBarProps,
) {
  const t = translate(translationData ?? {});
  const [inputValue, setInputValue] = useState(currentValue);
  const hasChanges = inputValue !== currentValue;

  useEffect(() => {
    console.log("SearchBar mounted on client");
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const url = new URL(globalThis.location.href);
    // Set or update the search parameter
    if (inputValue.trim()) {
      url.searchParams.set("search", inputValue.trim());
    } else {
      url.searchParams.delete("search");
    }
    globalThis.location.href = url.toString();
  };

  const handleClear = () => {
    setInputValue("");
    const url = new URL(globalThis.location.href);
    url.searchParams.delete("search");
    globalThis.location.href = url.toString();
  };

  return (
    <div class="mb-4 space-y-2">
      <form method="get" class="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder={t(placeholderKey)}
          value={inputValue}
          onInput={(e) => {
            const newValue = (e.target as HTMLInputElement).value;
            console.log(
              "Input changed:",
              newValue,
              "hasChanges will be:",
              newValue !== currentValue,
            );
            setInputValue(newValue);
          }}
          class={`w-full px-4 py-3 pl-12 ${
            showClearButton ? "pr-12" : ""
          } bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {showClearButton && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-purple-300 transition-colors"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </form>

      {hasChanges && (
        <div class="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-amber-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
          <span class="text-sm text-amber-400">
            {t(hintKey)}
          </span>
        </div>
      )}
    </div>
  );
}

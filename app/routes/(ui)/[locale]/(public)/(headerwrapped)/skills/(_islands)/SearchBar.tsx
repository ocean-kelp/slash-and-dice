import { useEffect, useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";

interface SearchBarProps {
  currentValue: string;
  translationData?: Record<string, unknown>;
}

export default function SearchBar(
  { currentValue, translationData }: SearchBarProps,
) {
  const t = translate(translationData ?? {});
  const [inputValue, setInputValue] = useState(currentValue);
  const hasChanges = inputValue !== currentValue;

  useEffect(() => {
    console.log("SearchBar mounted on client");
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <div class="mb-4 space-y-2">
      <form method="get" class="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder={t("common.skills.searchPlaceholder")}
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
          class="w-full px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
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
            {t("common.skills.searchHint")}
          </span>
        </div>
      )}
    </div>
  );
}

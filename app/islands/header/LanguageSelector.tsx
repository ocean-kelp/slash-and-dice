import { useSignal } from "@preact/signals";
import { LANGUAGES } from "@/utilities/languages.ts";

type Props = {
  currentLocale: string;
  translationData?: Record<string, unknown>;
};

// Language names in their native language
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  ja: "日本語",
  ko: "한국어",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

export default function LanguageSelector({ currentLocale }: Props) {
  const isOpen = useSignal(false);

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie with no expiration (max age of 10 years)
    document.cookie = `locale=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365 * 10
    }; SameSite=Lax`;

    // Get current path and replace locale
    const currentPath = globalThis.location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);

    // Replace first part (locale) with new locale
    if (pathParts.length > 0 && LANGUAGES.includes(pathParts[0])) {
      pathParts[0] = newLocale;
    } else {
      // If no locale in path, add it
      pathParts.unshift(newLocale);
    }

    // Navigate to new path
    globalThis.location.href = "/" + pathParts.join("/");
  };

  return (
    <div class="relative">
      {/* Language Button */}
      <button
        type="button"
        onClick={() => isOpen.value = !isOpen.value}
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen.value}
      >
        {/* Globe Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span class="text-sm font-medium uppercase hidden sm:inline">
          {currentLocale}
        </span>
        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`w-4 h-4 transition-transform ${
            isOpen.value ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen.value && (
        <>
          {/* Backdrop */}
          <div
            class="fixed inset-0 z-40"
            onClick={() => isOpen.value = false}
          />

          {/* Menu */}
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {LANGUAGES.map((locale) => (
              <button
                type="button"
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                class={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  locale === currentLocale
                    ? "bg-purple-50 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div class="flex items-center justify-between">
                  <span>{LANGUAGE_NAMES[locale]}</span>
                  {locale === currentLocale && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-purple-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

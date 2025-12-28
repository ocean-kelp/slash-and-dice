import { setCookieClient } from "@/services/local/storage/cookies.ts";

interface DescriptionToggleProps {
  label: string;
  showLabel: string;
  hideLabel: string;
  cookieAlias: string; // e.g., "skills" or "artifacts"
  currentState: boolean; // Server-computed state
}

export default function DescriptionToggle(
  { label, showLabel, hideLabel, cookieAlias, currentState }:
    DescriptionToggleProps,
) {
  const showDescriptions = currentState;

  const toggleDescriptions = () => {
    const url = new URL(globalThis.location.href);
    const newState = !showDescriptions;

    // Save to cookie (expires in 365 days)
    setCookieClient(
      cookieAlias,
      "descriptions",
      newState ? "show" : "hide",
      365,
    );

    if (!newState) {
      url.searchParams.set("desc", "hide");
    } else {
      url.searchParams.delete("desc");
    }

    globalThis.location.href = url.toString();
  };

  return (
    <div class="flex items-center gap-3 mb-4">
      <span class="text-sm text-gray-400">{label}</span>
      <button
        type="button"
        onClick={toggleDescriptions}
        class="relative inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors"
      >
        {/* Eye Icon - Show */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`w-5 h-5 transition-colors ${
            showDescriptions ? "text-purple-400" : "text-gray-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>

        <span class="text-xs text-gray-400">|</span>

        {/* Eye Off Icon - Hide */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={`w-5 h-5 transition-colors ${
            !showDescriptions ? "text-purple-400" : "text-gray-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>

        <span class="text-sm text-gray-300">
          {showDescriptions ? showLabel : hideLabel}
        </span>
      </button>
    </div>
  );
}

import { useState } from "preact/hooks";
import { setCookieClient } from "@/services/local/storage/cookies.ts";

interface LayoutToggleProps {
  label: string;
  columnLabel: string;
  rowLabel: string;
  columnHint: string;
  rowHint: string;
  cookieAlias: string; // e.g., "skills" or "artifacts"
  currentState: boolean; // Server-computed state
}

export default function LayoutToggle(
  { label, columnLabel, rowLabel, columnHint, rowHint, cookieAlias, currentState }:
    LayoutToggleProps,
) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isRowLayout = currentState;

  const toggleLayout = () => {
    const url = new URL(globalThis.location.href);
    const newLayout = !isRowLayout;

    // Save to cookie (expires in 365 days)
    setCookieClient(cookieAlias, "layout", newLayout ? "rows" : "columns", 365);

    if (newLayout) {
      url.searchParams.set("layout", "rows");
    } else {
      url.searchParams.delete("layout");
    }

    globalThis.location.href = url.toString();
  };

  return (
    <div class="flex items-center gap-3 mb-4">
      <span class="text-sm text-gray-400">{label}</span>
      <div class="relative flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLayout}
          class="relative inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors group"
          title={isRowLayout ? rowHint : columnHint}
        >
          {/* Column/Masonry Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`w-5 h-5 transition-colors ${
              !isRowLayout ? "text-purple-400" : "text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Left column - 3 blocks */}
            <rect x="2" y="2" width="5" height="4" rx="0.5" />
            <rect x="2" y="7" width="5" height="6" rx="0.5" />
            <rect x="2" y="14" width="5" height="8" rx="0.5" />
            {/* Middle column - 3 blocks different heights */}
            <rect x="9" y="2" width="5" height="7" rx="0.5" />
            <rect x="9" y="10" width="5" height="5" rx="0.5" />
            <rect x="9" y="16" width="5" height="6" rx="0.5" />
            {/* Right column - 3 blocks */}
            <rect x="16" y="2" width="5" height="5" rx="0.5" />
            <rect x="16" y="8" width="5" height="8" rx="0.5" />
            <rect x="16" y="17" width="5" height="5" rx="0.5" />
          </svg>

          <span class="text-xs text-gray-400">|</span>

          {/* Grid Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`w-5 h-5 transition-colors ${
              isRowLayout ? "text-purple-400" : "text-gray-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>

          <span class="text-sm text-gray-300">
            {isRowLayout ? rowLabel : columnLabel}
          </span>

          {/* Tooltip on hover - Desktop only */}
          <div class="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-sm text-center shadow-lg border border-purple-500/20 z-10">
            {isRowLayout ? rowHint : columnHint}
            <div class="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900">
            </div>
          </div>

        </button>

        {/* Info button - Shows tooltip on click for mobile */}
        <button
          type="button"
          onClick={() => setShowTooltip(!showTooltip)}
          class="sm:hidden p-1.5 text-gray-400 hover:text-purple-400 transition-colors"
          aria-label="Show info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
        </button>

        {/* Mobile tooltip - Shown on click */}
        {showTooltip && (
          <>
            {/* Backdrop to close tooltip */}
            <div
              class="sm:hidden fixed inset-0 z-20"
              onClick={() => setShowTooltip(false)}
            />
            {/* Tooltip content */}
            <div class="sm:hidden absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg border border-purple-500/20 z-30 max-w-[200px] text-center">
              {isRowLayout ? rowHint : columnHint}
              <div class="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900">
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

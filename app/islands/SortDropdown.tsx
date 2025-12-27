import { useState } from "preact/hooks";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  currentSort?: string;
  paramName?: string; // Query parameter name (default: "sort")
}

export default function SortDropdown(
  { options, currentSort = "", paramName = "sort" }: SortDropdownProps,
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (value: string) => {
    const url = new URL(globalThis.location.href);

    if (value) {
      url.searchParams.set(paramName, value);
    } else {
      url.searchParams.delete(paramName);
    }

    globalThis.location.href = url.toString();
  };

  const currentOption = options.find((opt) => opt.value === currentSort);
  const displayLabel = currentOption?.label || "Sort by...";

  return (
    <div class="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/50 focus:outline-none focus:border-purple-500/50 transition-colors min-w-[180px]"
      >
        <span>{displayLabel}</span>
        <svg
          class={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
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

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            class="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div class="absolute right-0 z-20 w-full mt-2 origin-top-right bg-gray-800 border border-purple-500/30 rounded-lg shadow-2xl overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  handleSortChange(option.value);
                  setIsOpen(false);
                }}
                class={`w-full text-left px-4 py-2 text-sm hover:bg-purple-600/20 transition-colors ${
                  option.value === currentSort
                    ? "bg-purple-600/30 text-purple-200"
                    : "text-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchBar() {
  return (
    <div class="max-w-full">
      <label class="sr-only">Search</label>
      <div class="relative">
        <input
          type="text"
          placeholder="Search (mock)"
          class="w-full border border-gray-300 rounded-[99999px] py-2 px-3 pl-10 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean-deep-200"
        />
        <div class="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none text-gray-400">
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
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
        </div>
      </div>
    </div>
  );
}

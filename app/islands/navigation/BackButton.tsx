export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => globalThis.history.back()}
      class="fixed bottom-6 left-6 z-50 p-3 bg-gray-800/80 backdrop-blur-sm rounded-full border-2 border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:bg-gray-800/90 hover:text-purple-200 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    </button>
  );
}

import { useState } from "preact/hooks";

interface BackButtonProps {
  label: string;
}

export default function BackButton({ label }: BackButtonProps) {
  const [_mounted, _setMounted] = useState(true);

  const handleClick = () => {
    console.log("Back button clicked");
    if (typeof window !== "undefined" && globalThis.history) {
      console.log("Calling history.back()");
      globalThis.history.back();
    } else {
      console.error("window.history not available");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      class="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors cursor-pointer bg-transparent border-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
}

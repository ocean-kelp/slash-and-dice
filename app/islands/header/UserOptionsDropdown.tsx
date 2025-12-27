import { useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";
import { signOut } from "@/lib/auth-client.ts";
import { showAvatarModal } from "@/signals/avatarModal.ts";

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
  translationData?: Record<string, unknown>;
  /** Current locale for navigation */
  locale?: string;
};

export default function UserOptionsDropdown({
  user,
  translationData,
  locale = "en",
}: Props) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isGuest = !user?.username;
  const t = translate(translationData ?? {});

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      setOpen(false); // Close the dropdown immediately
      await signOut();
      // Redirect to home page after successful logout
      globalThis.location.href = `/${locale}`;
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      // Optionally show an error message to the user
    }
  };

  // For guests, render a simple link to the login page
  if (isGuest) {
    return (
      <a
        href={`/${locale}/login`}
        class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full
          bg-linear-to-r from-ocean-deep-500 to-ocean-deep-600 text-white 
          shadow-lg shadow-ocean-deep-500/25
          hover:shadow-xl hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2
          transition-all duration-300 ease-out
          font-medium text-sm whitespace-nowrap"
        aria-label={t("common.header.userOptions.ariaLabel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
        <span>
          {t("common.login.title")}
        </span>
      </a>
    );
  }

  // For logged-in users, show the dropdown menu
  return (
    <div class="relative">
      {/* Loading overlay when logging out */}
      {isLoggingOut && (
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div class="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-ocean-deep-200 border-t-ocean-deep-600 rounded-full animate-spin" />
            <p class="text-gray-700 font-medium">
              {t("common.header.userOptions.loggingOut")}
            </p>
          </div>
        </div>
      )}

      {/* Simple Dropdown Button */}
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-[9999px] border-2 border-ocean-deep-200
          hover:bg-ocean-deep-50 hover:shadow-lg hover:border-ocean-deep-300
          focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2
          transition-all duration-200 ease-out
          cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setOpen(!open)}
        disabled={isLoggingOut}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("common.header.userOptions.ariaLabel")}
      >
        {/* Dropdown Caret Icon */}
        {open
          ? (
            // Outline version when open (rotated)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-ocean-deep-600 transition-transform duration-200 rotate-180 sm:w-5 sm:h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 10l6 6l6 -6h-12" />
            </svg>
          )
          : (
            // Filled version when closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-ocean-deep-600 transition-transform duration-200 sm:w-5 sm:h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
            </svg>
          )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            class="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu */}
          <div
            class="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-gray-900/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Menu Items */}
            <div class="p-2">
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
                label={t("common.header.userOptions.changeUsername")}
                onClick={(e) => e.preventDefault()}
              />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                }
                label={t("common.header.userOptions.changeAvatar")}
                onClick={() => {
                  setOpen(false);
                  showAvatarModal.value = true;
                }}
              />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                }
                label={t("common.header.userOptions.help")}
                onClick={(e) => e.preventDefault()}
              />

              <div class="my-2 mx-2 border-t border-gray-100" />

              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                }
                label={t("common.header.userOptions.logout")}
                onClick={handleSignOut}
                variant="danger"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Reusable menu item component */
function MenuItem({
  icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: preact.JSX.Element;
  label: string;
  onClick: (e: Event) => void;
  variant?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      class={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-1
        ${
        variant === "danger"
          ? "text-red-600 hover:bg-red-50 hover:text-red-700"
          : "text-gray-700 hover:bg-gray-100"
      }
      `}
      onClick={onClick}
    >
      <span class={variant === "danger" ? "text-red-500" : "text-gray-400"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

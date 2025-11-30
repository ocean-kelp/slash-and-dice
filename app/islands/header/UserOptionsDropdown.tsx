import { useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";
import { signOut } from "@/lib/auth-client.ts";

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
  const isGuest = !user?.username;
  const t = translate(translationData ?? {});

  const handleSignOut = async () => {
    await signOut();
  };

  // For guests, render a simple link to the login page
  if (isGuest) {
    return (
      <a
        href={`/${locale}/login`}
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
          bg-linear-to-r from-ocean-deep-500 to-ocean-deep-600 text-white 
          shadow-lg shadow-ocean-deep-500/25
          hover:shadow-xl hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2
          transition-all duration-300 ease-out
          font-medium text-sm"
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
        <span>{t("common.login.title")}</span>
      </a>
    );
  }

  // For logged-in users, show the dropdown menu
  return (
    <div class="relative">
      {/* Trigger Button */}
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
          bg-ocean-deep-50 text-ocean-deep-700 border border-ocean-deep-200
          hover:shadow-xl hover:scale-[1.02]
          focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2
          transition-all duration-300 ease-out
          font-medium text-sm"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("common.header.userOptions.ariaLabel")}
      >
        {user?.iconUrl
          ? (
            <img
              src={user.iconUrl}
              alt={user.username}
              class="w-6 h-6 rounded-full object-cover ring-2 ring-white"
            />
          )
          : (
            <div class="w-6 h-6 rounded-full bg-linear-to-br from-ocean-deep-400 to-ocean-deep-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
        <span class="max-w-[100px] truncate">{user?.username}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
            {/* User Header */}
            <div class="p-5 bg-linear-to-br from-ocean-deep-50 to-ocean-deep-100/50">
              <div class="flex items-center gap-4">
                {user?.iconUrl
                  ? (
                    <img
                      src={user.iconUrl}
                      alt={user.username}
                      class="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                    />
                  )
                  : (
                    <div class="w-14 h-14 rounded-full bg-linear-to-br from-ocean-deep-400 to-ocean-deep-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white shadow-lg">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                <div class="flex-1 min-w-0">
                  <p class="text-base font-semibold text-gray-900 truncate">
                    {user?.username}
                  </p>
                  <p class="text-sm text-ocean-deep-600">
                    {t("common.header.userOptions.welcome")}
                  </p>
                </div>
              </div>
            </div>

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

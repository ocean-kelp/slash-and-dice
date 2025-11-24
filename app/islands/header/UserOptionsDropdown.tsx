import { useState } from "preact/hooks";
import { translate } from "@/utilities/languages.ts";

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
  translationData?: Record<string, unknown>;
};

export default function UserOptionsDropdown({ user, translationData }: Props) {
  const [open, setOpen] = useState(false);
  const isGuest = !user?.username;
  const t = translate(translationData ?? {});

  const toggleDropdown = () => setOpen(!open);

  return (
    <div class="relative">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ocean-deep-50 hover:bg-ocean-deep-100 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2 transition-all duration-200 text-ocean-deep-700 font-medium text-sm"
        onClick={toggleDropdown}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("header.userOptions.ariaLabel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <span>
          {open
            ? t("header.userOptions.closeMenu")
            : t("header.userOptions.openMenu")}
        </span>
      </button>

      {open && (
        <div
          class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div class="p-3 border-b border-gray-100">
            {isGuest
              ? (
                <div class="space-y-3">
                  <div class="text-sm font-medium text-gray-900">
                    {t("header.userOptions.guestTitle")}
                  </div>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {t("header.userOptions.guestSubtitle")}
                  </p>
                </div>
              )
              : (
                <div class="space-y-2">
                  <div class="text-sm font-medium text-gray-900">
                    {t("header.userOptions.welcome")}
                  </div>
                  <div class="text-xs text-gray-600">
                    {t("header.userOptions.username")} {user?.username}
                  </div>
                </div>
              )}
          </div>

          <div class="p-2">
            {isGuest
              ? (
                <div class="space-y-2">
                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="text-red-500 shrink-0"
                    >
                      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
                    </svg>
                    <span>
                      {t("header.userOptions.signInGoogle")}
                    </span>
                  </button>

                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="text-indigo-500 shrink-0"
                    >
                      <path d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" />
                    </svg>
                    <span>
                      {t("header.userOptions.signInDiscord")}
                    </span>
                  </button>
                </div>
              )
              : (
                <div class="space-y-1">
                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="shrink-0"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16,17 21,12 16,7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>{t("header.userOptions.logout")}</span>
                  </button>

                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="shrink-0"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 4a4 4 0 0 1 8 0v6a4 4 0 0 1-3 3.87" />
                      <path d="M12 18v0a7 7 0 0 1 7-7V7a7 7 0 0 0-7-7" />
                    </svg>
                    <span>
                      {t("header.userOptions.changeUsername")}
                    </span>
                  </button>

                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="shrink-0"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <path d="M9 11a4 4 0 1 0 8 0" />
                      <path d="M7 19.5v.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.5" />
                    </svg>
                    <span>
                      {t("header.userOptions.changeAvatar")}
                    </span>
                  </button>

                  <div class="border-t border-gray-100 my-2"></div>

                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="shrink-0"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <span>
                      {t("header.userOptions.help")}
                    </span>
                  </button>
                </div>
              )}
          </div>

          {!isGuest && (
            <div class="px-3 py-2 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
              <div class="text-xs text-gray-500 text-center">
                {t("header.userOptions.signedInAs")}{" "}
                {user?.username}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {open && (
        <div
          class="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

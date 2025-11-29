import { useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";
import type { AuthProvider } from "@/models/User.ts";

/** Auth provider display configuration */
const AUTH_PROVIDER_CONFIG: Record<
  AuthProvider,
  { icon: string; labelKey: string }
> = {
  discord: {
    icon: "/svg/discord.svg",
    labelKey: "common.header.userOptions.signInDiscord",
  },
  google: {
    icon: "/svg/google.svg",
    labelKey: "common.header.userOptions.signInGoogle",
  },
  kakao: {
    icon: "/svg/kakao.svg",
    labelKey: "common.header.userOptions.signInKakao",
  },
  line: {
    icon: "/svg/line.svg",
    labelKey: "common.header.userOptions.signInLine",
  },
  wechat: {
    icon: "/svg/wechat.svg",
    labelKey: "common.header.userOptions.signInWechat",
  },
};

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
  translationData?: Record<string, unknown>;
  /** List of available auth providers (configured on server) */
  availableProviders?: AuthProvider[];
};

export default function UserOptionsDropdown({
  user,
  translationData,
  availableProviders = [],
}: Props) {
  const [open, setOpen] = useState(false);
  const isGuest = !user?.username;
  const t = translate(translationData ?? {});

  const toggleDropdown = () => setOpen(!open);

  const handleSignIn = (provider: AuthProvider) => {
    // TODO: Integrate with Better Auth client
    // For now, redirect to the auth endpoint
    globalThis.location.href = `/api/auth/signin/${provider}`;
  };

  const handleSignOut = () => {
    // TODO: Integrate with Better Auth client
    globalThis.location.href = "/api/auth/signout";
  };

  return (
    <div class="relative">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ocean-deep-50 hover:bg-ocean-deep-100 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2 transition-all duration-200 text-ocean-deep-700 font-medium text-sm"
        onClick={toggleDropdown}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("common.header.userOptions.ariaLabel")}
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
            ? t("common.header.userOptions.closeMenu")
            : isGuest
            ? t("common.header.userOptions.guestTitle")
            : t("common.header.userOptions.openMenu")}
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
                    {t("common.header.userOptions.guestTitle")}
                  </div>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {t("common.header.userOptions.guestSubtitle")}
                  </p>
                </div>
              )
              : (
                <div class="space-y-2">
                  <div class="text-sm font-medium text-gray-900">
                    {t("common.header.userOptions.welcome")}
                  </div>
                  <div class="text-xs text-gray-600">
                    {t("common.header.userOptions.username")} {user?.username}
                  </div>
                </div>
              )}
          </div>

          <div class="p-2">
            {isGuest
              ? (
                <div class="space-y-2">
                  {availableProviders.length === 0
                    ? (
                      <div class="text-sm text-gray-500 text-center py-2">
                        {t("common.header.userOptions.noProvidersAvailable")}
                      </div>
                    )
                    : (
                      availableProviders.map((provider) => {
                        const config = AUTH_PROVIDER_CONFIG[provider];
                        return (
                          <button
                            key={provider}
                            type="button"
                            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                            onClick={() => handleSignIn(provider)}
                          >
                            <img
                              src={config.icon}
                              alt={provider}
                              width="16"
                              height="16"
                              class="shrink-0"
                            />
                            <span>{t(config.labelKey)}</span>
                          </button>
                        );
                      })
                    )}
                </div>
              )
              : (
                <div class="space-y-1">
                  <button
                    type="button"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-deep-500 focus:ring-offset-2"
                    onClick={handleSignOut}
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
                    <span>{t("common.header.userOptions.logout")}</span>
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
                      {t("common.header.userOptions.changeUsername")}
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
                      {t("common.header.userOptions.changeAvatar")}
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
                      {t("common.header.userOptions.help")}
                    </span>
                  </button>
                </div>
              )}
          </div>

          {!isGuest && (
            <div class="px-3 py-2 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
              <div class="text-xs text-gray-500 text-center">
                {t("common.header.userOptions.signedInAs")} {user?.username}
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

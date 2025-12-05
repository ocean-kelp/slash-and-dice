import { useState } from "preact/hooks";
import { translate } from "@/custom-i18n/translator.ts";
import type { AuthProvider, AuthProviderId } from "@/models/AuthProvider.ts";
import { needsChannelSelection } from "@/models/AuthProvider.ts";
import { signInWithProvider } from "@/lib/auth-client.ts";

/** Provider styling configuration */
const PROVIDER_STYLES: Record<
  AuthProviderId,
  {
    bgColor: string;
    hoverColor: string;
    disabledColor: string;
    iconFilter?: string;
  }
> = {
  discord: {
    bgColor: "bg-[#5865F2]",
    hoverColor: "hover:bg-[#4752C4]",
    disabledColor: "bg-[#5865F2]/50",
    iconFilter: "brightness(0) invert(1)",
  },
  google: {
    bgColor: "bg-white border border-gray-300",
    hoverColor: "hover:bg-gray-50",
    disabledColor: "bg-gray-100 border border-gray-200",
  },
  kakao: {
    bgColor: "bg-[#FEE500]",
    hoverColor: "hover:bg-[#E6CF00]",
    disabledColor: "bg-[#FEE500]/50",
  },
  line: {
    bgColor: "bg-[#06C755]",
    hoverColor: "hover:bg-[#05B04C]",
    disabledColor: "bg-[#06C755]/50",
    iconFilter: "brightness(0) invert(1)",
  },
  wechat: {
    bgColor: "bg-[#07C160]",
    hoverColor: "hover:bg-[#06AD56]",
    disabledColor: "bg-[#07C160]/50",
    iconFilter: "brightness(0) invert(1)",
  },
};

/** Get text color based on provider */
function getTextColor(providerId: AuthProviderId, disabled: boolean): string {
  if (disabled) {
    return providerId === "google" || providerId === "kakao"
      ? "text-gray-400"
      : "text-white/60";
  }
  return providerId === "google" || providerId === "kakao"
    ? "text-gray-800"
    : "text-white";
}

type Props = {
  translationData?: Record<string, unknown>;
  availableProviders?: AuthProvider[];
  locale: string;
};

export default function LoginProviders({
  translationData,
  availableProviders = [],
  locale,
}: Props) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [expandedProvider, setExpandedProvider] = useState<
    AuthProviderId | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = translate(translationData ?? {});

  const handleSignIn = async (provider: AuthProvider, channelId?: string) => {
    if (!consentGiven) return;

    // If provider has multiple channels and none selected, expand to show channels
    if (needsChannelSelection(provider) && !channelId) {
      setExpandedProvider(
        expandedProvider === provider.id ? null : provider.id,
      );
      return;
    }

    // Build the provider ID for sign in
    let providerId: string = provider.id;
    if (provider.id === "line" && channelId) {
      providerId = `line-${channelId}`;
    }

    setIsLoading(true);
    try {
      await signInWithProvider(providerId);
    } catch (error) {
      console.error("Sign in failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div class="p-6">
      {/* Consent Section */}
      <div class="mb-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
        <div class="flex items-start gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-ocean-deep-500/20 flex items-center justify-center shrink-0">
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
              class="text-ocean-deep-400"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-white">
              {t("common.login.consent.title")}
            </h3>
            <p class="text-sm text-gray-400 mt-1">
              {t("common.login.consent.description")}
            </p>
          </div>
        </div>

        <ul class="space-y-2 ml-13 mb-4">
          <li class="flex items-center gap-2 text-sm text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-ocean-deep-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t("common.login.consent.purposes.recovery")}
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-ocean-deep-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t("common.login.consent.purposes.support")}
          </li>
        </ul>

        <p class="text-xs text-gray-500 mb-4">
          {t("common.login.consent.privacy")}
        </p>

        {/* Consent checkbox */}
        <label class="flex items-start gap-3 cursor-pointer group">
          <div class="relative mt-0.5">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) =>
                setConsentGiven((e.target as HTMLInputElement).checked)}
              class="sr-only peer"
            />
            <div class="w-5 h-5 border-2 border-gray-500 rounded transition-all peer-checked:border-ocean-deep-500 peer-checked:bg-ocean-deep-500 group-hover:border-ocean-deep-400">
              {consentGiven && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="absolute top-0.5 left-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          <span class="text-sm text-gray-300">
            {t("common.login.consent.checkbox")}{" "}
            <a
              href={`/${locale}/privacy`}
              class="text-ocean-deep-400 hover:underline"
            >
              {t("common.login.consent.privacyLink")}
            </a>{" "}
            {t("common.login.consent.andText")}{" "}
            <a
              href={`/${locale}/terms`}
              class="text-ocean-deep-400 hover:underline"
            >
              {t("common.login.consent.termsLink")}
            </a>
          </span>
        </label>
      </div>

      {/* Providers Section */}
      <div>
        <h3 class="text-sm font-medium text-gray-300 mb-3">
          {t("common.login.providers.title")}
        </h3>

        {!consentGiven && (
          <p class="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-3">
            {t("common.login.providers.disabled")}
          </p>
        )}

        {availableProviders.length === 0
          ? (
            <div class="text-sm text-gray-500 text-center py-4 bg-gray-700/50 rounded-xl">
              {t("common.header.userOptions.noProvidersAvailable")}
            </div>
          )
          : (
            <div class="space-y-2.5">
              {availableProviders.map((provider) => {
                const styles = PROVIDER_STYLES[provider.id];
                const isExpanded = expandedProvider === provider.id;
                const showChannels = needsChannelSelection(provider);
                const disabled = !consentGiven || isLoading;

                return (
                  <div key={provider.id}>
                    {/* Main provider button */}
                    <button
                      type="button"
                      disabled={disabled}
                      class={`
                      w-full flex items-center px-4 py-3 rounded-xl
                      text-sm font-semibold
                      ${
                        disabled
                          ? styles.disabledColor
                          : `${styles.bgColor} ${styles.hoverColor}`
                      }
                      ${getTextColor(provider.id, disabled)}
                      transform active:scale-[0.98]
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-ocean-deep-500
                      ${
                        disabled
                          ? "cursor-not-allowed"
                          : "cursor-pointer shadow-sm hover:shadow-md"
                      }
                      ${showChannels && isExpanded ? "rounded-b-none" : ""}
                    `}
                      onClick={() => handleSignIn(provider)}
                    >
                      {/* Left spacer for alignment when chevron is present */}
                      {showChannels && <div class="w-3.5" />}

                      {/* Centered content */}
                      <div class="flex-1 flex items-center justify-center gap-3">
                        {isLoading
                          ? (
                            // Loading spinner
                            <svg
                              class="animate-spin h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              >
                              </circle>
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              >
                              </path>
                            </svg>
                          )
                          : (
                            <>
                              <img
                                src={provider.icon}
                                alt={provider.id}
                                width="20"
                                height="20"
                                class={`shrink-0 ${
                                  disabled ? "opacity-50" : ""
                                }`}
                                style={styles.iconFilter
                                  ? { filter: styles.iconFilter }
                                  : undefined}
                              />
                              <span>{t(provider.labelKey)}</span>
                            </>
                          )}
                      </div>

                      {/* Chevron for multi-channel providers */}
                      {showChannels && (
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
                            isExpanded ? "rotate-180" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                    </button>

                    {/* Channel options (expanded) */}
                    {showChannels && isExpanded && consentGiven && (
                      <div class="bg-gray-700/80 rounded-b-xl border-t border-gray-600 overflow-hidden">
                        {provider.channels.map((channel) => (
                          <button
                            key={channel.id}
                            type="button"
                            disabled={isLoading}
                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-600/50 transition-colors disabled:opacity-50"
                            onClick={() => handleSignIn(provider, channel.id)}
                          >
                            <span class="w-5 h-5 flex items-center justify-center text-ocean-deep-400">
                              {channel.isDefault && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                            <span>{t(channel.labelKey)}</span>
                            {channel.isDefault && (
                              <span class="ml-auto text-xs text-gray-400">
                                {t("common.auth.channels.defaultLabel")}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

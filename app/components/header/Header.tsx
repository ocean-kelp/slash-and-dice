import HomeButton from "./HomeButton.tsx";
import UserProfile from "./UserProfile.tsx";
import UserOptionsDropdown from "@/islands/header/UserOptionsDropdown.tsx";
import Logo from "./Logo.tsx";
import SearchModal from "@/islands/header/SearchModal.tsx";
import LanguageSelector from "@/islands/header/LanguageSelector.tsx";
import AvatarSelectionModal from "@/islands/welcome/AvatarSelectionModal.tsx";
import { translate } from "@/custom-i18n/translator.ts";

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
  translationData?: Record<string, unknown>;
  /** Current locale for navigation */
  locale?: string;
};

export default function Header(
  { user, translationData, locale }: Props,
) {
  const t = translate(translationData ?? {});

  const ariaLabel = t("common.header.ariaLabel");

  return (
    <>
      {/* Avatar Onboarding Modal - checks and shows automatically if needed */}
      <AvatarSelectionModal translationData={translationData} />

      <div
        class="fixed top-0 left-0 right-0 z-50 bg-white"
        aria-label={ariaLabel}
      >
        {/* Bottom gradient fade */}
        <div class="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-b from-transparent to-gray-900/30 pointer-events-none" />

        <div class="w-full mx-auto px-4 sm:px-6 lg:px-10">
          <header class="h-16 sm:h-20">
            {/* Mobile Layout: Optimized space usage */}
            <div class="lg:hidden flex items-center justify-between h-full gap-3">
              {/* Left: Logo (slightly smaller on mobile) */}
              <div class="flex items-center">
                <a href="/" class="inline-flex items-center">
                  <img
                    src="/logos/DS-logo.webp"
                    alt="DS logo"
                    class="h-10 sm:h-12 w-auto"
                  />
                </a>
              </div>

              {/* Right: Search + Language + Auth (grouped utility controls) */}
              <div class="flex items-center gap-2">
                {/* Search Modal Button - Mobile instance (button only, modal rendered by desktop instance) */}
                <SearchModal
                  translationData={translationData}
                  buttonOnly={true}
                />

                {/* Language Selector */}
                <LanguageSelector
                  currentLocale={locale || "en"}
                  translationData={translationData}
                />

                {/* User Profile (only when logged in) */}
                {user?.username && (
                  <div class="hidden xs:block">
                    <UserProfile
                      user={user}
                      translationData={translationData}
                    />
                  </div>
                )}

                {/* Login/Dropdown */}
                <UserOptionsDropdown
                  user={user}
                  translationData={translationData}
                  locale={locale}
                />
              </div>
            </div>

            {/* Desktop Layout: Full featured */}
            <div class="hidden lg:flex items-center gap-4 h-full relative">
              {/* Left: Logo */}
              <div class="flex items-center shrink-0">
                <Logo />
              </div>

              {/* Center: Search Modal - Absolutely positioned to center on screen */}
              <div class="absolute left-1/2 -translate-x-1/2">
                <SearchModal translationData={translationData} />
              </div>

              {/* Right: HomeButton and user controls */}
              <div class="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 shrink-0 ml-auto">
                <HomeButton />

                <div class="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <LanguageSelector
                    currentLocale={locale || "en"}
                    translationData={translationData}
                  />
                  <UserProfile
                    user={user}
                    translationData={translationData}
                  />
                  <UserOptionsDropdown
                    user={user}
                    translationData={translationData}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}

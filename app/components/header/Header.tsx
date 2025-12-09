import HomeButton from "./HomeButton.tsx";
import UserProfile from "./UserProfile.tsx";
import UserOptionsDropdown from "@/islands/header/UserOptionsDropdown.tsx";
import Logo from "./Logo.tsx";
import SearchBar from "@/islands/header/SearchBar.tsx";
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

        <div class="w-full mx-auto px-6 sm:px-8 lg:px-10">
          <header class="flex items-center gap-4 h-20">
            {/* Left: Logo */}
            <div class="flex items-center shrink-0">
              <Logo />
            </div>

            {/* Center: Search bar - hidden on small screens, grows to fill available space on larger screens */}
            <div class="hidden lg:flex flex-1 items-center justify-center px-4 min-w-0">
              <div class="w-full max-w-md xl:max-w-lg">
                <SearchBar />
              </div>
            </div>

            {/* Right: HomeButton and user controls */}
            <div class="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 shrink-0">
              <HomeButton />

              <div class="flex items-center gap-2 sm:gap-3 md:gap-4">
                <LanguageSelector
                  currentLocale={locale || "en"}
                  translationData={translationData}
                />
                <UserProfile user={user} translationData={translationData} />
                <UserOptionsDropdown
                  user={user}
                  translationData={translationData}
                  locale={locale}
                />
              </div>
            </div>
          </header>

          {/* Mobile search: show below header on small/medium screens */}
          <div class="lg:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}

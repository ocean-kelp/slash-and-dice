import HomeButton from "./HomeButton.tsx";
import UserProfile from "./UserProfile.tsx";
import UserOptionsDropdown from "@/islands/header/UserOptionsDropdown.tsx";
import Logo from "./Logo.tsx";
import SearchBar from "@/islands/header/SearchBar.tsx";
import { translate } from "@/utilities/languages.ts";

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
  translationData?: Record<string, unknown>;
};

export default function Header({ user, translationData }: Props) {
  const t = translate(translationData ?? {});

  const ariaLabel = t("common.header.ariaLabel");

  return (
    <>
      <div
        class="fixed top-0 left-0 right-0 z-50 bg-white"
        aria-label={ariaLabel}
      >
        <div class="relative w-full mx-auto px-6 sm:px-8 lg:px-10">
          <header class="flex items-center gap-4 h-20">

            {/* left: logo */}
            <div class="flex items-center shrink-0">
              <Logo />
            </div>

            {/* spacer: let logo and right-side items align naturally. The search is positioned absolutely below so it stays centered on screen. */}
            <div class="flex-1" />

            {/* small gap then HomeButton and finally user profile at right */}
            <div class="flex items-center gap-10 ml-8">
              <HomeButton />

              <div class="pr-2 flex items-center gap-2">
                <UserProfile user={user} translationData={translationData} />
                <UserOptionsDropdown
                  user={user}
                  translationData={translationData}
                />
              </div>
            </div>
          </header>

          {
            /* Centered search overlay: absolutely center within the relative container above.
              Use pointer-events-none on the overlay so it doesn't block clicks to header elements,
              and enable pointer-events-auto on the search wrapper so the input remains interactive. */
          }
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-full max-w-[90%] md:max-w-[40vw] pointer-events-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

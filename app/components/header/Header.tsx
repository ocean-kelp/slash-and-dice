import HomeButton from "./HomeButton.tsx";
import UserProfile from "./UserProfile.tsx";
import Logo from "./Logo.tsx";

type Props = {
  user?: {
    username?: string;
    iconUrl?: string;
  };
};

export default function Header({ user }: Props) {
  return (
    <>
        <div class="fixed top-0 left-0 right-0 z-50 bg-white">
            <div class="relative w-full mx-auto px-4 sm:px-6 lg:px-8">

            <header class="flex items-center gap-4 h-20">
                {/* left: logo */}
                <div class="flex items-center shrink-0">
                <Logo />
                </div>

                {/* middle: search (mock) - grows to take available space */}
                <div class="flex-1">
                <div class="max-w-[40vw]">
                    <label class="sr-only">Search</label>
                    <div class="relative">
                    <input
                        type="text"
                        placeholder="Search (mock)"
                        class="w-full border border-gray-200 rounded-[99999px] py-2 px-3 pl-10 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean-deep-200"
                    />
                    <div class="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none text-gray-400">
                        <svg
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                        >
                        <path
                            d="M21 21l-4.35-4.35"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <circle
                            cx="11"
                            cy="11"
                            r="6"
                            stroke="currentColor"
                            stroke-width="1.5"
                        />
                        </svg>
                    </div>
                    </div>
                </div>
                </div>

                {/* small gap then HomeButton and finally user profile at right */}
                <div class="flex items-center gap-4 ml-4">

                <HomeButton />

                <div class="pr-2">
                    <UserProfile user={user} />
                </div>

                </div>

            </header>

            </div>
        </div>
    </>
  );
}

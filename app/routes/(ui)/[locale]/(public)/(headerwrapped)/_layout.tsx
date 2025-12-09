import Header from "@/components/header/Header.tsx";
import { LayoutProps } from "@/utilities/layout.ts";
import type { User } from "@/models/User.ts";

export default function Layout(props: LayoutProps) {
  // Extract essential data from layout props
  const {
    Component,
    state: { translationData, locale, user },
  } = props;

  // Transform user data for header
  const headerUser = user as User | undefined;

  const userForHeader = headerUser
    ? {
      username: headerUser.name,
      iconUrl: headerUser.selectedAvatarUrl ||
        headerUser.providers.find((p) => p.imageUrl)?.imageUrl,
    }
    : undefined;

  return (
    <>
      <Header
        user={userForHeader}
        translationData={translationData}
        locale={locale}
      />
      <div class="pt-20 min-h-screen bg-linear-to-b from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
        {/* Squiggle Pattern Background */}
        <div
          class="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/svg/squiggle-pattern.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px 400px",
            backgroundPosition: "center",
          }}
        />

        {/* Atmospheric Background Effects */}
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          class="fixed bottom-6 left-6 z-50 p-3 bg-gray-800/80 backdrop-blur-sm rounded-full border-2 border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:bg-gray-800/90 hover:text-purple-200 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>

        {/* Content */}
        <div class="relative">
          <Component />
        </div>
      </div>
    </>
  );
}

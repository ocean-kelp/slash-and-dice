import Header from "@/components/header/Header.tsx";
import { LayoutProps } from "@/utilities/layout.ts";
import type { User } from "@/models/User.ts";
import BackButton from "@/islands/navigation/BackButton.tsx";

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

      <div class="pt-32 lg:pt-20 min-h-screen bg-linear-to-b from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
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
        <BackButton />

        {/* Content */}
        <div class="relative">
          <Component />
        </div>
      </div>
    </>
  );
}

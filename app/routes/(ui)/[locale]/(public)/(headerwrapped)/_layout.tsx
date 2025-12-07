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
      <div class="pt-20">
        <Component />
      </div>
    </>
  );
}

import Header from "@/components/header/Header.tsx";
import { LayoutProps } from "@/utilities/layout.ts";

export default function Layout(props: LayoutProps) {
  // Extract essential data from layout props
  const {
    Component,
    state: { translationData, locale },
  } = props;

  return (
    <>
      <Header
        translationData={translationData}
        locale={locale}
      />
      <div class="pt-20">
        <Component />
      </div>
    </>
  );
}

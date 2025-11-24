import { PageProps } from "fresh";
import Header from "@/components/header/Header.tsx";

import { State } from "@/utils.ts";

type Props = {
  translationData?: Record<string, unknown>;
};

export default function Layout(
  { Component, state }: PageProps<Props, State>,
) {
  // Layout provides the header once for all child routes under this folder.
  // Pass translation data (if any) to the Header so it can render translated labels.
  const translationData = state?.translationData;
  return (
    <>
      <Header translationData={translationData} />
      <div class="pt-20">
        <Component />
      </div>
    </>
  );
}

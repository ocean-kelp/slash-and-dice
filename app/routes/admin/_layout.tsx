import { LayoutProps } from "@/utilities/layout.ts";

export default function Layout(props: LayoutProps) {
  // Extract essential data from layout props
  const {
    Component,
  } = props;

  return (
    <>

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

        {/* Content */}
        <div class="relative">
          <Component />
        </div>

      </div>
    </>
  );
}

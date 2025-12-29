import { State } from "@/utils.ts";
import { PageProps } from "fresh";
import { getFeatures } from "@/data/config/features.tsx";

export default function Home({ state }: PageProps<unknown, State>) {
  const t = state.t;
  const title = t("common.home.title");

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" />
      </head>

      <main class="flex flex-col">
        {/* Hero Section */}
        <section class="relative overflow-hidden shrink-0 mb-6">
          <div class="relative max-w-7xl mx-auto px-6 pt-12 pb-0 sm:pt-16 sm:pb-0 lg:pt-20 lg:pb-0">
            <div class="text-center">
              {/* Epic Title with Glow Effect */}
              <div class="relative inline-block">
                <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  {title}
                </h1>
                <div class="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 opacity-20 blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section class="relative max-w-7xl mx-auto px-6 pb-6 flex-1 flex overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full content-start">
            {getFeatures(t).map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

type FeatureCardProps = {
  icon: preact.JSX.Element;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
};

function FeatureCard(
  { icon, title, description, href, comingSoon }: FeatureCardProps,
) {
  const content = (
    <div
      class={`group relative bg-gray-800/50 rounded-xl border border-purple-500/20 p-5
        backdrop-blur-sm
        hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]
        hover:bg-gray-800/70
        transition-all duration-300 h-full flex flex-col
        ${comingSoon ? "opacity-60" : "cursor-pointer"}`}
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 rounded-xl bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      <div class="relative flex items-center justify-between mb-3">
        <div class="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all border border-purple-500/20">
          {icon}
        </div>
        {comingSoon && (
          <span class="text-xs font-bold px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
            Coming Soon
          </span>
        )}
      </div>

      <h3 class="relative text-lg font-bold text-purple-100 mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p class="relative text-sm text-gray-400 flex-1 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {!comingSoon && (
        <div class="relative mt-4 flex items-center text-sm text-purple-400 font-semibold group-hover:text-purple-300 group-hover:gap-2 transition-all">
          <span>Explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (comingSoon) {
    return <div>{content}</div>;
  }

  return <a href={href}>{content}</a>;
}

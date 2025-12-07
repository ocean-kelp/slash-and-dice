import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import { auth } from "@/lib/auth.ts";
import type { LinkedProvider } from "@/models/User.ts";
import AvatarSelectionModal from "@/islands/welcome/AvatarSelectionModal.tsx";

export const handler = defineRoute.handlers({
  async GET(ctx) {
    const state = ctx.state;

    // Check if user is logged in and needs onboarding
    const session = await auth.api.getSession({ headers: ctx.req.headers });
    let showOnboarding = false;
    let providers: LinkedProvider[] = [];

    if (session?.user) {
      const { getUserById } = await import("@/db/repositories/userRepo.ts");
      const user = await getUserById(session.user.id);

      // Show onboarding modal if user hasn't selected an avatar yet
      if (user && !user.selectedAvatarUrl) {
        showOnboarding = true;
        providers = user.providers || [];
      }
    }

    return {
      data: {
        translationData: state.translationData ?? {},
        showOnboarding,
        providers,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  showOnboarding?: boolean;
  providers?: LinkedProvider[];
};

export default function Home({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});

  const title = t("common.home.title");

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" />
      </head>

      {/* Onboarding Modal */}
      {data.showOnboarding && (
        <AvatarSelectionModal
          providers={data.providers || []}
          translationData={data.translationData}
        />
      )}

      <main class="min-h-screen bg-linear-to-b from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
        {/* Atmospheric Background Effects */}
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

        {/* Hero Section */}
        <section class="relative overflow-hidden">
          <div class="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
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

          {/* Decorative bottom fade */}
          <div class="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-900 to-transparent" />
        </section>

        {/* Features Grid */}
        <section class="relative max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Characters */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title={t("common.home.features.characters.title")}
              description={t("common.home.features.characters.description")}
              href="/characters"
            />

            {/* Builds */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              }
              title={t("common.home.features.builds.title")}
              description={t("common.home.features.builds.description")}
              href="/builds"
              comingSoon
            />

            {/* Codex */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              }
              title={t("common.home.features.codex.title")}
              description={t("common.home.features.codex.description")}
              href="/codex"
              comingSoon
            />

            {/* Community */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
              title={t("common.home.features.community.title")}
              description={t("common.home.features.community.description")}
              href="/community"
              comingSoon
            />

            {/* Tier Lists */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
              title={t("common.home.features.tierLists.title")}
              description={t("common.home.features.tierLists.description")}
              href="/tier-lists"
              comingSoon
            />

            {/* Guides */}
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              }
              title={t("common.home.features.guides.title")}
              description={t("common.home.features.guides.description")}
              href="/guides"
              comingSoon
            />
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
      class={`group relative bg-gray-800/50 rounded-2xl border border-purple-500/20 p-8
        backdrop-blur-sm
        hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]
        hover:bg-gray-800/70
        transition-all duration-300 h-full flex flex-col
        ${comingSoon ? "opacity-60" : "cursor-pointer"}`}
    >
      {/* Card glow effect on hover */}
      <div class="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />

      <div class="relative flex items-center justify-between mb-4">
        <div class="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all border border-purple-500/20">
          {icon}
        </div>
        {comingSoon && (
          <span class="text-xs font-bold px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
            Coming Soon
          </span>
        )}
      </div>

      <h3 class="relative text-xl font-bold text-purple-100 mb-3 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p class="relative text-gray-400 flex-1 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {!comingSoon && (
        <div class="relative mt-6 flex items-center text-purple-400 font-semibold group-hover:text-purple-300 group-hover:gap-2 transition-all">
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

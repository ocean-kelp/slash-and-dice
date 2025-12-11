import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";

export const handler = defineRoute.handlers({
  GET(ctx) {
    return {
      data: {
        translationData: ctx.state.translationData ?? {},
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
};

export default function SkillsPage({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});

  return (
    <>
      <head>
        <title>{t("common.skills.title")} - Slash & Dice</title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-12">
            <h1 class="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              {t("common.skills.title")}
            </h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("common.skills.description")}
            </p>
          </div>

          {/* Coming Soon Section */}
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-purple-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9.5 9h5L12 4 9.5 9z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-purple-100 mb-2">
              Coming Soon
            </h2>
            <p class="text-gray-400 mb-6">
              We're gathering skill data and images for all characters. Stay
              tuned!
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div class="text-purple-300 font-semibold mb-2">
                  Character Skills
                </div>
                <div class="text-sm text-gray-400">
                  Detailed breakdown of all character abilities and skills
                </div>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div class="text-purple-300 font-semibold mb-2">
                  Skill Trees
                </div>
                <div class="text-sm text-gray-400">
                  Interactive skill progression and mastery paths
                </div>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div class="text-purple-300 font-semibold mb-2">
                  Build Guides
                </div>
                <div class="text-sm text-gray-400">
                  Optimal skill combinations and strategies
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

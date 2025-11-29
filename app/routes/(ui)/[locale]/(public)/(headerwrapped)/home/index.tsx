import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const state = ctx.state;

    return {
      data: {
        translationData: state.translationData ?? {},
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
};

export default function Home({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});

  const title = t("common.home.title");
  const subtitle = t("common.home.subtitle");
  const cta = t("common.home.cta");
  const notice = t("common.home.notice");

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </head>

      <main class="min-h-screen bg-linear-to-br from-ocean-deep-50 via-ocean-deep-100 to-white flex items-center justify-center p-6">
        <section class="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
          <div class="mb-4">
            <h1 class="text-3xl font-extrabold text-ocean-deep-700">{title}</h1>
            <p class="mt-2 text-gray-600">{subtitle}</p>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p class="text-sm text-gray-500">{notice}</p>

            <div class="flex gap-3">
              <a
                class="inline-flex items-center px-4 py-2 bg-ocean-deep-600 text-white rounded-lg shadow-sm hover:bg-ocean-deep-700 transition"
                href="#"
                aria-label={cta}
              >
                {cta}
              </a>

              <a
                class="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                href="#"
              >
                {t("common.home.learnMore")}
              </a>
            </div>
          </div>

          <footer class="mt-6 text-xs text-gray-400">
            This is a temporary placeholder — replace when real home is ready.
          </footer>
        </section>
      </main>
    </>
  );
}

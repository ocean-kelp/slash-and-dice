import { define } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import Logo from "@/components/header/Logo.tsx";

export const handler = define.handlers({
  GET(ctx) {
    const state = ctx.state;

    return {
      data: {
        translationData: state.translationData ?? {},
        locale: ctx.params.locale,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  locale: string;
};

export default function PrivacyPage({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});
  const { locale } = data;

  const title = t("common.legal.privacy.title");

  return (
    <>
      <head>
        <title>{title} | Slash & Dice</title>
        <meta
          name="description"
          content={t("common.legal.privacy.description")}
        />
      </head>

      <main class="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-ocean-deep-900">
        {/* Header */}
        <header class="p-6 border-b border-gray-700/50">
          <div class="max-w-4xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Logo />
              <span class="px-2 py-1 text-xs font-medium bg-ocean-deep-500/20 text-ocean-deep-400 rounded-md border border-ocean-deep-500/30">
                Fan Community
              </span>
            </div>
            <a
              href={`/${locale}/login`}
              class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {t("common.legal.backToLogin")}
            </a>
          </div>
        </header>

        {/* Main content */}
        <div class="max-w-4xl mx-auto p-6 py-12">
          {/* Title */}
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-white mb-3">{title}</h1>
            <p class="text-lg text-gray-400">
              {t("common.legal.privacy.lastUpdated")}:{" "}
              {t("common.legal.privacy.lastUpdatedDate")}
            </p>
          </div>

          {/* Content */}
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.introduction.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.privacy.introduction.content")}
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.dataCollection.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed mb-4">
                {t("common.legal.privacy.dataCollection.intro")}
              </p>
              <ul class="space-y-3 ml-6">
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.dataCollection.items.email")}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.dataCollection.items.profile")}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.dataCollection.items.usage")}
                  </span>
                </li>
              </ul>
            </section>

            {/* How We Use Your Data */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.dataUsage.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed mb-4">
                {t("common.legal.privacy.dataUsage.intro")}
              </p>
              <ul class="space-y-3 ml-6">
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t(
                      "common.legal.privacy.dataUsage.purposes.authentication",
                    )}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.dataUsage.purposes.recovery")}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.dataUsage.purposes.support")}
                  </span>
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.dataSharing.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.privacy.dataSharing.content")}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.yourRights.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed mb-4">
                {t("common.legal.privacy.yourRights.intro")}
              </p>
              <ul class="space-y-3 ml-6">
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.yourRights.rights.access")}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.yourRights.rights.deletion")}
                  </span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-ocean-deep-400 shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    {t("common.legal.privacy.yourRights.rights.correction")}
                  </span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.privacy.contact.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.privacy.contact.content")}
              </p>
            </section>
          </div>

          {/* Footer links */}
          <div class="mt-8 text-center text-sm text-gray-500">
            <a
              href={`/${locale}/terms`}
              class="hover:text-ocean-deep-400 transition-colors"
            >
              {t("common.legal.terms.title")}
            </a>
            <span class="mx-2">•</span>
            <a
              href={`/${locale}/home`}
              class="hover:text-ocean-deep-400 transition-colors"
            >
              {t("common.home.title")}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

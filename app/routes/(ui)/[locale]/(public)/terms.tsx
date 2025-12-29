import { define, State } from "@/utils.ts";
import { PageProps } from "fresh";
import Logo from "@/components/header/Logo.tsx";

export const handler = define.handlers({
  GET(ctx) {
    return {
      data: {
        locale: ctx.params.locale,
      },
    };
  },
});

type Props = {
  locale: string;
};

export default function TermsPage({ data, state }: PageProps<Props, State>) {
  const t = state.t;
  const { locale } = data;

  const title = t("common.legal.terms.title");

  return (
    <>
      <head>
        <title>{title} | Slash & Dice</title>
        <meta
          name="description"
          content={t("common.legal.terms.description")}
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
              {t("common.legal.terms.lastUpdated")}:{" "}
              {t("common.legal.terms.lastUpdatedDate")}
            </p>
          </div>

          {/* Content */}
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8 space-y-8">
            {/* Acceptance */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.acceptance.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.terms.acceptance.content")}
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.accountRegistration.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed mb-4">
                {t("common.legal.terms.accountRegistration.intro")}
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
                    {t(
                      "common.legal.terms.accountRegistration.requirements.age",
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
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                  <span>
                    {t(
                      "common.legal.terms.accountRegistration.requirements.accuracy",
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
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                  <span>
                    {t(
                      "common.legal.terms.accountRegistration.requirements.security",
                    )}
                  </span>
                </li>
              </ul>
            </section>

            {/* User Conduct */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.userConduct.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed mb-4">
                {t("common.legal.terms.userConduct.intro")}
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
                    class="text-red-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>
                    {t("common.legal.terms.userConduct.prohibited.harassment")}
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
                    class="text-red-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>
                    {t("common.legal.terms.userConduct.prohibited.illegal")}
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
                    class="text-red-400 shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>
                    {t("common.legal.terms.userConduct.prohibited.spam")}
                  </span>
                </li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.termination.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.terms.termination.content")}
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.disclaimer.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.terms.disclaimer.content")}
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.changes.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.terms.changes.content")}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 class="text-2xl font-semibold text-white mb-4">
                {t("common.legal.terms.contact.title")}
              </h2>
              <p class="text-gray-300 leading-relaxed">
                {t("common.legal.terms.contact.content")}
              </p>
            </section>
          </div>

          {/* Footer links */}
          <div class="mt-8 text-center text-sm text-gray-500">
            <a
              href={`/${locale}/privacy`}
              class="hover:text-ocean-deep-400 transition-colors"
            >
              {t("common.legal.privacy.title")}
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

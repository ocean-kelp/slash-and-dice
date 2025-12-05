import { define } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import type { AuthProvider } from "@/models/AuthProvider.ts";
import LoginProviders from "@/islands/auth/LoginProviders.tsx";
import Logo from "@/components/header/Logo.tsx";

export const handler = define.handlers({
  GET(ctx) {
    const state = ctx.state;

    return {
      data: {
        translationData: state.translationData ?? {},
        availableProviders: state.availableAuthProviders ?? [],
        locale: ctx.params.locale,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  availableProviders?: AuthProvider[];
  locale: string;
};

export default function LoginPage({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});
  const { availableProviders = [], locale } = data;

  const title = t("common.login.title");
  const subtitle = t("common.login.subtitle");

  return (
    <>
      <head>
        <title>{title} | Slash & Dice</title>
        <meta name="description" content={subtitle} />
      </head>

      <main class="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-ocean-deep-900 flex flex-col">
        {/* Header with logo and back link */}
        <header class="p-6">
          <div class="max-w-md mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Logo />
              <span class="px-2 py-1 text-xs font-medium bg-ocean-deep-500/20 text-ocean-deep-400 rounded-md border border-ocean-deep-500/30">
                Fan Community
              </span>
            </div>
            <a
              href={`/${locale}/home`}
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
              {t("common.login.back")}
            </a>
          </div>
        </header>

        {/* Main content */}
        <div class="flex-1 flex items-center justify-center p-6">
          <div class="w-full max-w-md">
            {/* Title section */}
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-white mb-3">{title}</h1>
              <p class="text-lg text-gray-400">{subtitle}</p>
            </div>

            {/* Login card with consent and providers */}
            <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
              <LoginProviders
                translationData={data.translationData}
                availableProviders={availableProviders}
                locale={locale}
              />
            </div>

            {/* Footer links */}
            <div class="mt-6 text-center text-sm text-gray-500">
              <a
                href={`/${locale}/privacy`}
                class="hover:text-ocean-deep-400 transition-colors"
              >
                {t("common.login.consent.privacyLink")}
              </a>
              <span class="mx-2">•</span>
              <a
                href={`/${locale}/terms`}
                class="hover:text-ocean-deep-400 transition-colors"
              >
                {t("common.login.consent.termsLink")}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

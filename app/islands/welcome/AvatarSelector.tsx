import { signal } from "@preact/signals";
import { translate } from "@/custom-i18n/translator.ts";
import type { LinkedProvider } from "@/models/User.ts";

const DICEBEAR_STYLES = [
  "lorelei",
  "adventurer",
  "avataaars",
  "big-ears",
  "big-smile",
  "bottts",
  "croodles",
  "fun-emoji",
  "micah",
  "miniavs",
  "notionists",
  "open-peeps",
  "personas",
  "pixel-art",
] as const;

type DicebearStyle = typeof DICEBEAR_STYLES[number];

interface Props {
  providers: LinkedProvider[];
  userId: string;
  translationData?: Record<string, unknown>;
}

const selectedTab = signal<"providers" | "generated">("providers");
const selectedProviderUrl = signal<string | null>(null);
const selectedStyle = signal<DicebearStyle>("lorelei");
const selectedSeed = signal<string>("");
const isSaving = signal(false);

export default function AvatarSelector(
  { providers, userId, translationData }: Props,
) {
  const t = translate(translationData ?? {});

  // Initialize seed with userId if not set
  if (!selectedSeed.value) {
    selectedSeed.value = userId;
  }

  const getDicebearUrl = (style: DicebearStyle, seed: string) => {
    return `https://api.dicebear.com/9.x/${style}/svg?seed=${
      encodeURIComponent(seed)
    }`;
  };

  const currentGeneratedUrl = getDicebearUrl(
    selectedStyle.value,
    selectedSeed.value,
  );

  const handleRandomize = () => {
    selectedSeed.value = `${userId}-${Date.now()}`;
  };

  const handleSelectProvider = (imageUrl: string) => {
    selectedProviderUrl.value = imageUrl;
    selectedTab.value = "providers";
  };

  const handleSelectGenerated = () => {
    selectedProviderUrl.value = null;
  };

  const handleSave = async () => {
    isSaving.value = true;
    try {
      const avatarUrl = selectedProviderUrl.value || currentGeneratedUrl;

      // Save to backend
      const response = await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedAvatarUrl: avatarUrl,
          avatarStyle: selectedProviderUrl.value
            ? undefined
            : selectedStyle.value,
          avatarSeed: selectedProviderUrl.value
            ? undefined
            : selectedSeed.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save avatar");
      }

      // Redirect to home after successful save
      const locale = globalThis.location.pathname.split("/")[1];
      globalThis.location.href = `/${locale}/home`;
    } catch (error) {
      console.error("Failed to save avatar:", error);
      alert("Failed to save avatar. Please try again.");
    } finally {
      isSaving.value = false;
    }
  };

  const providersWithImages = providers.filter((p) => p.imageUrl);

  return (
    <div class="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {t("common.welcome.avatarSelection.title")}
        </h2>
        <p class="text-gray-600 mt-2">
          {t("common.welcome.avatarSelection.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div class="flex gap-2 mb-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            selectedTab.value = "providers";
            handleSelectProvider(providersWithImages[0]?.imageUrl || "");
          }}
          class={`px-4 py-2 font-medium transition-colors ${
            selectedTab.value === "providers"
              ? "text-ocean-deep-600 border-b-2 border-ocean-deep-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("common.welcome.avatarSelection.tabs.providers")} (
          {providersWithImages.length})
        </button>
        <button
          type="button"
          onClick={() => {
            selectedTab.value = "generated";
            handleSelectGenerated();
          }}
          class={`px-4 py-2 font-medium transition-colors ${
            selectedTab.value === "generated"
              ? "text-ocean-deep-600 border-b-2 border-ocean-deep-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("common.welcome.avatarSelection.tabs.generated")}
        </button>
      </div>

      {/* Content */}
      <div class="min-h-[400px]">
        {selectedTab.value === "providers" && (
          <div>
            <h3 class="text-lg font-semibold mb-4">
              {t("common.welcome.avatarSelection.providers.title")}
            </h3>
            {providersWithImages.length === 0
              ? (
                <p class="text-gray-500 text-center py-8">
                  No provider avatars available
                </p>
              )
              : (
                <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {providersWithImages.map((provider) => (
                    <button
                      type="button"
                      key={provider.accountId}
                      onClick={() => handleSelectProvider(provider.imageUrl!)}
                      class={`relative p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedProviderUrl.value === provider.imageUrl
                          ? "border-ocean-deep-500 bg-ocean-deep-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={provider.imageUrl}
                        alt={`${provider.providerId} avatar`}
                        class="w-full aspect-square rounded-full object-cover"
                      />
                      <p class="text-xs text-center mt-2 font-medium capitalize">
                        {provider.providerId}
                      </p>
                      {selectedProviderUrl.value === provider.imageUrl && (
                        <div class="absolute top-2 right-2 bg-ocean-deep-500 text-white rounded-full p-1">
                          <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
          </div>
        )}

        {selectedTab.value === "generated" && (
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">
                {t("common.welcome.avatarSelection.dicebear.title")}
              </h3>
              <button
                type="button"
                onClick={handleRandomize}
                class="px-4 py-2 bg-ocean-deep-600 text-white rounded-lg hover:bg-ocean-deep-700 transition"
              >
                🎲 {t("common.welcome.avatarSelection.dicebear.randomize")}
              </button>
            </div>

            {/* Preview */}
            <div class="flex justify-center mb-6">
              <div class="relative">
                <img
                  src={currentGeneratedUrl}
                  alt="Generated avatar preview"
                  class="w-48 h-48 rounded-full border-4 border-ocean-deep-200"
                />
              </div>
            </div>

            {/* Style selector */}
            <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
              {DICEBEAR_STYLES.map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => {
                    selectedStyle.value = style;
                  }}
                  class={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedStyle.value === style
                      ? "border-ocean-deep-500 bg-ocean-deep-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={getDicebearUrl(style, selectedSeed.value)}
                    alt={style}
                    class="w-full aspect-square rounded-full"
                  />
                  <p class="text-xs text-center mt-2 font-medium capitalize">
                    {style.replace("-", " ")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => {
            // Skip onboarding and redirect to home
            const locale = globalThis.location.pathname.split("/")[1];
            globalThis.location.href = `/${locale}/home`;
          }}
          class="text-gray-600 hover:text-gray-800 transition"
        >
          {t("common.welcome.skip")}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving.value}
          class="px-6 py-3 bg-ocean-deep-600 text-white rounded-lg hover:bg-ocean-deep-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving.value
            ? t("common.welcome.saving")
            : t("common.welcome.continue")}
        </button>
      </div>
    </div>
  );
}

import { useSignal } from "@preact/signals";
import { translate } from "@/custom-i18n/translator.ts";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock.ts";
import type { LinkedProvider } from "@/models/User.ts";
import { showAvatarModal } from "@/signals/avatarModal.ts";

interface Props {
  providers: LinkedProvider[];
  translationData?: Record<string, unknown>;
}

// Lorelei avatar customization options
interface LoreleiOptions {
  beardProbability: number;
  earringsProbability: number;
  frecklesProbability: number;
  glassesProbability: number;
  hairAccessoriesProbability: number;
  flip: boolean;
  backgroundColor: string[];
  eyes?: string[];
  hair?: string[];
  head?: string[];
  mouth?: string[];
  nose?: string[];
}

const HAIR_COLORS = [
  "0e0e0e", // Black
  "3c2415", // Dark Brown
  "6a4e42", // Brown
  "a55728", // Auburn
  "b58143", // Light Brown
  "d6b370", // Blonde
  "e8e1e1", // White/Gray
];

const EYES_COLORS = [
  "000000", // Black
  "2c1b18", // Dark Brown
  "624e3a", // Brown
  "3b7a57", // Green
  "4a90e2", // Blue
  "8e7cc3", // Violet
  "a0a0a0", // Gray
];

const SKIN_COLORS = [
  "ffdbb4", // Light
  "edb98a", // Medium Light
  "d08b5b", // Medium
  "ae5d29", // Medium Dark
  "8d5524", // Dark
  "613d24", // Very Dark
];

const BACKGROUND_COLORS = [
  "b6e3f4", // Light Blue
  "c0aede", // Purple
  "d1d4f9", // Lavender
  "ffd5dc", // Pink
  "ffdfbf", // Peach
  "f0f0f0", // Gray
];

const MOUTH_COLORS = [
  "d08b5b", // Natural
  "c97064", // Pink
  "a55353", // Dark Pink
  "8b5a5a", // Mauve
  "000000", // Black
];

const NOSE_COLORS = [
  "ae5d29", // Natural Brown
  "d08b5b", // Light Brown
  "8d5524", // Dark Brown
  "000000", // Black
];

// Eye variants (24 total)
const EYE_VARIANTS = Array.from(
  { length: 24 },
  (_, i) => `variant${String(i + 1).padStart(2, "0")}`,
);

// Hair variants (48 total)
const HAIR_VARIANTS = Array.from(
  { length: 48 },
  (_, i) => `variant${String(i + 1).padStart(2, "0")}`,
);

// Head variants (4 total)
const HEAD_VARIANTS = Array.from(
  { length: 4 },
  (_, i) => `variant${String(i + 1).padStart(2, "0")}`,
);

// Mouth variants (18 happy + 9 sad = 27 total)
const MOUTH_VARIANTS = [
  ...Array.from(
    { length: 18 },
    (_, i) => `happy${String(i + 1).padStart(2, "0")}`,
  ),
  ...Array.from(
    { length: 9 },
    (_, i) => `sad${String(i + 1).padStart(2, "0")}`,
  ),
];

// Nose variants (6 total)
const NOSE_VARIANTS = Array.from(
  { length: 6 },
  (_, i) => `variant${String(i + 1).padStart(2, "0")}`,
);

export default function AvatarSelectionModal(
  { providers, translationData }: Props,
) {
  const t = translate(translationData ?? {});

  // Filter providers that have images
  const providersWithImages = providers.filter((p) => p.imageUrl);

  // State - use global signal for modal visibility
  const isOpen = showAvatarModal;
  const selectedTab = useSignal<"providers" | "generate">(
    providersWithImages.length > 0 ? "providers" : "generate",
  );
  const selectedAvatar = useSignal<string | null>(
    providersWithImages[0]?.imageUrl || null,
  );
  const selectedStyle = useSignal<string>("lorelei");
  const avatarSeed = useSignal<string>(crypto.randomUUID());
  const isSaving = useSignal(false);

  // Lorelei customization options
  const loreleiOptions = useSignal<LoreleiOptions>({
    beardProbability: 20,
    earringsProbability: 50,
    frecklesProbability: 30,
    glassesProbability: 20,
    hairAccessoriesProbability: 30,
    flip: false,
    backgroundColor: ["b6e3f4"],
    eyes: [],
    hair: [],
    head: [],
    mouth: [],
    nose: [],
  });
  const hairColor = useSignal<string>("0e0e0e");
  const skinColor = useSignal<string>("ffdbb4");
  const eyesColor = useSignal<string>("000000");
  const mouthColor = useSignal<string>("d08b5b");
  const noseColor = useSignal<string>("ae5d29");
  const hairAccessoriesColor = useSignal<string>("000000");

  // Customization tab state
  const customizationTab = useSignal<
    "eyes" | "hair" | "head" | "mouth" | "nose" | "colors"
  >("eyes");

  // Lock body scroll when modal is open
  useBodyScrollLock();

  const buildAvatarUrl = () => {
    const params = new URLSearchParams({
      seed: avatarSeed.value,
      beardProbability: loreleiOptions.value.beardProbability.toString(),
      earringsProbability: loreleiOptions.value.earringsProbability.toString(),
      frecklesProbability: loreleiOptions.value.frecklesProbability.toString(),
      glassesProbability: loreleiOptions.value.glassesProbability.toString(),
      hairAccessoriesProbability: loreleiOptions.value
        .hairAccessoriesProbability.toString(),
      flip: loreleiOptions.value.flip.toString(),
      hairColor: hairColor.value,
      skinColor: skinColor.value,
      backgroundColor: loreleiOptions.value.backgroundColor.join(","),
      eyesColor: eyesColor.value,
      mouthColor: mouthColor.value,
      noseColor: noseColor.value,
      hairAccessoriesColor: hairAccessoriesColor.value,
    });

    // Add variant selections if any are set
    if (loreleiOptions.value.eyes && loreleiOptions.value.eyes.length > 0) {
      params.set("eyes", loreleiOptions.value.eyes.join(","));
    }
    if (loreleiOptions.value.hair && loreleiOptions.value.hair.length > 0) {
      params.set("hair", loreleiOptions.value.hair.join(","));
    }
    if (loreleiOptions.value.head && loreleiOptions.value.head.length > 0) {
      params.set("head", loreleiOptions.value.head.join(","));
    }
    if (loreleiOptions.value.mouth && loreleiOptions.value.mouth.length > 0) {
      params.set("mouth", loreleiOptions.value.mouth.join(","));
    }
    if (loreleiOptions.value.nose && loreleiOptions.value.nose.length > 0) {
      params.set("nose", loreleiOptions.value.nose.join(","));
    }

    return `https://api.dicebear.com/9.x/${selectedStyle.value}/svg?${params}`;
  };

  const currentGeneratedUrl = buildAvatarUrl();

  // Auto-select generated avatar when on generate tab
  if (selectedTab.value === "generate") {
    selectedAvatar.value = currentGeneratedUrl;
  }

  const handleRandomize = () => {
    avatarSeed.value = crypto.randomUUID();
    selectedAvatar.value = currentGeneratedUrl;
  };

  const handleSave = async () => {
    if (!selectedAvatar.value || isSaving.value) return;

    isSaving.value = true;

    try {
      const avatarUrl = selectedAvatar.value;
      const avatarData: {
        selectedAvatarUrl: string;
        avatarStyle?: string;
        avatarSeed?: string;
      } = {
        selectedAvatarUrl: avatarUrl,
      };

      // If it's a generated avatar, save the style and seed
      if (selectedTab.value === "generate") {
        avatarData.avatarStyle = selectedStyle.value;
        avatarData.avatarSeed = avatarSeed.value;
      }

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avatarData),
      });

      if (!response.ok) {
        throw new Error("Failed to save avatar");
      }

      // Close modal and reload page to show new avatar
      isOpen.value = false;
      // Small delay to ensure database write completes before reload
      await new Promise((resolve) => setTimeout(resolve, 300));
      globalThis.location.reload();
    } catch (error) {
      console.error("Failed to save avatar:", error);
      alert("Failed to save avatar. Please try again.");
    } finally {
      isSaving.value = false;
    }
  };

  if (!isOpen.value) return null;

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => {
        isOpen.value = false;
      }}
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div class="overflow-auto max-h-[90vh] rounded-2xl">
          {/* Header */}
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  {t("common.welcome.title")}
                </h2>
                <p class="text-gray-600 mt-1">
                  {t("common.welcome.subtitle")}
                </p>
              </div>
              <div class="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    isOpen.value = false;
                  }}
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 transition font-medium"
                >
                  {t("common.welcome.cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!selectedAvatar.value || isSaving.value}
                  class="px-6 py-2 bg-ocean-deep-600 text-white rounded-lg hover:bg-ocean-deep-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                >
                  {isSaving.value
                    ? t("common.welcome.saving")
                    : t("common.welcome.save")}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div class="p-6">
            {/* Avatar Selection */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                {t("common.welcome.avatarSelection.title")}
              </h3>

              {/* Tabs */}
              <div class="flex gap-2 mb-6 border-b border-gray-200">
                {providersWithImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      selectedTab.value = "providers";
                      selectedAvatar.value = providersWithImages[0]?.imageUrl ||
                        null;
                    }}
                    class={`px-4 py-2 font-medium transition ${
                      selectedTab.value === "providers"
                        ? "text-ocean-deep-600 border-b-2 border-ocean-deep-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t("common.welcome.avatarSelection.yourAccounts")} (
                    {providersWithImages.length})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    selectedTab.value = "generate";
                    selectedAvatar.value = currentGeneratedUrl;
                  }}
                  class={`px-4 py-2 font-medium transition ${
                    selectedTab.value === "generate"
                      ? "text-ocean-deep-600 border-b-2 border-ocean-deep-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("common.welcome.avatarSelection.generateNew")}
                </button>
              </div>

              {/* Provider Avatars */}
              {selectedTab.value === "providers" &&
                providersWithImages.length > 0 && (
                <div>
                  <p class="text-sm text-gray-600 mb-4">
                    {t("common.welcome.avatarSelection.connectedAccounts")}
                  </p>
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {providersWithImages.map((provider) => (
                      <button
                        key={provider.providerId}
                        type="button"
                        onClick={() =>
                          selectedAvatar.value = provider.imageUrl!}
                        class={`relative rounded-lg overflow-hidden aspect-square transition ${
                          selectedAvatar.value === provider.imageUrl
                            ? "ring-4 ring-ocean-deep-500"
                            : "ring-2 ring-gray-200 hover:ring-gray-300"
                        }`}
                      >
                        <img
                          src={provider.imageUrl}
                          alt={`${provider.providerId} avatar`}
                          class="w-full h-full object-cover"
                        />
                        {selectedAvatar.value === provider.imageUrl && (
                          <div class="absolute inset-0 bg-ocean-deep-500/20 flex items-center justify-center">
                            <svg
                              class="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DiceBear Generator */}
              {selectedTab.value === "generate" && (
                <div class="space-y-6">
                  {/* Top: Preview */}
                  <div class="flex justify-center">
                    <div class="w-40 h-40 rounded-full overflow-hidden ring-4 ring-ocean-deep-500 shadow-xl">
                      <img
                        src={currentGeneratedUrl}
                        alt="Generated avatar preview"
                        class="w-full h-full"
                        key={currentGeneratedUrl}
                      />
                    </div>
                  </div>

                  {/* Bottom: Tabbed Customization */}
                  <div class="space-y-4">
                    {/* Randomize Button */}
                    <div class="flex justify-center">
                      <button
                        type="button"
                        onClick={handleRandomize}
                        class="px-6 py-2.5 bg-ocean-deep-600 text-white rounded-lg hover:bg-ocean-deep-700 transition text-sm font-medium shadow-md hover:shadow-lg"
                      >
                        🎲{" "}
                        {t("common.welcome.avatarSelection.dicebear.randomize")}
                      </button>
                    </div>

                    {/* Customization Tabs */}
                    <div class="border-b border-gray-200">
                      <div class="flex gap-1 overflow-x-auto pb-px">
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "eyes"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "eyes"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          👁️ {t(
                            "common.welcome.avatarSelection.dicebear.eyesStyle",
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "hair"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "hair"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          💇 {t(
                            "common.welcome.avatarSelection.dicebear.hairStyle",
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "head"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "head"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          👤 {t(
                            "common.welcome.avatarSelection.dicebear.headShape",
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "mouth"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "mouth"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          👄 {t(
                            "common.welcome.avatarSelection.dicebear.mouthExpression",
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "nose"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "nose"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          👃 {t(
                            "common.welcome.avatarSelection.dicebear.noseStyle",
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => customizationTab.value = "colors"}
                          class={`px-4 py-2.5 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                            customizationTab.value === "colors"
                              ? "text-ocean-deep-600 border-ocean-deep-600"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          🎨 {t(
                            "common.welcome.avatarSelection.dicebear.customize",
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Customization Content */}
                    <div class="bg-gray-50 rounded-lg p-4 min-h-[400px]">
                      {/* Eyes Tab */}
                      {customizationTab.value === "eyes" && (
                        <div class="space-y-4">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.eyesStyle",
                            )}
                          </h4>
                          <div class="grid grid-cols-6 gap-2">
                            {EYE_VARIANTS.map((variant) => {
                              const previewUrl =
                                `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&eyes=${variant}&size=64`;
                              const isSelected =
                                loreleiOptions.value.eyes?.[0] === variant;
                              return (
                                <button
                                  key={variant}
                                  type="button"
                                  onClick={() => {
                                    loreleiOptions.value = {
                                      ...loreleiOptions.value,
                                      eyes: [variant],
                                    };
                                  }}
                                  class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                    isSelected
                                      ? "ring-2 ring-ocean-deep-500"
                                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                                  }`}
                                  title={variant}
                                >
                                  <img
                                    src={previewUrl}
                                    alt={variant}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Hair Tab */}
                      {customizationTab.value === "hair" && (
                        <div class="space-y-4">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.hairStyle",
                            )}
                          </h4>
                          <div class="grid grid-cols-6 gap-2">
                            {HAIR_VARIANTS.map((variant) => {
                              const previewUrl =
                                `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&hair=${variant}&size=64`;
                              const isSelected =
                                loreleiOptions.value.hair?.[0] === variant;
                              return (
                                <button
                                  key={variant}
                                  type="button"
                                  onClick={() => {
                                    loreleiOptions.value = {
                                      ...loreleiOptions.value,
                                      hair: [variant],
                                    };
                                  }}
                                  class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                    isSelected
                                      ? "ring-2 ring-ocean-deep-500"
                                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                                  }`}
                                  title={variant}
                                >
                                  <img
                                    src={previewUrl}
                                    alt={variant}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Head Tab */}
                      {customizationTab.value === "head" && (
                        <div class="space-y-4">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.headShape",
                            )}
                          </h4>
                          <div class="grid grid-cols-4 gap-2">
                            {HEAD_VARIANTS.map((variant) => {
                              const previewUrl =
                                `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&head=${variant}&size=64`;
                              const isSelected =
                                loreleiOptions.value.head?.[0] === variant;
                              return (
                                <button
                                  key={variant}
                                  type="button"
                                  onClick={() => {
                                    loreleiOptions.value = {
                                      ...loreleiOptions.value,
                                      head: [variant],
                                    };
                                  }}
                                  class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                    isSelected
                                      ? "ring-2 ring-ocean-deep-500"
                                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                                  }`}
                                  title={variant}
                                >
                                  <img
                                    src={previewUrl}
                                    alt={variant}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Mouth Tab */}
                      {customizationTab.value === "mouth" && (
                        <div class="space-y-4">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.mouthExpression",
                            )}
                          </h4>

                          {/* Happy Mouths */}
                          <div>
                            <p class="text-xs text-gray-600 mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.happy",
                              )}
                            </p>
                            <div class="grid grid-cols-6 gap-2">
                              {MOUTH_VARIANTS.filter((v) =>
                                v.startsWith("happy")
                              ).map((variant) => {
                                const previewUrl =
                                  `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&mouth=${variant}&size=64`;
                                const isSelected =
                                  loreleiOptions.value.mouth?.[0] === variant;
                                return (
                                  <button
                                    key={variant}
                                    type="button"
                                    onClick={() => {
                                      loreleiOptions.value = {
                                        ...loreleiOptions.value,
                                        mouth: [variant],
                                      };
                                    }}
                                    class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                      isSelected
                                        ? "ring-2 ring-ocean-deep-500"
                                        : "ring-1 ring-gray-200 hover:ring-gray-300"
                                    }`}
                                    title={variant}
                                  >
                                    <img
                                      src={previewUrl}
                                      alt={variant}
                                      class="w-full h-full object-cover"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sad Mouths */}
                          <div>
                            <p class="text-xs text-gray-600 mb-2">
                              {t("common.welcome.avatarSelection.dicebear.sad")}
                            </p>
                            <div class="grid grid-cols-6 gap-2">
                              {MOUTH_VARIANTS.filter((v) => v.startsWith("sad"))
                                .map((variant) => {
                                  const previewUrl =
                                    `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&mouth=${variant}&size=64`;
                                  const isSelected =
                                    loreleiOptions.value.mouth?.[0] === variant;
                                  return (
                                    <button
                                      key={variant}
                                      type="button"
                                      onClick={() => {
                                        loreleiOptions.value = {
                                          ...loreleiOptions.value,
                                          mouth: [variant],
                                        };
                                      }}
                                      class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                        isSelected
                                          ? "ring-2 ring-ocean-deep-500"
                                          : "ring-1 ring-gray-200 hover:ring-gray-300"
                                      }`}
                                      title={variant}
                                    >
                                      <img
                                        src={previewUrl}
                                        alt={variant}
                                        class="w-full h-full object-cover"
                                      />
                                    </button>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Nose Tab */}
                      {customizationTab.value === "nose" && (
                        <div class="space-y-4">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.noseStyle",
                            )}
                          </h4>
                          <div class="grid grid-cols-6 gap-2">
                            {NOSE_VARIANTS.map((variant) => {
                              const previewUrl =
                                `https://api.dicebear.com/9.x/lorelei/svg?seed=preview&nose=${variant}&size=64`;
                              const isSelected =
                                loreleiOptions.value.nose?.[0] === variant;
                              return (
                                <button
                                  key={variant}
                                  type="button"
                                  onClick={() => {
                                    loreleiOptions.value = {
                                      ...loreleiOptions.value,
                                      nose: [variant],
                                    };
                                  }}
                                  class={`relative aspect-square rounded-lg overflow-hidden transition ${
                                    isSelected
                                      ? "ring-2 ring-ocean-deep-500"
                                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                                  }`}
                                  title={variant}
                                >
                                  <img
                                    src={previewUrl}
                                    alt={variant}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Colors Tab */}
                      {customizationTab.value === "colors" && (
                        <div class="space-y-6">
                          <h4 class="font-medium text-gray-900">
                            {t(
                              "common.welcome.avatarSelection.dicebear.customize",
                            )}
                          </h4>

                          {/* Flip Toggle */}
                          <div class="flex items-center justify-between">
                            <label class="text-sm text-gray-700">
                              {t(
                                "common.welcome.avatarSelection.dicebear.flip",
                              )}
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                loreleiOptions.value = {
                                  ...loreleiOptions.value,
                                  flip: !loreleiOptions.value.flip,
                                };
                              }}
                              class={`px-3 py-1 rounded text-sm transition ${
                                loreleiOptions.value.flip
                                  ? "bg-ocean-deep-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {loreleiOptions.value.flip
                                ? t(
                                  "common.welcome.avatarSelection.dicebear.flipped",
                                )
                                : t(
                                  "common.welcome.avatarSelection.dicebear.normal",
                                )}
                            </button>
                          </div>

                          {/* Hair Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.hairColor",
                              )}
                            </label>
                            <div class="grid grid-cols-7 gap-2">
                              {HAIR_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    hairColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    hairColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Skin Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.skinTone",
                              )}
                            </label>
                            <div class="grid grid-cols-6 gap-2">
                              {SKIN_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    skinColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    skinColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Background Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.background",
                              )}
                            </label>
                            <div class="grid grid-cols-6 gap-2">
                              {BACKGROUND_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    loreleiOptions.value = {
                                      ...loreleiOptions.value,
                                      backgroundColor: [color],
                                    };
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    loreleiOptions.value.backgroundColor[0] ===
                                        color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Eyes Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.eyesColor",
                              )}
                            </label>
                            <div class="grid grid-cols-7 gap-2">
                              {EYES_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    eyesColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    eyesColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Mouth Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.mouthColor",
                              )}
                            </label>
                            <div class="grid grid-cols-5 gap-2">
                              {MOUTH_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    mouthColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    mouthColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Nose Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.noseColor",
                              )}
                            </label>
                            <div class="grid grid-cols-4 gap-2">
                              {NOSE_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    noseColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    noseColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Hair Accessories Color */}
                          <div>
                            <label class="text-sm text-gray-700 block mb-2">
                              {t(
                                "common.welcome.avatarSelection.dicebear.hairAccessoriesColor",
                              )}
                            </label>
                            <div class="grid grid-cols-7 gap-2">
                              {HAIR_COLORS.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    hairAccessoriesColor.value = color;
                                  }}
                                  class={`w-8 h-8 rounded-full transition ${
                                    hairAccessoriesColor.value === color
                                      ? "ring-2 ring-ocean-deep-500 ring-offset-2"
                                      : "hover:ring-2 hover:ring-gray-300"
                                  }`}
                                  style={{ backgroundColor: `#${color}` }}
                                  title={`#${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Accessories Sliders */}
                          <div class="space-y-3 pt-2">
                            <div>
                              <div class="flex justify-between text-sm mb-1">
                                <label class="text-gray-700">
                                  {t(
                                    "common.welcome.avatarSelection.dicebear.beard",
                                  )}
                                </label>
                                <span class="text-gray-500">
                                  {loreleiOptions.value.beardProbability}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={loreleiOptions.value.beardProbability}
                                onInput={(e) => {
                                  loreleiOptions.value = {
                                    ...loreleiOptions.value,
                                    beardProbability: parseInt(
                                      (e.target as HTMLInputElement).value,
                                    ),
                                  };
                                }}
                                class="w-full"
                              />
                            </div>

                            <div>
                              <div class="flex justify-between text-sm mb-1">
                                <label class="text-gray-700">
                                  {t(
                                    "common.welcome.avatarSelection.dicebear.earrings",
                                  )}
                                </label>
                                <span class="text-gray-500">
                                  {loreleiOptions.value.earringsProbability}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={loreleiOptions.value.earringsProbability}
                                onInput={(e) => {
                                  loreleiOptions.value = {
                                    ...loreleiOptions.value,
                                    earringsProbability: parseInt(
                                      (e.target as HTMLInputElement).value,
                                    ),
                                  };
                                }}
                                class="w-full"
                              />
                            </div>

                            <div>
                              <div class="flex justify-between text-sm mb-1">
                                <label class="text-gray-700">
                                  {t(
                                    "common.welcome.avatarSelection.dicebear.glasses",
                                  )}
                                </label>
                                <span class="text-gray-500">
                                  {loreleiOptions.value.glassesProbability}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={loreleiOptions.value.glassesProbability}
                                onInput={(e) => {
                                  loreleiOptions.value = {
                                    ...loreleiOptions.value,
                                    glassesProbability: parseInt(
                                      (e.target as HTMLInputElement).value,
                                    ),
                                  };
                                }}
                                class="w-full"
                              />
                            </div>

                            <div>
                              <div class="flex justify-between text-sm mb-1">
                                <label class="text-gray-700">
                                  {t(
                                    "common.welcome.avatarSelection.dicebear.freckles",
                                  )}
                                </label>
                                <span class="text-gray-500">
                                  {loreleiOptions.value.frecklesProbability}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={loreleiOptions.value.frecklesProbability}
                                onInput={(e) => {
                                  loreleiOptions.value = {
                                    ...loreleiOptions.value,
                                    frecklesProbability: parseInt(
                                      (e.target as HTMLInputElement).value,
                                    ),
                                  };
                                }}
                                class="w-full"
                              />
                            </div>

                            <div>
                              <div class="flex justify-between text-sm mb-1">
                                <label class="text-gray-700">
                                  {t(
                                    "common.welcome.avatarSelection.dicebear.hairAccessories",
                                  )}
                                </label>
                                <span class="text-gray-500">
                                  {loreleiOptions.value
                                    .hairAccessoriesProbability}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={loreleiOptions.value
                                  .hairAccessoriesProbability}
                                onInput={(e) => {
                                  loreleiOptions.value = {
                                    ...loreleiOptions.value,
                                    hairAccessoriesProbability: parseInt(
                                      (e.target as HTMLInputElement).value,
                                    ),
                                  };
                                }}
                                class="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

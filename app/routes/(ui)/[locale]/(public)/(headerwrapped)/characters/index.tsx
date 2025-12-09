import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { translate } from "@/custom-i18n/translator.ts";
import {
  type CharacterListItem,
  characterService,
} from "@/services/local/game/characterService.ts";
import CharacterCard from "../../../../../../components/characters/CharacterCard.tsx";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const characters = characterService.getAllCharacters();

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        characters,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  characters: CharacterListItem[];
};

export default function CharactersPage({ data }: PageProps<Props>) {
  const t = translate(data.translationData ?? {});

  return (
    <>
      <head>
        <title>{t("common.characters.title")} - Slash & Dice</title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-7xl mx-auto">
          {/* Page Header */}
          <div class="text-center mb-12">
            <h1 class="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              {t("common.characters.title")}
            </h1>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("common.characters.description")}
            </p>
          </div>

          {/* Characters Grid */}
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {data.characters.map((character) => (
              <CharacterCard
                key={character.name}
                character={character}
                locale={data.translationData?.locale as string || "en"}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

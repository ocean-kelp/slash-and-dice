import { define as defineRoute } from "@/utils.ts";
import { PageProps } from "fresh";
import { characterService } from "@/services/local/data/characterService.ts";
import type { Character } from "@/models/Character.ts";

export const handler = defineRoute.handlers({
  GET(ctx) {
    const characterName = ctx.params.character;
    const character = characterService.getByName(characterName);

    if (!character) {
      return new Response(null, {
        status: 404,
        statusText: "Character not found",
      });
    }

    return {
      data: {
        translationData: ctx.state.translationData ?? {},
        character,
      },
    };
  },
});

type Props = {
  translationData?: Record<string, unknown>;
  character: Character;
};

export default function CharacterDetailPage({ data }: PageProps<Props>) {
  const { character } = data;

  return (
    <>
      <head>
        <title>
          {character.name.charAt(0).toUpperCase() + character.name.slice(1)}
          {" "}
          - Slash & Dice
        </title>
      </head>

      <main class="min-h-screen py-12 px-6">
        <div class="max-w-5xl mx-auto">
          {/* Back Button */}
          <a
            href={`/${data.translationData?.locale || "en"}/characters`}
            class="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Characters
          </a>

          {/* Character Header */}
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-8">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              {/* Character Image */}
              <div class="shrink-0 flex items-center justify-center">
                <img
                  src={characterService.getThumbnail(character.name)}
                  alt={character.name}
                  class="w-64 h-64 object-contain"
                  style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                />
              </div>

              {/* Character Info */}
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-200 via-purple-100 to-purple-300 mb-4 capitalize">
                  {character.name}
                </h1>

                {/* Stats Grid */}
                <div class="grid grid-cols-2 gap-4 mt-8">
                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">HP</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {character.stats.hp}
                    </div>
                  </div>

                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">ATK Power</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {character.stats.atkPower}
                    </div>
                  </div>

                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">Crit Rate</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {(character.stats.critRate * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">ATK Speed</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {(character.stats.atkSpeed * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">Move Speed</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {character.stats.moveSpeed}
                    </div>
                  </div>

                  <div class="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div class="text-sm text-gray-400 mb-1">Skill DMG</div>
                    <div class="text-2xl font-bold text-purple-100">
                      {(character.stats.skillDmg * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

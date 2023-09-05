import { useEffect, useState } from "react";

import { Character, Characters, CharactersApiResponse, World } from "../types";

async function fetchCharacter(
  characterId: string,
  world: World
): Promise<CharactersApiResponse<Characters>> {
  const response = await fetch(`/api/characters/${characterId}`, {
    method: "POST",
    body: JSON.stringify({ characterId, world }),
  }).then((res) => res.json());

  let character: CharactersApiResponse<Characters> = {
    data: [],
    total: 0,
  };

  switch (world) {
    case World.marvel:
      character = {
        data: response.data.data?.results,
        total: response.data.data?.total,
      };

      console.log("character", character);
      break;

    case World.harry_potter:
      character = {
        data: response.data,
        total: response.data.length,
      };

    case World.naruto:
      character = {
        data: response.data,
        total: 1,
      };

    default:
      break;
  }

  return character;
}

const methods = (characterId: string) => ({
  [World.marvel]: fetchCharacter(characterId, World.marvel),
  [World.harry_potter]: fetchCharacter(characterId, World.harry_potter),
  [World.naruto]: fetchCharacter(characterId, World.naruto),
});

const getMethod = async (characterId: string, world: World) =>
  await methods(characterId)[world];

export function useCharacter(characterId: string, world: World) {
  const [character, setCharacter] = useState<Character | null>(null);

  async function getCharacter() {
    const character = await getMethod(characterId, world);

    setCharacter(character.data[0] ?? character.data);
  }

  useEffect(() => {
    getCharacter();
  }, [characterId, world]);

  return character;
}

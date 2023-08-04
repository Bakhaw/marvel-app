import { useEffect, useState } from "react";

import { MarvelCharacter } from "../types";

export function useCharacter(characterId: string) {
  const [character, setCharacter] = useState<MarvelCharacter | null>(null);

  async function getCharacter(characterId: string) {
    const response = await fetch(`/api/characters/${characterId}`, {
      method: "POST",
      body: JSON.stringify({ characterId }),
    }).then((res) => res.json());

    const character: MarvelCharacter = response.data.data.results[0];
    setCharacter(character);
  }

  useEffect(() => {
    getCharacter(characterId);
  }, [characterId]);

  return character;
}

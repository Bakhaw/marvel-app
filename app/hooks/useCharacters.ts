import { useEffect, useState } from "react";

import { MarvelCharacter } from "../types";

export function useCharacters(query: string) {
  const [characters, setCharacters] = useState<MarvelCharacter[] | null>(null);

  async function getCharacters(query: string) {
    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }).then((res) => res.json());

    const newCharacters = response.data.data.results;
    setCharacters(newCharacters);
  }

  useEffect(() => {
    getCharacters(query);
  }, [query]);

  return characters;
}

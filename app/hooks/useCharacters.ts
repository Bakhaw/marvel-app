import { useEffect, useState } from "react";

import { MarvelApiResponse, MarvelCharacter } from "../types";

export type CharactersParams = {
  limit: number;
  offset: number;
  search: string;
};

type CharactersType = MarvelApiResponse<MarvelCharacter>;

const initialState: CharactersType = {
  count: 0,
  limit: 0,
  offset: 0,
  results: [],
  total: 0,
};

export function useCharacters({ limit, offset, search }: CharactersParams) {
  const [characters, setCharacters] = useState<CharactersType>(initialState);

  async function getCharacters(query: string) {
    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }).then((res) => res.json());

    const newCharacters = response.data.data;
    setCharacters(newCharacters);
  }

  const query = `limit=${limit}&${
    search ? `nameStartsWith=${search}` : ""
  }&offset=${offset}`;

  useEffect(() => {
    getCharacters(query);
  }, [query]);

  console.log({ characters });

  return characters;
}

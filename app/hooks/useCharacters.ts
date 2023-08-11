import { useQuery } from "react-query";

import { MarvelApiResponse, MarvelCharacter } from "../types";

export type CharactersParams = {
  limit: number;
  offset: number;
  search: string;
};

type CharactersType = MarvelApiResponse<MarvelCharacter>;

async function fetchCharacters(query: string) {
  const response = await fetch("/api/characters", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());

  const newCharacters = response.data.data;
  return newCharacters;
}

// react-query
export function useCharacters({ limit, offset, search }: CharactersParams) {
  const query = `limit=${limit}&${
    search ? `nameStartsWith=${search}` : ""
  }&offset=${offset}`;

  const { data, isLoading, isFetching } = useQuery<CharactersType>({
    queryKey: ["characters", query],
    queryFn: () => fetchCharacters(query),
  });

  return { data, isLoading, isFetching };
}

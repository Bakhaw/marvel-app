import { useQuery } from "react-query";

import { Characters, CharactersApiResponse, World } from "@/app/types";

async function fetchCharacters(
  query: string,
  world: World
): Promise<CharactersApiResponse<Characters>> {
  const response = await fetch("/api/characters", {
    method: "POST",
    body: JSON.stringify({
      query,
      world,
    }),
  }).then((res) => res.json());

  let characters: CharactersApiResponse<Characters> = {
    data: [],
    total: 0,
  };

  switch (world) {
    case World.marvel:
      characters = {
        data: response.data.data.results,
        total: response.data.data.total,
      };
      break;

    case World.harry_potter:
      characters = {
        data: response.data,
        total: response.data.length,
      };

    default:
      break;
  }

  return characters;
}

const methods = (query: string) => ({
  [World.marvel]: fetchCharacters(query, World.marvel),
  [World.harry_potter]: fetchCharacters(query, World.harry_potter),
});

const getMethod = async (query: string, world: World) =>
  await methods(query)[world];

export type CharactersParams = {
  limit: number;
  offset: number;
  search: string;
  world: World;
};

// react-query
export function useCharacters({
  limit,
  offset,
  search,
  world,
}: CharactersParams) {
  const query = `limit=${limit}&${
    search ? `nameStartsWith=${search}` : ""
  }&offset=${offset}`;

  const { data, isFetching } = useQuery<CharactersApiResponse<Characters>>({
    queryKey: ["characters", query],
    queryFn: () => getMethod(query, world),
  });

  return { data, isFetching };
}

import { useQuery } from "react-query";

import { Characters, CharactersApiResponse, World } from "@/app/types";

async function fetchCharacters(
  query: string,
  world: World,
  offset?: number,
  limit?: number
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
        data: response.data?.data?.results,
        total: response.data?.data?.total,
      };
      break;

    case World.harry_potter:
      characters = {
        data: response.data.splice(offset, limit),
        total: response.data.length,
      };
      break;

    case World.naruto:
      characters = {
        data: response.data.characters,
        total: response.data.totalCharacters,
      };
      break;

    default:
      break;
  }

  return characters;
}

const methods = (query: string, offset?: number, limit?: number) => ({
  [World.marvel]: fetchCharacters(query, World.marvel),
  [World.harry_potter]: fetchCharacters(
    query,
    World.harry_potter,
    offset,
    limit
  ),
  [World.naruto]: fetchCharacters(query, World.naruto),
});

const getMethod = async (
  query: string,
  world: World,
  offset?: number,
  limit?: number
) => await methods(query, offset, limit)[world];

export type CharactersParams = {
  limit: number;
  offset: number;
  search: string;
  world: World;
  page: number;
};

const queryObj = ({ limit, offset, search, page }: CharactersParams) => ({
  [World.marvel]: `limit=${limit}&offset=${offset}${
    search ? `&nameStartsWith=${search}` : ""
  }`,
  [World.harry_potter]: `limit=${limit}&offset=${offset}`,
  [World.naruto]: `limit=${limit}&page=${page}`,
});

const getQueryObj = (params: CharactersParams, world: World) =>
  queryObj(params)[world];

// react-query
export function useCharacters({
  limit,
  offset,
  search,
  world,
  page,
}: CharactersParams) {
  const params = {
    limit,
    offset,
    search,
    world,
    page,
  };

  const query = getQueryObj(params, world);

  const { data, isFetching } = useQuery<CharactersApiResponse<Characters>>({
    queryKey: ["characters", query],
    queryFn: () => getMethod(query, world, offset, limit),
  });

  return { data, isFetching };
}

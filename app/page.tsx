"use client";

import { FormEvent, useRef } from "react";
import { Skeleton } from "antd";

import { CharactersParams, useCharacters } from "./hooks/useCharacters";
import { useQueryParams } from "./hooks/useQueryParams";
import { formatCharactersToUsers } from "./lib";
import { Characters, CharactersApiResponse, QueryParams, World } from "./types";

import Pagination from "./components/Pagination";
import ProfileCardList from "./components/ProfileCardList";
import TotalResults from "./components/TotalResults";

function Home() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { page = 0, search } = queryParams;
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchLimit = 10;
  const offset = Number(page) * fetchLimit;
  // const world = World.marvel; // todo get this from query params
  const world = World.harry_potter; // todo get this from query params

  const params: CharactersParams = {
    limit: fetchLimit,
    offset: offset > 0 ? offset - fetchLimit : 0,
    search: search ? search : "",
    world,
  };

  const { data, isFetching } = useCharacters(params);

  const formattedCharactersObj = (
    characters: CharactersApiResponse<Characters>
  ) => ({
    [World.marvel]: formatCharactersToUsers(characters.data),
    [World.harry_potter]: formatCharactersToUsers(characters.data),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      page: 0,
      search: inputRef.current?.value,
    });
  }

  if (!data) return null;

  const formattedCharacters = formattedCharactersObj(data)[world];

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <form onSubmit={onSubmit}>
          <input
            defaultValue={queryParams.search}
            disabled={isFetching}
            placeholder="Search"
            ref={inputRef}
            className="max-sm:w-full py-2 px-4 bg-purple-200 disabled:bg-purple-200/30 rounded-full"
          />
        </form>

        {!isFetching && (
          <TotalResults query={queryParams.search} total={data.total} />
        )}
      </div>

      {isFetching ? (
        <ul className="flex-1 h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          {[...Array(fetchLimit)].map((d, i) => (
            <Skeleton
              key={i}
              active={isFetching}
              loading={isFetching}
              avatar
              className="h-[320px] min-w-[300px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
            />
          ))}
        </ul>
      ) : (
        <ul className="flex-1 h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          <ProfileCardList users={formattedCharacters} />
        </ul>
      )}

      <div className="flex justify-center items-center h-16">
        {data && <Pagination perPage={fetchLimit} total={data.total} />}
      </div>
    </div>
  );
}

export default Home;

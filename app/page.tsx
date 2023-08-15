"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";
import { Skeleton } from "antd";

import { useQueryParams } from "./hooks/useQueryParams";
import { CharactersParams, useCharacters } from "./hooks/useCharacters";
import { formatMarvelCharacterToUser, formatProfileCard } from "./lib";
import { QueryParams, User } from "./types";

import Pagination from "./components/Pagination";
import ProfileCard from "./components/ProfileCard";
import TotalResults from "./components/TotalResults";
import ProfileCardList from "./components/ProfileCardList";

function Home() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { page = 0, search } = queryParams;
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchLimit = 10;
  const offset = Number(page) * fetchLimit;

  const params: CharactersParams = {
    limit: fetchLimit,
    offset: offset > 0 ? offset - fetchLimit : 0,
    search: search ? search : "",
  };

  const { data, isFetching } = useCharacters(params);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      page: 0,
      search: inputRef.current?.value,
    });
  }

  const formattedCharacters: User[] | undefined = data?.results?.map(
    (character) => formatMarvelCharacterToUser(character)
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <form onSubmit={onSubmit}>
          <input
            defaultValue={queryParams.search}
            placeholder="Search"
            ref={inputRef}
            className="max-sm:w-full py-2 px-4 bg-purple-200 rounded-full"
          />
        </form>

        {!isFetching && (
          <TotalResults query={queryParams.search} total={data?.total} />
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

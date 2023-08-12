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

function Home() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { page = 0, search } = queryParams;
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchLimit = 20;
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
      <form onSubmit={onSubmit}>
        <input
          defaultValue={queryParams.search}
          placeholder="Search Hulk for example"
          ref={inputRef}
          className="max-sm:w-full py-2 px-4 rounded-full bg-purple-200"
        />
      </form>

      {isFetching ? (
        <div className="h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          {[...Array(fetchLimit)].map((d, i) => (
            <Skeleton
              key={i}
              active={isFetching}
              loading={isFetching}
              avatar
              className="h-[320px] min-w-[320px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
            />
          ))}
        </div>
      ) : (
        <>
          <ul className="h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
            {formattedCharacters?.map((user, i) => (
              <Link key={i} href={`/user/${user.id}`}>
                <li>
                  <ProfileCard {...formatProfileCard(user)} />
                </li>
              </Link>
            ))}
          </ul>
        </>
      )}

      <div className="flex justify-center items-center h-16">
        {data && <Pagination perPage={fetchLimit} total={data.total} />}
      </div>
    </div>
  );
}

export default Home;

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
    <div className="flex flex-col  min-h-screen p-6 md:p-24">
      <form className="mb-10 md:self-start px-6" onSubmit={onSubmit}>
        <input
          defaultValue={queryParams.search}
          placeholder="Search hulk for example"
          ref={inputRef}
          className="py-2 px-4 rounded-full bg-purple-200"
        />
      </form>

      {isFetching ? (
        <div className="h-full w-full grid grid-cols-fill place-items-center gap-x-6 gap-y-16">
          {[...Array(fetchLimit)].map((d, i) => (
            <Skeleton
              key={i}
              active={isFetching}
              loading={isFetching}
              avatar
              className="h-[320px] w-[360px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20"
            />
          ))}
        </div>
      ) : (
        <>
          <ul className="h-full w-full grid grid-cols-fill place-items-center gap-x-6 gap-y-16">
            {formattedCharacters?.map((user, i) => (
              <Link key={i} href={`/user/${user.id}`}>
                <li>
                  <ProfileCard {...formatProfileCard(user)} />
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex justify-center items-center mt-12">
            <Pagination perPage={fetchLimit} total={data?.total ?? 0} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

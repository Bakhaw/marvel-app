"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Link from "next/link";

import { useQueryParams } from "./hooks/useQueryParams";
import { CharactersParams, useCharacters } from "./hooks/useCharacters";
import { formatMarvelCharacterToUser, formatProfileCard } from "./lib";
import { QueryParams, User } from "./types";

import ProfileCard from "./components/ProfileCard";
import Pagination from "./components/Pagination";

function Home() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { page = 0, search } = queryParams;
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchLimit = 20;
  const offset = Number(page) * fetchLimit;

  const params: CharactersParams = {
    limit: fetchLimit,
    offset: offset > 0 ? offset - fetchLimit : 0,
    search: search ? `nameStartsWith=${search}` : "",
  };

  const { results, total } = useCharacters(params);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      page: 0,
      search: inputRef.current?.value,
    });
  }

  const formattedCharacters: User[] = results?.map((character) =>
    formatMarvelCharacterToUser(character)
  );

  if (formattedCharacters?.length === 0)
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-6 text-white">
        Loading...
      </div>
    );

  // TODO refacto les if qui check les page etc.
  // TODO encapsulate getNextCharacters in two different funcs to fetch prev or next and do the necessary checks before

  // TODO 2 move code to pagination component

  console.log("characters", results);

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
        <Pagination total={total} />
      </div>
    </div>
  );
}

export default Home;

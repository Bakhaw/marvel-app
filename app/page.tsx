"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";

import { useQueryParams } from "./hooks/useQueryParams";
import { useCharacters } from "./hooks/useCharacters";
import { formatMarvelCharacterToUser, formatProfileCard } from "./lib";
import { QueryParams, User } from "./types";

import ProfileCard from "./components/ProfileCard";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const query = inputRef.current?.value
    ? `nameStartsWith=${inputRef.current.value}`
    : "";

  const characters = useCharacters(query);
  const formattedCharacters: User[] | undefined = characters?.map((character) =>
    formatMarvelCharacterToUser(character)
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      search: inputRef.current?.value,
    });
  }

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
    </div>
  );
}

export default Home;

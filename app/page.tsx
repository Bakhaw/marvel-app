"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

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

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const fetchLimit = 20;
  const lastPage = Math.round(total / fetchLimit);

  async function getNextCharacters(newPage: number) {
    if (newPage < 1) return;
    setPage(newPage);
  }

  const formattedCharacters: User[] | undefined = characters?.map((character) =>
    formatMarvelCharacterToUser(character)
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      search: inputRef.current?.value,
    });
  }

  if (formattedCharacters?.length === 0)
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );

  // TODO refacto les if qui check les page etc.
  // TODO encapsulate getNextCharacters in two different funcs to fetch prev or next and do the necessary checks before

  // TODO 2 move code to pagination component

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

      {total > 0 && (
        <div className="w-full flex justify-center items-center gap-12 text-gray-100 mt-12 transition-all ">
          <button
            className="hover:scale-[1.05] disabled:text-gray-600"
            disabled={page === 1}
            onClick={() => {
              if (page - 1 < 1) return;
              getNextCharacters(page - 1);
            }}
          >
            <MoveLeft size={24} />
          </button>

          <div className="flex gap-4">
            {page - 1 > 0 && (
              <button
                className="text-gray-600 hover:text-white"
                onClick={() => {
                  if (page - 1 < 1) return;
                  getNextCharacters(page - 1);
                }}
              >
                {page - 1}
              </button>
            )}

            <div>{page}</div>

            {page !== lastPage && (
              <button
                className="text-gray-600 hover:text-white"
                onClick={() => {
                  if (page === lastPage) return;
                  getNextCharacters(page + 1);
                }}
              >
                {page + 1}
              </button>
            )}

            {page < lastPage - 3 && (
              <>
                <div>...</div>
                <button
                  className="text-gray-600 hover:text-white"
                  onClick={() => getNextCharacters(lastPage)}
                >
                  {lastPage}
                </button>
              </>
            )}
          </div>

          <button
            className="hover:scale-[1.05] disabled:text-gray-600"
            disabled={page === lastPage}
            onClick={() => {
              if (page === lastPage) return;
              getNextCharacters(page + 1);
            }}
          >
            <MoveRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { formatMarvelCharacterToUser, formatProfileCard } from "./lib";
import { MarvelCharacter, User } from "./types";

import ProfileCard from "./components/ProfileCard";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);

  async function getCharacters() {
    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({}),
    }).then((res) => res.json());

    const newCharacters = response.data.data.results;
    setCharacters(newCharacters);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  const formattedCharacters: User[] = characters.map((character) =>
    formatMarvelCharacterToUser(character)
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({
        query: `nameStartsWith=${inputRef.current.value}`,
      }),
    }).then((res) => res.json());

    const newCharacters = response.data.data.results;
    setCharacters(newCharacters);
  }

  if (formattedCharacters.length === 0)
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 md:p-24">
      <form className="mb-10 md:self-start" onSubmit={onSubmit}>
        <input
          placeholder="Search hulk for example"
          ref={inputRef}
          className="py-2 px-4 rounded-full bg-purple-200"
        />
      </form>
      <ul className="h-full w-full grid grid-cols-fill place-items-center gap-x-6 gap-y-16">
        {formattedCharacters.map((user, i) => (
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

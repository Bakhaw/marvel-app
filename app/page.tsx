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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-24">
      <form className="mb-20" onSubmit={onSubmit}>
        <input placeholder="hulk" ref={inputRef} />
        <button className="border text-white ml-2">search</button>
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

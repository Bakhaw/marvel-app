"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatMarvelCharacterToUser, formatProfileCard } from "./lib";
import { MarvelCharacter, User } from "./types";

import ProfileCard from "./components/ProfileCard";

function Home() {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);

  async function getCharacters() {
    const response = await fetch("/api/characters").then((res) => res.json());
    const newCharacters = response.data.data.results;
    setCharacters(newCharacters);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  const formattedCharacters: User[] = characters.map((character) =>
    formatMarvelCharacterToUser(character)
  );

  return (
    <div className="flex justify-center items-center min-h-screen p-24">
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

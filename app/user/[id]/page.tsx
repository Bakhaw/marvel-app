"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  formatMarvelCharacterToUser,
  formatPostCard,
  formatProfileCard,
} from "@/app/lib";
import { MarvelCharacter, User } from "@/app/types";

import PostCard from "@/app/components/PostCard";
import ProfileCard from "@/app/components/ProfileCard";

function Page() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<User | null>(null);

  // async function chat() {
  //   const response = await fetch("/api/chat", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       prompt:
  //         "Écris un tweet comme si tu étais Hulk. Un truc fun et en français stp.",
  //     }),
  //   });

  //   const data = await response.json();

  //   return data;
  // }

  async function getCharacter() {
    const response = await fetch(`/api/characters/${userId}`, {
      method: "POST",
      body: JSON.stringify({ characterId: userId }),
    });
    const data = await response.json();

    const character: MarvelCharacter = data.data.data.results[0];
    const characterToUser = formatMarvelCharacterToUser(character);

    setUser(characterToUser);
  }

  useEffect(() => {
    getCharacter();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="mb-16">
        <ProfileCard {...formatProfileCard(user)} />
      </div>

      <ul className="space-y-6">
        {Array(32)
          .fill("")
          .map((d, i) => (
            <li key={i}>
              <PostCard {...formatPostCard(user)} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Page;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useCharacter } from "@/app/hooks/useCharacter";
import {
  chat,
  formatMarvelCharacterToUser,
  formatPostCard,
  formatProfileCard,
} from "@/app/lib";
import { MarvelCharacter, Post, User } from "@/app/types";

import ButtonBack from "@/app/components/ButtonBack";
import PostCard from "@/app/components/PostCard";
import ProfileCard from "@/app/components/ProfileCard";

function Page() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  async function getPosts(user: User) {
    // const prompt = `Écris trois tweets comme si tu étais Vegeta (Dragon Ball).
    // Un truc très fun et en français stp.
    // Fais quelques références à d'autres personnages.
    // Une fois que tu as les tweets, range les dans un tableau d'objets JavaScript avec comme clé d'objet "text".
    // Je vais me servir de ce tableau par la suite alors veille bien à ce qu'il soit bien formatté.
    // Réponds uniquement en m'envoyant le tableau bien formatté stp.`;
    // const posts = await chat(prompt);

    const mockedBio = [
      {
        text: "bio",
      },
    ];
    setPosts(mockedBio);
    // setPosts(JSON.parse(posts.data));
  }

  async function getBio(user: User) {
    // const prompt = `Écris une bio twitter comme si tu étais ${user.displayName}. Un truc très fun, 80 caractères maximum et en français stp.`;
    // const bio = await chat(prompt);
    const mockedBio = "bio";

    setUser({
      ...user,
      // bio: bio.data,
      bio: mockedBio,
    });
  }

  useEffect(() => {
    if (!user) return;

    getBio(user);
    getPosts(user);
  }, [user?.id]);

  const character = useCharacter(userId.toString());

  function initUser(character: MarvelCharacter) {
    character.description = ""; // 🥶🥶🥶

    const characterToUser = formatMarvelCharacterToUser(character);
    setUser(characterToUser);
  }

  useEffect(() => {
    if (!character) return;

    initUser(character);
  }, [character]);

  if (!user) return null;

  return (
    <div className="min-h-screen max-w-[600px] flex flex-col items-center px-2 py-12 m-auto">
      <div className="self-start mb-6">
        <ButtonBack />
      </div>

      <div className="mb-16 w-full">
        <ProfileCard {...formatProfileCard(user)} />
      </div>

      {!posts && (
        <div className="text-white text-lg">Loading funny content 👾</div>
      )}

      <ul className="space-y-6 w-full">
        {posts?.map((post, i) => (
          <li key={i}>
            <PostCard {...formatPostCard(user, post)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;

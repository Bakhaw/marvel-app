"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "antd";

import { useCharacter } from "@/app/hooks/useCharacter";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import {
  chat,
  formatCharacterToUser,
  formatPostCard,
  formatProfileCard,
  isHarryPotterCharacter,
  isMarvelCharacter,
} from "@/app/lib";
import { Character, DEFAULT_WORLD, Post, QueryParams, User } from "@/app/types";

import ButtonBack from "@/app/components/ButtonBack";
import PostCard from "@/app/components/PostCard";
import ProfileCard from "@/app/components/ProfileCard";

function Page() {
  const { id: userId } = useParams();
  const {
    queryParams: { world = DEFAULT_WORLD },
  } = useQueryParams<QueryParams>();
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

  const character = useCharacter(userId.toString(), world);

  function initUser(character: Character) {
    const isMarvel = isMarvelCharacter(character);
    const isHarryPotter = isHarryPotterCharacter(character);

    if (isMarvel) {
      character.description = ""; // 🥶🥶🥶
    }

    if (isHarryPotter) {
      character.house = "";
    }

    const user = formatCharacterToUser(character);
    setUser(user);
  }

  useEffect(() => {
    if (!character) return;

    initUser(character);
  }, [character]);

  if (!user)
    return (
      <div className="text-white text-lg min-h-screen max-w-[600px] flex flex-col items-center px-2 py-12 m-auto">
        <div className="self-start mb-6">
          <ButtonBack />
        </div>

        <div className="flex-1 h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          <Skeleton
            active
            loading
            avatar
            className="h-[320px] min-w-[300px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
          />

          <div className="flex flex-col gap-6">
            <Skeleton
              active
              loading
              paragraph={{
                rows: 1,
                style: {
                  marginTop: 16,
                },
              }}
              avatar
              className="h-[140px] min-w-[300px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
            />

            <Skeleton
              active
              loading
              avatar
              className="h-[180px] min-w-[300px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen max-w-[600px] flex flex-col items-center px-2 py-12 m-auto">
      <div className="self-start mb-6">
        <ButtonBack />
      </div>

      <div className="mb-16 w-full">
        <ProfileCard {...formatProfileCard(user)} />
      </div>

      {posts ? (
        <ul className="space-y-6 w-full">
          {posts.map((post, i) => (
            <li key={i}>
              <PostCard {...formatPostCard(user, post)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-white text-lg">Loading funny content 👾</div>
      )}
    </div>
  );
}

export default Page;

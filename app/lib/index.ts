import { MarvelCharacter, Post, User } from "../types";

import { PostCardProps } from "../components/PostCard";
import { ProfileCardProps } from "../components/ProfileCard";

export function formatProfileCard(user: User): ProfileCardProps {
  return {
    description: user.bio,
    image: user.image,
    subtitle: `@${user.username}`,
    title: user.displayName,
  };
}

export function formatPostCard(user: User, post: Post): PostCardProps {
  return {
    description: post.text,
    image: user.image,
    subtitle: `@${user.username}`,
    title: user.displayName,
  };
}

export function formatMarvelCharacterToUser(character: MarvelCharacter): User {
  return {
    bio: character.description,
    displayName: character.name,
    id: String(character.id),
    image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    username: `${character.name.toLowerCase().split(" ").join("-")}`,
  };
}

export async function chat(prompt: string) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

import {
  Character,
  Characters,
  HarryPotterCharacter,
  MarvelCharacter,
  NarutoCharacter,
  Post,
  User,
} from "../types";

import { PostCardProps } from "../components/PostCard";
import { ProfileCardProps } from "../components/ProfileCard";

// todo tout ça c'est guez
export function isMarvelCharacter(
  character: Character
): character is MarvelCharacter {
  return "description" in character;
}

export function isHarryPotterCharacter(
  character: Character
): character is HarryPotterCharacter {
  return "house" in character;
}

export function isNarutoCharacter(
  character: Character
): character is NarutoCharacter {
  return "personal" in character;
}
// todo tout ça c'est guez

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

export function formatCharactersToUsers(characters: Characters): User[] {
  let users: User[] = [];

  characters.map((character) => {
    const isMarvel = isMarvelCharacter(character);
    const isHarryPotter = isHarryPotterCharacter(character);
    const isNaruto = isNarutoCharacter(character);

    if (isMarvel) {
      users.push({
        bio: character.description,
        displayName: character.name,
        id: String(character.id),
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        username: `${character.name.toLowerCase().split(" ").join("-")}`,
      });
    }

    if (isHarryPotter) {
      users.push({
        bio: character.house,
        displayName: character.name,
        id: String(character.id),
        image: character.image,
        username: `${character.name.toLowerCase().split(" ").join("-")}`,
      });
    }

    if (isNaruto) {
      users.push({
        bio: character.personal.species,
        displayName: character.name,
        id: String(character.id),
        image: character.images[0],
        username: `${character.name.toLowerCase().split(" ").join("-")}`,
      });
    }
  });

  return users;
}

export function formatCharacterToUser(character: Character): User {
  let user: User = {
    bio: "",
    displayName: "",
    id: "",
    image: "",
    username: "",
  };

  const isMarvel = isMarvelCharacter(character);
  const isHarryPotter = isHarryPotterCharacter(character);
  const isNaruto = isNarutoCharacter(character);

  if (isMarvel) {
    user = {
      bio: character.description,
      displayName: character.name,
      id: String(character.id),
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      username: `${character.name.toLowerCase().split(" ").join("-")}`,
    };
  }

  if (isHarryPotter) {
    user = {
      bio: character.house,
      displayName: character.name,
      id: String(character.id),
      image: character.image,
      username: `${character.name.toLowerCase().split(" ").join("-")}`,
    };
  }

  if (isNaruto) {
    user = {
      bio: character.personal.species,
      displayName: character.name,
      id: String(character.id),
      image: character.images[0],
      username: `${character.name.toLowerCase().split(" ").join("-")}`,
    };
  }

  return user;
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

import { MarvelCharacter, User } from "../types";

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

export function formatPostCard(user: User): PostCardProps {
  return {
    description: user.bio,
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

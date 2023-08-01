import { User } from "../types";

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

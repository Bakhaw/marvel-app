import Link from "next/link";

import { formatProfileCard } from "@/app/lib";
import { DEFAULT_WORLD, QueryParams, User } from "@/app/types";

import ProfileCard from "../ProfileCard";
import { useQueryParams } from "@/app/hooks/useQueryParams";

interface ProfileCardListProps {
  users: User[] | null;
}

const ProfileCardList: React.FC<ProfileCardListProps> = ({ users }) => {
  const { queryParams } = useQueryParams<QueryParams>();
  const { world } = queryParams;
  const currentWorld = world ?? DEFAULT_WORLD;

  if (!users) return null;

  if (!users?.length) {
    return (
      <div className="text-xs sm:text-sm col-span-full mx-auto flex items-center justify-center w-full text-white">
        no users found
      </div>
    );
  }

  return users.map((user, i) => (
    <Link key={i} href={`/user/${user.id}/?world=${currentWorld}`}>
      <li>
        <ProfileCard {...formatProfileCard(user)} />
      </li>
    </Link>
  ));
};

export default ProfileCardList;

import Link from "next/link";

import { formatProfileCard } from "@/app/lib";
import { User } from "@/app/types";

import ProfileCard from "../ProfileCard";

interface ProfileCardListProps {
  users?: User[];
}

const ProfileCardList: React.FC<ProfileCardListProps> = ({ users }) => {
  if (!users) return null;

  if (!users?.length) {
    return (
      <div className="text-xs sm:text-sm col-span-full mx-auto flex items-center justify-center w-full text-white">
        no users found
      </div>
    );
  }

  return users.map((user, i) => (
    <Link key={i} href={`/user/${user.id}`}>
      <li>
        <ProfileCard {...formatProfileCard(user)} />
      </li>
    </Link>
  ));
};

export default ProfileCardList;

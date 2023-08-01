"use client";

import { useParams } from "next/navigation";

import { formatPostCard, formatProfileCard } from "@/app/lib";
import { users } from "@/app/mock/users";

import PostCard from "@/app/components/PostCard";
import ProfileCard from "@/app/components/ProfileCard";

function Page() {
  const { id: userId } = useParams();
  const user = users.find((user) => user.id === userId);

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

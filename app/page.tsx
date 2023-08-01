import Link from "next/link";

import { users } from "./mock/users";
import { formatProfileCard } from "./lib";

import ProfileCard from "./components/ProfileCard";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-24">
      <ul className="h-full w-full grid grid-cols-fill place-items-center gap-x-6 gap-y-16">
        {users.map((user, i) => (
          <Link key={i} href={`/user/${user.id}`}>
            <li>
              <ProfileCard {...formatProfileCard(user)} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;

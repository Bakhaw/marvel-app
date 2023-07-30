import Link from "next/link";
import ProfileCard, { ProfileCardProps } from "./components/ProfileCard";
import { User } from "./types";

const user: User = {
  bio: "This is my bio.",
  displayName: "Iron Man",
  id: "id",
  image:
    "https://playcontestofchampions.com/wp-content/uploads/2021/11/champion-iron-man-infinity-war-720x720.jpg",
  username: "ironman",
};

function Home() {
  const profileCard: ProfileCardProps = {
    description: user.bio,
    image: user.image,
    subtitle: `@${user.username}`,
    title: user.displayName,
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-2">
      <ul className="h-full w-full grid grid-cols-fill place-items-center gap-y-12 gap-x-2">
        {Array(33)
          .fill("")
          .map((d, i) => (
            <Link key={i} href={`/user/${user.id}`}>
              <li>
                <ProfileCard {...profileCard} />
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default Home;

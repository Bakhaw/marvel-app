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
    <div className="flex justify-center items-center">
      <ul className="grid grid-cols-4 gap-y-8 gap-x-24 p-6">
        {Array(15)
          .fill("")
          .map((d, i) => (
            <li key={i}>
              <ProfileCard {...profileCard} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;

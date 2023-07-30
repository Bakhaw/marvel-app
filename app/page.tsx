import Link from "next/link";
import ProfileCard, { ProfileCardProps } from "./components/ProfileCard";
import { User } from "./types";

const users: User[] = [
  {
    bio: "Génie, milliardaire, playboy, philanthrope, et Iron Man ! Sauveur du monde en armure. Avenger accompli.",
    displayName: "Iron Man",
    id: "id1",
    image:
      "https://beast-kingdom.us/media/catalog/product/cache/c324dfd36ac7044c9013641559ba49a6/e/a/eaa-105-1.jpg",
    username: "ironman",
  },
  {
    bio: "Déesse de la sagesse, stratège accomplie, combattante courageuse et protectrice d'Athènes.",
    displayName: "Athena",
    id: "id2",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Athena_in_Hercules.jpg/150px-Athena_in_Hercules.jpg",
    username: "athena_goddess",
  },
  {
    bio: "Agent secret, expert en arts martiaux, espionne redoutable, et membre des Avengers.",
    displayName: "Black Widow",
    id: "id3",
    image:
      "https://i.pinimg.com/1200x/8a/ca/6e/8aca6ec4e927dc12d8903cf6b8afc670.jpg",
    username: "natasha_avenger",
  },
  {
    bio: "Scientifique brillant, expert en gamma, transformé en créature verte puissante lorsqu'il est en colère.",
    displayName: "Hulk",
    id: "id4",
    image:
      "https://i.etsystatic.com/15020576/r/il/ae6f8a/3381261692/il_570xN.3381261692_41h2.jpg",
    username: "incredible_hulk",
  },
  {
    bio: "Roi du Wakanda, guerrier féroce, et porteur du costume de Panthère Noire.",
    displayName: "Black Panther",
    id: "id5",
    image:
      "https://actualitte.com/uploads/images/black_20panther_20comics_20premier_20dessin_20jack_20kirby-e10fabd3-af5b-48ee-be6d-d7a5e3a9b649.jpg",
    username: "king_of_wakanda",
  },
  {
    bio: "Déesse de l'amour, de la beauté et de la guerre. Membre de la Justice League.",
    displayName: "Wonder Woman",
    id: "id6",
    image:
      "https://cdn.epicstream.com/images/ncavvykf/epicstream/dc7db4801a0a166583e7d361e0784a3fb5522421-760x400.jpg?rect=0,10,760,380&w=1200&h=600&auto=format",
    username: "diana_amazon",
  },
];

function Home() {
  function formatProfileCard(user: User): ProfileCardProps {
    return {
      description: user.bio,
      image: user.image,
      subtitle: `@${user.username}`,
      title: user.displayName,
    };
  }

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

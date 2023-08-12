import Avatar from "../Avatar";
import ButtonFollow from "../ButtonFollow";

export interface ProfileCardProps {
  description: string;
  image: string;
  subtitle: string;
  title: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  description,
  image,
  subtitle,
  title,
}) => {
  return (
    <div className="h-[320px] min-w-[320px] max-w-[640px] flex flex-col p-6 rounded-[48px] bg-gray-800/25 border-[0.5px] border-fuchsia-300 transition-all hover:bg-fuchsia-300/10 hover:border-fuchsia-400 hover:scale-[1.005]">
      <div className="flex justify-between items-start mb-6">
        <Avatar src={image} />
        <ButtonFollow />
      </div>

      <div className="mb-5">
        <h2 className="max-w-[320px] truncate text-lg text-gray-400 hover:underline hover:text-gray-400/60">
          {subtitle}
        </h2>
        <h1 className="max-w-[320px] truncate text-2xl text-gray-200 hover:text-white">
          {title}
        </h1>
      </div>

      <p className="text-lg text-gray-200 max-w-[660px] line-clamp-5">
        {description}
      </p>
    </div>
  );
};

export default ProfileCard;

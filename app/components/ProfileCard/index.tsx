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
    <div className="h-[320px] flex flex-col p-6 rounded-[48px] bg-gray-800/25 border-[0.5px] border-fuchsia-300 transition-all hover:bg-fuchsia-300/10 hover:border-fuchsia-400 hover:scale-[1.005]">
      <div className="flex justify-between items-start mb-6">
        <img
          alt="User profile picture"
          className="h-20 w-20 rounded-full object-contain"
          src={image}
        />
        <button className="lowercase text-sm text-white/80 bg-fuchsia-400/60 px-4 py-[2px] rounded-3xl transition-all hover:text-white hover:bg-fuchsia-400 hover:scale-[1.02]">
          Follow
        </button>
      </div>

      <div className="mb-5">
        <div className="w-max text-lg text-gray-400 hover:underline hover:text-gray-400/60">
          {subtitle}
        </div>
        <div className="text-2xl text-gray-200 hover:text-white">{title}</div>
      </div>

      <div className="text-lg text-gray-200 max-w-[360px] line-clamp-3">
        {description}
      </div>
    </div>
  );
};

export default ProfileCard;

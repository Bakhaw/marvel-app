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
    <div className="flex flex-col items-center justify-center space-y-2 p-4 border-2 border-gray-600 w-[280px]">
      <img
        alt="User profile picture"
        className="w-28 rounded-full"
        src={image}
      />

      <div className="text-center">
        <div className="text-sm text-gray-200">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>

      <div className="text-sm text-gray-200">{description}</div>
    </div>
  );
};

export default ProfileCard;

export interface PostCardProps {
  description: string;
  image: string;
  subtitle: string;
  title: string;
}

const PostCard: React.FC<PostCardProps> = ({
  description,
  image,
  subtitle,
  title,
}) => {
  return (
    <div className="max-h-[320px] max-w-sm flex flex-col p-6 rounded-[48px] bg-gray-800/25 border-[0.5px] border-fuchsia-300 transition-all hover:bg-fuchsia-300/10 hover:border-fuchsia-400 hover:scale-[1.005]">
      <div className="flex gap-2">
        <img
          alt="User profile picture"
          src={image}
          className="h-10 w-10 rounded-full object-contain"
        />

        <div className="mb-5">
          <h2 className="max-w-[280px] truncate text-sm text-gray-400 hover:underline hover:text-gray-400/60">
            {subtitle}
          </h2>
          <h1 className="max-w-[280px] truncate text-base text-gray-200 hover:text-white">
            {title}
          </h1>
        </div>
      </div>

      <p className="text-lg text-gray-200 max-w-[360px]">{description}</p>
    </div>
  );
};

export default PostCard;

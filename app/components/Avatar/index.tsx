import Image from "next/image";

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <div className="relative h-20 w-20">
    <Image
      alt="User avatar"
      className="rounded-full object-contain"
      src={src}
      fill
    />
  </div>
);

export default Avatar;

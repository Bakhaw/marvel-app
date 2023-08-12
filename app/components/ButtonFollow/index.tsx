interface ButtonFollowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonFollow: React.FC<ButtonFollowProps> = (props) => (
  <button
    className="lowercase text-sm text-white/80 bg-fuchsia-400/60 px-4 py-[2px] rounded-3xl transition-all hover:text-white hover:bg-fuchsia-400 hover:scale-[1.02]"
    {...props}
  >
    Follow
  </button>
);

export default ButtonFollow;

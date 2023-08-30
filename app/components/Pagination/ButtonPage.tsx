interface ButtonPageProps {
  page: number | null;
}

const ButtonPage: React.FC<ButtonPageProps> = ({ page }) => {
  if (!page) return null;

  return <button>{page}</button>;
};

export default ButtonPage;

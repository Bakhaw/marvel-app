import classNames from "classnames";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { QueryParams } from "@/app/types";

interface ButtonPageProps {
  page: number | null;
}

// TODO handle isActive state
const ButtonPage: React.FC<ButtonPageProps> = ({ page }) => {
  const { queryParams } = useQueryParams<QueryParams>();

  if (!page) return null;

  const isActive = page === Number(queryParams.page);

  return (
    <button
      className={classNames("text-white text-sm", isActive && "text-red-500")}
    >
      {page}
    </button>
  );
};

export default ButtonPage;

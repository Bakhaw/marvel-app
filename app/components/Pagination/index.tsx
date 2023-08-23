import { ChangeEvent } from "react";
import { Pagination as MuiPagination, PaginationItem } from "@mui/material";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { QueryParams } from "@/app/types";

import ButtonJumpNext from "./ButtonJumpNext";
import ButtonJumpPrev from "./ButtonJumpPrev";
import ButtonNext from "./ButtonNext";
import ButtonPage from "./ButtonPage";
import ButtonPrev from "./ButtonPrev";

interface PaginationProps {
  perPage: number;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ perPage, total }) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();

  function onChange(event: ChangeEvent<unknown>, page: number) {
    setQueryParams({ page });
  }

  return (
    <MuiPagination
      count={Math.ceil(total / perPage)}
      onChange={onChange}
      page={Number(queryParams.page)}
      size="small"
      renderItem={(params) => {
        const paginationItems = {
          page: <ButtonPage page={params.page} />,
          previous: <ButtonPrev />,
          next: <ButtonNext />,
          first: <ButtonJumpPrev />,
          last: <ButtonJumpNext />,
          "start-ellipsis": null,
          "end-ellipsis": null,
        };

        return (
          <PaginationItem {...params}>
            {paginationItems[params.type]}
          </PaginationItem>
        );
      }}
    />
  );
};

export default Pagination;

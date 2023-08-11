import { Pagination as AntdPagination } from "antd";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { QueryParams } from "@/app/types";

interface PaginationProps {
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();

  const perPage = 20;
  const currentPage = Number(queryParams.page) || 1;

  function onChange(page: number) {
    setQueryParams({ page });
  }

  return (
    <AntdPagination
      defaultCurrent={0}
      defaultPageSize={perPage}
      current={currentPage}
      onChange={onChange}
      pageSize={perPage}
      total={total}
      showSizeChanger={false}
    />
  );
};

export default Pagination;

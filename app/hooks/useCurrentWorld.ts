import { DEFAULT_WORLD, QueryParams } from "../types";
import { useQueryParams } from "./useQueryParams";

function useCurrentWorld() {
  const { queryParams } = useQueryParams<QueryParams>();
  const currentWorld = queryParams.world ?? DEFAULT_WORLD;

  return currentWorld;
}

export default useCurrentWorld;

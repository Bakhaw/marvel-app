"use client";

import { FormEvent, useRef } from "react";
import { Skeleton } from "antd";

import { CharactersParams, useCharacters } from "@/app/hooks/useCharacters";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { formatCharactersToUsers } from "@/app/lib";
import { DEFAULT_WORLD, QueryParams, World } from "@/app/types";

import Pagination from "@/app/components/Pagination";
import ProfileCardList from "@/app/components/ProfileCardList";
import TotalResults from "@/app/components/TotalResults";
import Link from "next/link";

interface HomeProps {
  params: {
    world: World;
  };
}

const Home: React.FC<HomeProps> = ({ params: { world } }) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { page = 0, search } = queryParams;
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchLimit = 20;
  const offset = Number(page) * fetchLimit;

  const params: CharactersParams = {
    limit: fetchLimit,
    offset: offset > 0 ? offset - fetchLimit : 0,
    search: search ? search : "",
    world: world ?? DEFAULT_WORLD,
    page,
  };

  const { data, isFetching } = useCharacters(params);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setQueryParams({
      page: 0,
      search: inputRef.current?.value,
    });
  }

  console.log("world", world);

  const worlds = Object.values(World);
  if (!worlds.includes(world))
    return (
      <div className="h-screen flex flex-col justify-center items-center text-white">
        <h1>You passed a wrong parameter</h1>
        <h2>Which world do you want to explore ?</h2>

        <ul>
          {worlds.map((world) => (
            <li key={world}>
              <Link href={`/${world}`}>{world}</Link>
            </li>
          ))}
        </ul>
      </div>
    );

  if (!data) return null;

  const formattedCharacters = formatCharactersToUsers(data.data);

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <form onSubmit={onSubmit}>
          <input
            defaultValue={queryParams.search}
            disabled={isFetching}
            placeholder="Search"
            ref={inputRef}
            className="max-sm:w-full py-2 px-4 bg-purple-200 disabled:bg-purple-200/30 rounded-full"
          />
        </form>

        {!isFetching && (
          <TotalResults query={queryParams.search} total={data.total} />
        )}
      </div>

      {isFetching ? (
        <ul className="flex-1 h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          {[...Array(fetchLimit)].map((d, i) => (
            <Skeleton
              key={i}
              active={isFetching}
              loading={isFetching}
              avatar
              className="h-[320px] min-w-[300px] flex flex-col p-6 rounded-[48px] bg-fuchsia-300/20 border-[0.5px] border-fuchsia-300"
            />
          ))}
        </ul>
      ) : (
        <ul className="flex-1 h-full w-full grid grid-cols-fill gap-4 sm:gap-6">
          <ProfileCardList users={formattedCharacters} />
        </ul>
      )}

      <div className="flex justify-center items-center h-16">
        {data && <Pagination perPage={fetchLimit} total={data.total} />}
      </div>
    </div>
  );
};

export default Home;

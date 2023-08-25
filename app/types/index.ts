export interface User {
  bio: string;
  displayName: string;
  id: string;
  image: string;
  username: string; // @username
}

export interface HarryPotterCharacter {
  id: string;
  name: string;
  species: string;
  gender: string;
  house: string;
  image: string;
}

export interface MarvelCharacter {
  description: string;
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

export interface MarvelApiResponse<D> {
  count: number;
  limit: number;
  offset: number;
  results: D[];
  total: number;
}

export interface Post {
  text: string;
}

export interface QueryParams {
  page: number;
  search: string;
}

export enum World {
  marvel = "marvel",
  harry_potter = "harry_potter",
}

export type Character = MarvelCharacter | HarryPotterCharacter;
export type Characters = MarvelCharacter[] | HarryPotterCharacter[];
export type CharactersApiResponse<TData> = {
  total: number;
  data: TData;
};

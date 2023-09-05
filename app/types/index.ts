export interface User {
  bio: string;
  displayName: string;
  id: string;
  image: string;
  username: string; // @username
}

export interface NarutoCharacter {
  id: string;
  name: string;
  images: string[];
  jutsu: string[];
  personal: {
    species: string;
  };
  uniqueTraits: string[];
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
  world: World;
}

export enum World {
  marvel = "marvel",
  harry_potter = "harry_potter",
  naruto = "naruto",
}

export type Character =
  | MarvelCharacter
  | HarryPotterCharacter
  | NarutoCharacter;

export type Characters =
  | MarvelCharacter[]
  | HarryPotterCharacter[]
  | NarutoCharacter[];

export type CharactersApiResponse<TData> = {
  total: number;
  data: TData;
};

export const DEFAULT_WORLD = World.naruto; // todo get this from query params

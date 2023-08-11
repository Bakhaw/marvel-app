export interface User {
  bio: string;
  displayName: string;
  id: string;
  image: string;
  username: string; // @username
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

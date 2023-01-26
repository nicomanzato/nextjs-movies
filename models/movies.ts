import type { Genre } from './genres';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieWithReview extends Movie {
  reviews: MovieReview[];
  recomendation: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}
export interface MovieReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

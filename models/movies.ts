import type { MovieGenre } from './genres';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: MovieGenre[];
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

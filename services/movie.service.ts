import type { Genre } from 'models/genres';
import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import type { Show, ShowWithReview } from 'models/show';
import { http } from 'utils/http';

export const getNowPlayingMovies = async (genreList: Genre[]) => {
  return http.get(`${process.env.HOST}/api/movie/now-playing`);
};

export const getPopularMoviesAndShows = async (
  genreList: Genre[]
): Promise<(Movie | Show)[]> => {
  return http.get(`${process.env.HOST}/api/movie/popular`);
};

export const getDetailedMovie = async (
  id: number
): Promise<MovieWithReview> => {
  return http.get(`${process.env.HOST}/api/movie/${id}`);
};

export const getDetailedShow = async (id: number): Promise<ShowWithReview> => {
  return http.get(`${process.env.HOST}/api/show/${id}`);
};

export const getFavorites = async (
  ids: number[]
): Promise<MovieWithReview[]> => {
  const fetchPromises = ids.map((id) => http.get(`/api/movie/${id}`));
  const result = await Promise.all(fetchPromises);
  console.log(result);
  return result as MovieWithReview[];
};

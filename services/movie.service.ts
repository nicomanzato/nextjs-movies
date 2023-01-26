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
  movieOrShow: { id: number; type: 'movie' | 'show' }[]
): Promise<MovieWithReview[]> => {
  const fetchFavoriteMoviePromises = movieOrShow
    .filter((id) => id.type === 'movie')
    .map((id) => http.get(`/api/movie/${id.id}`));

  const fetchFavoriteShowsPromises = movieOrShow
    .filter((id) => id.type === 'show')
    .map((id) => http.get(`/api/show/${id.id}`));

  const result = await Promise.all([
    ...fetchFavoriteMoviePromises,
    ...fetchFavoriteShowsPromises,
  ]);

  return result as MovieWithReview[];
};

export const getMoviesByKeyword = (keyword: string): Promise<Movie[]> => {
  return http.get(`/api/movie/search`, {
    body: JSON.stringify({ keyword }),
    method: 'POST',
  });
};

import type { MovieGenre } from 'models/genres';
import type { Movie, MovieReview } from 'models/movies';
import type { Show } from 'models/show';
import { http } from 'utils/http';

export const getNowPlayingMovies = async (genreList: MovieGenre[]) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const parsedResponse: Movie[] = (await response.json()).results;

  return parsedResponse.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map(
      (genreId) => genreList.find((genre) => genre.id === genreId) as MovieGenre
    ),
  }));
};

export const getPopularMoviesAndShows = async (
  genreList: MovieGenre[]
): Promise<(Movie | Show)[]> => {
  const popularMovies = (
    await http.get<{ results: Movie[] }>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    )
  ).results;

  const popularShows = (
    await http.get<{ results: Show[] }>(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    )
  ).results;

  return [
    ...popularShows.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (genreId) =>
          (genreList.find((genre) => genre.id === genreId) || {}) as MovieGenre
      ),
    })),

    ...popularMovies.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (genreId) =>
          (genreList.find((genre) => genre.id === genreId) || {}) as MovieGenre
      ),
    })),
  ];
};

export const getDetailedMovie = async (id: number) => {
  const moviePromise = http.get<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );

  const reviewPromise = http.get<{ results: MovieReview[] }>(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const [movie, reviews] = await Promise.all([moviePromise, reviewPromise]);

  return { movie, reviews: reviews.results };
};

export const getDetailedShow = async (id: number) => {
  const moviePromise = http.get<Movie>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );

  const reviewPromise = http.get<{ results: MovieReview[] }>(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const [movie, reviews] = await Promise.all([moviePromise, reviewPromise]);

  return { movie, reviews: reviews.results };
};

export const getFavorites = async (
  ids: number[]
): Promise<(Movie | Show)[]> => {
  const fetchPromises = ids.map((id) => http.get(`/api/movie/${id}`));
  return Promise.all(fetchPromises) as unknown as (Movie | Show)[];
};

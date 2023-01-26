import type { Genre } from 'models/genres';
import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import type { Show, ShowWithReview } from 'models/show';
import { http } from 'utils/http';

export const getNowPlayingMovies = async (genreList: Genre[]) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const parsedResponse: Movie[] = (await response.json()).results;

  return parsedResponse.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map(
      (genreId) => genreList.find((genre) => genre.id === genreId) as Genre
    ),
  }));
};

export const getPopularMoviesAndShows = async (
  genreList: Genre[]
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
    ...popularShows.map((show) => ({
      ...show,
      genres: show.genre_ids.map(
        (genreId) =>
          (genreList.find((genre) => genre.id === genreId) || {}) as Genre
      ),
    })),

    ...popularMovies.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (genreId) =>
          (genreList.find((genre) => genre.id === genreId) || {}) as Genre
      ),
    })),
  ].sort((aMovieOrShow, otherMovieOrShow) =>
    aMovieOrShow.popularity < otherMovieOrShow.popularity ? 1 : -1
  );
};

export const getDetailedMovie = async (
  id: number
): Promise<MovieWithReview> => {
  const moviePromise = http.get<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );

  const reviewPromise = http.get<{ results: MovieReview[] }>(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const [movie, reviews] = await Promise.all([moviePromise, reviewPromise]);

  return { ...movie, reviews: reviews.results };
};

export const getDetailedShow = async (id: number): Promise<ShowWithReview> => {
  const showPromise = http.get<Show>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );

  const reviewPromise = http.get<{ results: MovieReview[] }>(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
  );

  const [show, reviews] = await Promise.all([showPromise, reviewPromise]);

  return { ...show, reviews: reviews.results };
};

export const getFavorites = async (
  ids: number[]
): Promise<MovieWithReview[]> => {
  const fetchPromises = ids.map((id) => http.get(`/api/movie/${id}`));
  const result = await Promise.all(fetchPromises);
  console.log(result);
  return result as MovieWithReview[];
};

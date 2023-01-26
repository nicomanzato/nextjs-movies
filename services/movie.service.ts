import type { MovieGenre } from 'models/genres';
import type { Movie, MovieReview } from 'models/movies';
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

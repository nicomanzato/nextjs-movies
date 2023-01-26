import type { MovieGenre } from 'models/genres';
import type { Movie } from 'models/movies';

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
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );
  const parsedResponse = await response.json();

  return parsedResponse;
};

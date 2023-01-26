import { genresMock } from 'mock/genres';
import type { Genre } from 'models/genres';
import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import type { NextApiRequest, NextApiResponse } from 'next';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<(Movie | Show)[]>
) {
  const { method } = req;

  if (method === 'GET') {
    const key = `movie/popular`;

    const cachedMovie = await redis.get(key);

    const genreList = genresMock;

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

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

    const sortedPopularMovies = [
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

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(
      key,
      JSON.stringify(sortedPopularMovies),
      EXPIRY_MS,
      MAX_AGE
    );

    return res.status(200).json(sortedPopularMovies);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

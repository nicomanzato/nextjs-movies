import { genresMock } from 'mock/genres';
import { Genre } from 'models/genres';
import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import { Show } from 'models/show';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getGenres } from 'services/genre.service';
import { getDetailedMovie } from 'services/movie.service';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<(Movie | Show)[]>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  if (method === 'GET') {
    const key = `movie/now-playing`;

    const cachedMovie = await redis.get(key);

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const genreList = await getGenres();

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    );

    const parsedResponse: Movie[] = (await response.json()).results;

    const sortedNowPLayingMovies = parsedResponse.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (genreId) => genreList.find((genre) => genre.id === genreId) as Genre
      ),
    }));

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(
      key,
      JSON.stringify(sortedNowPLayingMovies),
      EXPIRY_MS,
      MAX_AGE
    );

    return res.status(200).json(sortedNowPLayingMovies);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

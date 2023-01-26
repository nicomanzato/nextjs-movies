import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import type { NextApiRequest, NextApiResponse } from 'next';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<(Movie | Show)[]>
) {
  const { body } = req;

  const { keyword } = body;

  const key = `movie/search/${keyword}`;

  const cachedMovie = await redis.get(key);

  if (cachedMovie) {
    return res.status(200).json(JSON.parse(cachedMovie));
  }

  const movies = (
    await http.get<{ results: Movie[] }>(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${keyword}`
    )
  ).results;

  const MAX_AGE = 60_000 * 60;
  const EXPIRY_MS = `PX`;

  await redis.set(key, JSON.stringify(movies), EXPIRY_MS, MAX_AGE);

  return res.status(200).json(movies);
}

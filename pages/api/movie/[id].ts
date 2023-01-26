import type { MovieWithReview } from 'models/movies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDetailedMovie } from 'services/movie.service';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<MovieWithReview>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  if (method === 'GET') {
    const key = `movie/${id}`;

    const cachedMovie = await redis.get(key);

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const movie = await getDetailedMovie(id);

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(key, JSON.stringify(movie), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(movie);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

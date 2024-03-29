import type { Genre } from 'models/genres';
import type { NextApiRequest, NextApiResponse } from 'next';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Genre[]>
) {
  const { method } = req;

  if (method === 'GET') {
    const key = `genres`;

    const cachedMovie = await redis.get(key);

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const { genres } = await http.get<{ genres: Genre[] }>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
    );

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(key, JSON.stringify(genres), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(genres);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

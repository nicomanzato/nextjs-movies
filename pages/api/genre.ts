import { genresMock } from 'mock/genres';
import { Genre } from 'models/genres';
import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import { Show } from 'models/show';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDetailedMovie } from 'services/movie.service';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Genre[]>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  if (method === 'GET') {
    const key = `genres`;

    const cachedMovie = await redis.get(key);

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const genres = (
      await http.get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
      )
    ).genres;

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(key, JSON.stringify(genres), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(genres);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

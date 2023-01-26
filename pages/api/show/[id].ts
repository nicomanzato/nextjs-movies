import { MovieReview } from 'models/movies';
import { Show, ShowWithReview } from 'models/show';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDetailedShow } from 'services/movie.service';
import { http } from 'utils/http';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<ShowWithReview>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  if (method === 'GET') {
    const key = `show/${id}`;

    const cachedMovie = await redis.get(key);

    if (cachedMovie) {
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const showPromise = http.get<Show>(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
    );

    const reviewPromise = http.get<{ results: MovieReview[] }>(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    );

    const [show, reviews] = await Promise.all([showPromise, reviewPromise]);

    const showWithReview = { ...show, reviews: reviews.results };

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    await redis.set(key, JSON.stringify(showWithReview), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(showWithReview);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { http } from 'utils/http';
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
      // return res.status(200).json(JSON.parse(cachedMovie));
    }

    const moviePromise = http.get<Movie>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
    );

    const reviewPromise = http.get<{ results: MovieReview[] }>(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    );

    const [movie, reviews] = await Promise.all([moviePromise, reviewPromise]);

    const { recomendation } = await http.get<{ recomendation: string }>(
      `${process.env.HOST}/api/movie/recomendation/${id}`,
      {
        body: JSON.stringify({ name: movie.title }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(recomendation);

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    const movieWithReview: MovieWithReview = {
      ...movie,
      reviews: reviews.results,
      recomendation,
    };

    await redis.set(key, JSON.stringify(movieWithReview), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(movieWithReview);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

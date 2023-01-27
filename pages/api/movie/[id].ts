import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
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
      return res.status(200).json(JSON.parse(cachedMovie));
    }

    const moviePromise = http.get<Movie>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
    );

    const reviewPromise = http.get<{ results: MovieReview[] }>(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US&page=1`
    );

    const [movie, reviews] = await Promise.all([moviePromise, reviewPromise]);

    let generatedRecomendation = 'No recomendation available';

    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Why should I watch ${movie.title}?`,
        temperature: 1,
        max_tokens: 4000,
      });

      generatedRecomendation =
        response.data.choices[0].text?.replaceAll('\n', '') ??
        'No recomendation available';
    } catch (error) {
      console.log(error);
    }

    const MAX_AGE = 60_000 * 60;
    const EXPIRY_MS = `PX`;

    const movieWithReview: MovieWithReview = {
      ...movie,
      reviews: reviews.results,
      recomendation: generatedRecomendation,
    };

    await redis.set(key, JSON.stringify(movieWithReview), EXPIRY_MS, MAX_AGE);

    return res.status(200).json(movieWithReview);
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

import type { Movie } from 'models/movies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDetailedMovie } from 'services/movie.service';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Movie>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);

  if (method === 'GET') {
    const movie = await getDetailedMovie(id);
    res.status(200).json(movie.movie);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

import type { MovieGenre } from 'models/genres';

export const getGenres = async (): Promise<MovieGenre[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXTJS_TMDB_API_KEY}&language=en-US`
  );
  const parsedResponse = (await response.json()).genres;
  return parsedResponse;
};

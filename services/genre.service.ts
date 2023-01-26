import type { Genre } from 'models/genres';
import { http } from 'utils/http';

export const getGenres = async (): Promise<Genre[]> => {
  return http.get(`${process.env.HOST}/api/genre`);
};

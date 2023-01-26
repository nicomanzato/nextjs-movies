import MovieTemplate from 'components/templates/movie/movie.component';
import type { Movie } from 'models/movies';
import { getDetailedMovie } from 'services/movie.service';

interface Props {
  movie: Movie;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  // const genres = await getGenres();
  const movie = await getDetailedMovie(params.id);

  return {
    props: {
      movie,
    },
  };
}

const MovieDetail = ({ movie }: Props) => {
  return <MovieTemplate movie={movie} />;
};

export default MovieDetail;

import MovieTemplate from 'components/templates/movie/movie.component';
import type { Movie, MovieReview, MovieWithReview } from 'models/movies';
import { getDetailedMovie } from 'services/movie.service';

interface Props {
  movie: MovieWithReview;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
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

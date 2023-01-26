import MovieTemplate from 'components/templates/movie/movie.component';
import type { Movie, MovieReview } from 'models/movies';
import { getDetailedMovie } from 'services/movie.service';

interface Props {
  movie: Movie;
  reviews: MovieReview[];
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const { movie, reviews } = await getDetailedMovie(params.id);

  return {
    props: {
      movie,
      reviews,
    },
  };
}

const MovieDetail = ({ movie, reviews }: Props) => {
  return <MovieTemplate movie={movie} reviews={reviews} />;
};

export default MovieDetail;

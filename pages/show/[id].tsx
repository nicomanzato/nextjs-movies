import MovieTemplate from 'components/templates/movie/movie.component';
import type { Movie, MovieReview } from 'models/movies';
import { getDetailedShow } from 'services/movie.service';

interface Props {
  movie: Movie;
  reviews: MovieReview[];
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const { movie, reviews } = await getDetailedShow(params.id);

  return {
    props: {
      movie,
      reviews,
    },
  };
}

const ShowDetail = ({ movie, reviews }: Props) => {
  return <MovieTemplate movie={movie} reviews={reviews} />;
};

export default ShowDetail;

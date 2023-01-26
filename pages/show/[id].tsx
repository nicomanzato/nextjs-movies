import MovieTemplate from 'components/templates/movie/movie.component';
import ShowTemplate from 'components/templates/show/show.component';
import type { Movie, MovieReview } from 'models/movies';
import { ShowWithReview } from 'models/show';
import { getDetailedShow } from 'services/movie.service';

interface Props {
  show: ShowWithReview;
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const show = await getDetailedShow(params.id);

  return {
    props: {
      show,
    },
  };
}

const ShowDetail = ({ show }: Props) => {
  return <ShowTemplate show={show} />;
};

export default ShowDetail;

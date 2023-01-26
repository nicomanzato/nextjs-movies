import HomeTemplate from 'components/templates/index/index.component';
import type { Movie } from 'models/movies';
import { getGenres } from 'services/genre.service';
import { getNowPlayingMovies } from 'services/movie.service';

interface Props {
  nowPlayingMovies: Movie[];
}

export async function getServerSideProps() {
  const genres = await getGenres();

  const nowPlayingMovies = await getNowPlayingMovies(genres);

  return {
    props: {
      nowPlayingMovies,
    },
  };
}

const Home = ({ nowPlayingMovies }: Props) => {
  return <HomeTemplate nowPlayingMovies={nowPlayingMovies} />;
};

export default Home;

import HomeTemplate from 'components/templates/index/index.component';
import { moviesMock } from 'mock/movies';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <HomeTemplate nowPlayingMovies={moviesMock} />;
};

export default Home;

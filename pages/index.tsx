import HomeTemplate from 'components/templates/index/index.component';
import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import { useEffect, useState } from 'react';
import { getGenres } from 'services/genre.service';
import {
  getFavorites,
  getNowPlayingMovies,
  getPopularMoviesAndShows,
} from 'services/movie.service';
import { useLocalStorage } from 'usehooks-ts';

interface Props {
  nowPlayingMovies: Movie[];
  popularMovies: Movie[];
}

export async function getServerSideProps() {
  const genres = await getGenres();

  const nowPlayingMovies = await getNowPlayingMovies(genres);
  const popularMovies = await getPopularMoviesAndShows(genres);

  return {
    props: {
      nowPlayingMovies,
      popularMovies,
    },
  };
}

const Home = ({ nowPlayingMovies, popularMovies }: Props) => {
  const [favoriteMovies, setFavoriteMovies] = useState<(Movie | Show)[]>([]);
  const [movieOrshow] = useLocalStorage<
    { id: number; type: 'movie' | 'show' }[]
  >('favorite', []);

  useEffect(() => {
    getFavorites(movieOrshow).then((movie) => {
      setFavoriteMovies(movie);
    });
  }, []);

  return (
    <HomeTemplate
      nowPlayingMovies={nowPlayingMovies}
      popularMovies={popularMovies}
      favoriteMovies={favoriteMovies}
    />
  );
};

export default Home;

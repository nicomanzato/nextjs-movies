import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { SliderMovieCard } from 'components/atoms/SliderMovieCard/SliderMovieCard.component';
import { MovieSlider } from 'components/molecules/MovieSlider/MovieSlider.component';
import type { Movie } from 'models/movies';

import { Container, Title } from './index.styles';
import { MovieSearcher } from './MovieSearcher/MovieSearcher.component';

interface Props {
  nowPlayingMovies: Movie[];
}

const HomeTemplate = ({ nowPlayingMovies }: Props) => {
  return (
    <PageLayout>
      <Container>
        <MovieSearcher />
        <Title>Now in theaters</Title>
        <MovieSlider
          centered
          Component={SliderMovieCard}
          movies={nowPlayingMovies}
        ></MovieSlider>
      </Container>
    </PageLayout>
  );
};

export default HomeTemplate;

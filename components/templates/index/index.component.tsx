import { HorizontalSliderMovieCard } from 'components/atoms/HorizontalSliderMovieCard/HorizontalSliderMovieCard.component';
import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { SliderMovieCard } from 'components/atoms/SliderMovieCard/SliderMovieCard.component';
import { MovieSlider } from 'components/molecules/MovieSlider/MovieSlider.component';
import type { Movie } from 'models/movies';
import type { Show } from 'models/show';

import { Container, Section, SliderContainer, Title } from './index.styles';
import { MovieSearcher } from './MovieSearcher/MovieSearcher.component';

interface Props {
  nowPlayingMovies: Movie[];
  popularMovies: (Movie | Show)[];
  favoriteMovies: (Movie | Show)[];
}

const HomeTemplate = ({
  nowPlayingMovies,
  popularMovies,
  favoriteMovies,
}: Props) => {
  return (
    <PageLayout>
      <Container>
        <MovieSearcher />
        <Section>
          <Title>Now in theaters</Title>
        </Section>
        <SliderContainer>
          <MovieSlider
            centered
            Component={SliderMovieCard}
            movies={nowPlayingMovies}
          ></MovieSlider>
        </SliderContainer>
        <Section>
          <Title>Popular movies and shows</Title>
          <SliderContainer>
            <MovieSlider
              centered={false}
              Component={HorizontalSliderMovieCard}
              movies={popularMovies}
            ></MovieSlider>
          </SliderContainer>
        </Section>
        {favoriteMovies.length > 0 && (
          <Section>
            <Title>Rewatch your favorite movies and shows</Title>
            <SliderContainer>
              <MovieSlider
                centered={false}
                loop={false}
                Component={HorizontalSliderMovieCard}
                movies={favoriteMovies}
              ></MovieSlider>
            </SliderContainer>
          </Section>
        )}
      </Container>
    </PageLayout>
  );
};

export default HomeTemplate;

import { HorizontalSliderMovieCard } from 'components/atoms/HorizontalSliderMovieCard/HorizontalSliderMovieCard.component';
import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { SliderMovieCard } from 'components/atoms/SliderMovieCard/SliderMovieCard.component';
import { ToogleGroupItem } from 'components/atoms/ToggleGroup/ToogleGroupItem/ToogleGroupItem.component';
import { ToogleGroupRoot } from 'components/atoms/ToggleGroup/ToogleGroupRoot/ToogleGroupRoot.component';
import { MovieSlider } from 'components/molecules/MovieSlider/MovieSlider.component';
import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import { useMemo, useState } from 'react';

import {
  Container,
  Section,
  SliderContainer,
  Title,
  ToogleGroupContainer,
} from './index.styles';
import { MovieSearcher } from './MovieSearcher/MovieSearcher.component';

interface Props {
  nowPlayingMovies: Movie[];
  popularMoviesOrShow: (Movie | Show)[];
  favoriteMovies: (Movie | Show)[];
}

type Filter = 'all' | 'movie' | 'show';

const HomeTemplate = ({
  nowPlayingMovies,
  popularMoviesOrShow,
  favoriteMovies,
}: Props) => {
  const [filter, setFilter] = useState<Filter>('all');

  const handleFilterChange = (value: Filter) => {
    if (value) setFilter(value);
  };

  const filteredPopularMoviesOrShow = useMemo(() => {
    if (filter === 'all') return popularMoviesOrShow;

    return popularMoviesOrShow.filter((movieOrShow) => {
      if (filter === 'movie' && 'title' in movieOrShow) return true;
      if (filter === 'show' && 'name' in movieOrShow) return true;

      return false;
    });
  }, [filter]);

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
          <ToogleGroupContainer>
            <ToogleGroupRoot
              type="single"
              defaultValue={'all'}
              value={filter}
              onValueChange={handleFilterChange}
            >
              <ToogleGroupItem value="all">All</ToogleGroupItem>
              <ToogleGroupItem value="movie">Movies</ToogleGroupItem>
              <ToogleGroupItem value="show">Shows</ToogleGroupItem>
            </ToogleGroupRoot>
          </ToogleGroupContainer>
          <SliderContainer>
            <MovieSlider
              centered={false}
              Component={HorizontalSliderMovieCard}
              movies={filteredPopularMoviesOrShow}
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

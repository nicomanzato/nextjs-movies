import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import type { Movie } from 'models/movies';
import Image from 'next/image';

import {
  BackdropContainer,
  Container,
  DetailsContainer,
  Overview,
  PosterContainer,
  Subtitle,
  Title,
} from './movie.styles';

interface Props {
  movie: Movie;
}

const MovieTemplate = ({ movie }: Props) => {
  return (
    <PageLayout>
      <Container>
        <BackdropContainer>
          <Image
            alt={''}
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
          />
        </BackdropContainer>
        <PosterContainer>
          <Image
            alt={''}
            src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          />
        </PosterContainer>
        <DetailsContainer>
          <Title>{movie.title}</Title>
          <Subtitle>Overview</Subtitle>
          <Overview>{movie.overview}</Overview>
        </DetailsContainer>
      </Container>
    </PageLayout>
  );
};

export default MovieTemplate;

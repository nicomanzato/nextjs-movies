import { Genre } from 'components/atoms/Genre/Genre.component';
import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { StatIndicator } from 'components/StatIndicator/StatIndicator.component';
import type { Movie, MovieReview } from 'models/movies';
import Image from 'next/image';

import {
  BackdropContainer,
  BackdropGradient,
  Container,
  DetailsContainer,
  GenreContainer,
  HeaderDetails,
  Overview,
  PosterContainer,
  Subtitle,
  Title,
} from './movie.styles';

interface Props {
  movie: Movie;
  reviews: MovieReview[];
}

const MovieTemplate = ({ movie, reviews }: Props) => {
  const reviewAverage =
    reviews.length > 0
      ? reviews
          .map((review) => review.author_details.rating || 0)
          .reduce((accumulator, value) => accumulator + value) / reviews.length
      : 0;

  return (
    <PageLayout>
      <Container>
        <BackdropContainer>
          <BackdropGradient />
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
          <HeaderDetails>
            <div>
              <Title>{movie.title}</Title>
              <GenreContainer>
                {movie.genres.map((genre) => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
              </GenreContainer>
            </div>
            {reviewAverage > 0 && (
              <StatIndicator value={reviewAverage} label="Review Rating" />
            )}
          </HeaderDetails>
          <Subtitle>Overview</Subtitle>
          <Overview>{movie.overview}</Overview>
        </DetailsContainer>
      </Container>
    </PageLayout>
  );
};

export default MovieTemplate;

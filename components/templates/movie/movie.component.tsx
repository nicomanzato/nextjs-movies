import { Genre } from 'components/atoms/Genre/Genre.component';
import { FavoriteIcon } from 'components/atoms/Icon/FavoriteIcon.component';
import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { StatIndicator } from 'components/StatIndicator/StatIndicator.component';
import type { MovieWithReview } from 'models/movies';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import {
  BackdropContainer,
  BackdropGradient,
  Container,
  DetailsContainer,
  FavoriteIconContainer,
  GenreContainer,
  HeaderDetails,
  HeaderIconsContainer,
  IconLabel,
  Overview,
  PosterContainer,
  Subtitle,
  Title,
} from './movie.styles';

interface Props {
  movie: MovieWithReview;
}

const MovieTemplate = ({ movie }: Props) => {
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const reviewAverage =
    movie.reviews.length > 0
      ? movie.reviews
          .map((review) => review.author_details.rating || 0)
          .reduce((accumulator, value) => accumulator + value) /
        movie.reviews.length
      : 0;

  const [movieIdList, setValue] = useLocalStorage<number[]>('favorite', []);

  useEffect(() => {
    setIsFavoriteMovie(movieIdList.includes(movie.id));
  }, [movieIdList]);

  const handleFavoriteIconOnClick = () => {
    if (!movieIdList.includes(movie.id)) {
      movieIdList.push(movie.id);
      setValue(movieIdList);
    } else {
      setValue(movieIdList.filter((movieId) => movieId !== movie.id));
    }
  };

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
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
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
            <HeaderIconsContainer>
              {reviewAverage > 0 && (
                <StatIndicator
                  value={reviewAverage}
                  label="User Review Rating"
                />
              )}
              <FavoriteIconContainer onClick={handleFavoriteIconOnClick}>
                <FavoriteIcon
                  color={isFavoriteMovie ? 'red' : 'lightgrey'}
                  width={32}
                  height={32}
                />
                <IconLabel>Favorite</IconLabel>
              </FavoriteIconContainer>
            </HeaderIconsContainer>
          </HeaderDetails>
          <Subtitle>Overview</Subtitle>
          <Overview>{movie.overview}</Overview>
        </DetailsContainer>
      </Container>
    </PageLayout>
  );
};

export default MovieTemplate;

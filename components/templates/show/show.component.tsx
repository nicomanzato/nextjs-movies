import { Genre } from 'components/atoms/Genre/Genre.component';
import { FavoriteIcon } from 'components/atoms/Icon/FavoriteIcon.component';
import { PageLayout } from 'components/atoms/PageLayout/PageLayout.component';
import { StatIndicator } from 'components/StatIndicator/StatIndicator.component';
import type { ShowWithReview } from 'models/show';
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
} from './show.styles';

interface Props {
  show: ShowWithReview;
}

const ShowTemplate = ({ show }: Props) => {
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const reviewAverage =
    show.reviews.length > 0
      ? show.reviews
          .map((review) => review.author_details.rating || 0)
          .reduce((accumulator, value) => accumulator + value) /
        show.reviews.length
      : 0;

  const [movieIdList, setValue] = useLocalStorage<number[]>('favorite', []);

  useEffect(() => {
    setIsFavoriteMovie(movieIdList.includes(show.id));
  }, [movieIdList]);

  const handleFavoriteIconOnClick = () => {
    if (!movieIdList.includes(show.id)) {
      movieIdList.push(show.id);
      setValue(movieIdList);
    } else {
      setValue(movieIdList.filter((movieId) => movieId !== show.id));
    }
  };

  return (
    <PageLayout>
      <Container>
        <BackdropContainer>
          <BackdropGradient />
          <Image
            alt={''}
            src={`https://image.tmdb.org/t/p/w1280/${show.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w185/${show.backdrop_path}`}
          />
        </BackdropContainer>
        <PosterContainer>
          <Image
            alt={''}
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w92/${show.poster_path}`}
          />
        </PosterContainer>
        <DetailsContainer>
          <HeaderDetails>
            <div>
              <Title>{show.name}</Title>
              <GenreContainer>
                {show.genres.map((genre) => (
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
          <Overview>{show.overview}</Overview>
        </DetailsContainer>
      </Container>
    </PageLayout>
  );
};

export default ShowTemplate;

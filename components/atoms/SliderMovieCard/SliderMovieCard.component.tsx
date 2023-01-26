import type { Movie } from 'models/movies';
import { useRouter } from 'next/router';

import { Genre } from '../Genre/Genre.component';
import {
  Container,
  DetailsContainer,
  GenreContainer,
  ImageContainer,
  StyledImage,
  Title,
} from './SliderMovieCard.styles';

export const SliderMovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/movie/${movie.id}`)}>
      <ImageContainer>
        <StyledImage
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          layout="fill"
          alt={'Movie poster'}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
        />
      </ImageContainer>
      <DetailsContainer>
        <Title>{movie.title}</Title>
        <GenreContainer>
          {movie.genres.map((genre) => (
            <Genre key={genre.name}>{genre.name}</Genre>
          ))}
        </GenreContainer>
      </DetailsContainer>
    </Container>
  );
};

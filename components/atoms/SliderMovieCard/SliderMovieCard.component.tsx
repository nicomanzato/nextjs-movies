import type { Movie } from 'models/movies';
import Image from 'next/image';

import {
  Container,
  DetailsContainer,
  Genre,
  GenreContainer,
  ImageContainer,
  Title,
} from './SliderMovieCard.styles';

export const SliderMovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          layout="fill"
          alt={'Movie poster'}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
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

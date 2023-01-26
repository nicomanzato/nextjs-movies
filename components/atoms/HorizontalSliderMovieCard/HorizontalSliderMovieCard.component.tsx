import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Container, Title } from './HorizontalSliderMovieCard.styles';

interface Props {
  movie: Movie | Show;
}

export const HorizontalSliderMovieCard = ({ movie }: Props) => {
  const router = useRouter();

  const handleOnClick = () => {
    if ('title' in movie) {
      router.push(`/movie/${movie.id}`);
    } else {
      router.push(`/show/${movie.id}`);
    }
  };

  return (
    <Container onClick={handleOnClick}>
      <Image
        src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
        layout={'fill'}
        objectFit="cover"
        placeholder="blur"
        alt=""
        blurDataURL={`https://image.tmdb.org/t/p/w92/${movie.backdrop_path}`}
      />
      <Title>{'title' in movie ? movie.title : movie.name}</Title>
    </Container>
  );
};

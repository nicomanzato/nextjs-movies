import { SliderMovieCard } from 'components/atoms/SliderMovieCard/SliderMovieCard.component';
import type { Movie } from 'models/movies';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container } from './MovieSlider.styles';

interface Props {
  movies: Movie[];
}

export const MovieSlider = ({ movies = [] }: Props) => {
  return (
    <Container>
      <Swiper
        modules={[Navigation, Pagination, A11y, Mousewheel, Keyboard]}
        loop
        slidesPerView={1}
        centeredSlides
        loopedSlides={3}
        keyboard={{
          enabled: true,
        }}
        loopAdditionalSlides={movies && movies.length * 2}
        breakpoints={{
          1440: {
            slidesPerView: 4,
          },
          960: {
            slidesPerView: 3,
          },
        }}
        mousewheel={{
          invert: false,
          forceToAxis: true,
          thresholdDelta: 20,
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <SliderMovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

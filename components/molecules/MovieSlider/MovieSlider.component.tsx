import type { Movie } from 'models/movies';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container } from './MovieSlider.styles';

interface Props {
  movies: Movie[];
  Component: any;
  centered?: boolean;
}

export const MovieSlider = ({ movies = [], Component, centered }: Props) => {
  return (
    <Container>
      <Swiper
        modules={[Navigation, Pagination, A11y, Mousewheel, Keyboard]}
        loop
        centeredSlides={centered}
        slidesPerView={1.25}
        spaceBetween={30}
        loopedSlides={3}
        keyboard={{
          enabled: true,
        }}
        loopAdditionalSlides={movies && movies.length * 2}
        mousewheel={{
          invert: false,
          forceToAxis: true,
          thresholdDelta: 20,
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Component movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

import type { Movie } from 'models/movies';
import type { Show } from 'models/show';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container } from './MovieSlider.styles';

interface Props {
  movies: (Movie | Show)[];
  Component: any;
  centered?: boolean;
  slidesPerView?: number;
  loop?: boolean;
}

export const MovieSlider = ({
  movies = [],
  Component,
  centered = true,
  slidesPerView = 1.25,
  loop = true,
}: Props) => {
  return (
    <Container centered={centered}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Mousewheel, Keyboard]}
        loop={loop}
        centeredSlides={centered}
        slidesPerView={slidesPerView}
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

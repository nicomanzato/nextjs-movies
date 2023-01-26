import tw from 'twin.macro';

export const Container = tw.div`
  [.swiper]:(
    lg:overflow-visible
  )
  [.swiper-slide]:(transition duration-300)
  [.swiper-slide-active]:(lg:scale-110)
  mx-auto
  py-16
  `;

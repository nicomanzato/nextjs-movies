import tw from 'twin.macro';

export const Container = tw.div`
  [.swiper]:(
    overflow-y-visible
    lg:overflow-visible
  )
  [.swiper-slide]:(transition duration-300)
  [.swiper-slide-active]:(scale-110)
  mx-auto
  py-16
  `;

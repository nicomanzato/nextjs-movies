import tw from 'twin.macro';

export const Container = tw.div`
  w-[380px]
  [.swiper]:(
    overflow-visible
  )
  [.swiper-slide]:(transition duration-300)
  [.swiper-slide-active]:(lg:scale-105)
  mx-auto
  py-16
  `;

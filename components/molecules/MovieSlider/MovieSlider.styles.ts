import tw, { styled } from 'twin.macro';

export const Container = styled.div(({ centered }: { centered: boolean }) => [
  tw`
    w-[380px]
    [.swiper]:(
      overflow-visible
    )
    [.swiper-slide]:(transition duration-300)
  `,
  centered && tw`mx-auto`,
]);

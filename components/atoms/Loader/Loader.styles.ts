import tw from 'twin.macro';

export const Container = tw.div`
  fixed
  w-full
  h-full
  bg-black
  bg-opacity-50
  z-50
  flex
  justify-center
  top-0
  items-center
`;

export const IconContainer = tw.div`
  flex
  flex-col
  justify-center
  items-center
  select-none
  m-auto
`;

export const SVG = tw.svg`
  mr-2
  w-11
  h-11
  text-gray-300
  animate-spin
  fill-current
`;

export const LoadingMessageContainer = tw.div`
  mt-4
`;

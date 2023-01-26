import tw from 'twin.macro';

export const Container = tw.div`
  w-[280px]
  lg:w-[315px]
  mx-auto
  bg-gray-800
  text-white
  overflow-hidden
  rounded-2xl
`;

export const ImageContainer = tw.div`
  relative
  h-[500px]
  mx-auto
`;

export const DetailsContainer = tw.div`
  p-2
`;

export const Title = tw.h3`
  text-base
  mb-4
`;

export const GenreContainer = tw.div`
  flex
  flex-wrap
`;

export const Genre = tw.span`
  p-1
  px-3
  m-1
  rounded-2xl
  bg-gray-600
`;

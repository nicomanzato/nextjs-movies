import tw from 'twin.macro';

export const Container = tw.div`
  w-[300px]
  mx-auto
  bg-gray-800
  text-white
  overflow-hidden
  rounded-2xl
  shadow-2xl
  border-gray-900
  border-2
  transition
  duration-300
  lg:(hover:scale-105)
  hover:cursor-pointer
  hover:border-gray-300
`;

export const ImageContainer = tw.div`
  relative
  h-[450px]
  mx-auto
`;

export const DetailsContainer = tw.div`
  px-4
  py-3
  min-h-[200px]
  lg:min-h-[180px]
`;

export const Title = tw.h3`
  text-base
  font-bold
  mb-4
`;

export const GenreContainer = tw.div`
  flex
  flex-wrap
`;

import tw from 'twin.macro';
import Image from 'next/image';

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
  lg:(
    hover:scale-105
    hover:border-gray-300
  )
  hover:cursor-pointer
  
`;

export const ImageContainer = tw.div`
  relative
  h-[450px]
  mx-auto
  overflow-hidden
`;

export const StyledImage = tw(Image)`
  rounded-t-2xl
  overflow-hidden
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

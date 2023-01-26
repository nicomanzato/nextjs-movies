import tw from 'twin.macro';

export const Container = tw.div`
  h-16
  flex
  items-center
  text-white
  px-4
  border-b-2
  border-gray-800
  bg-gray-900
  z-10
  w-full
  sticky
  top-0
`;

export const MainContent = tw.div`
  mx-auto
  w-full
  max-w-[1440px]
`;

export const Title = tw.h3`
  font-bold
  pl-4
`;

export const LogoContainer = tw.div`
  flex
  items-center
  w-[fit-content]
  hover:cursor-pointer
`;

import tw from 'twin.macro';

export const Container = tw.div`
  py-2
`;

export const Title = tw.h2`
  text-white
  text-2xl
  font-bold
  mb-6
`;

export const PosterContainer = tw.div`
  relative
  h-[400px]
  w-[240px]
  -mt-48
  mx-auto
  lg:mx-8
  
`;

export const BackdropContainer = tw.div`
  relative
  w-full
  h-96
`;

export const DetailsContainer = tw.div`
  p-4
`;

export const Subtitle = tw.h4`
  font-bold
  text-base
  text-white
  mb-2
`;

export const Overview = tw.p`
  text-base
  text-white
`;

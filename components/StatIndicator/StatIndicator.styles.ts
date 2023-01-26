import tw from 'twin.macro';

export const Container = tw.div`
  flex
  flex-col
  items-center
`;

export const Value = tw.div`
  rounded-full
  w-14
  h-14
  border-2
  flex
  items-center
  justify-center
  text-sm
`;

export const Label = tw.span`
  mt-2
`;

import tw from 'twin.macro';

export const Container = tw.div`
  flex
  flex-col
  items-center
`;

export const Value = tw.div`
  rounded-full
  w-16
  h-16
  border-2
  flex
  items-center
  justify-center
`;

export const Label = tw.span`
  mt-2
`;

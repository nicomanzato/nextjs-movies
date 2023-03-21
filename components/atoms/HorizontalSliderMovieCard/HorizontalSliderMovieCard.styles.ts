import { motion } from 'framer-motion';
import tw from 'twin.macro';

export const Container = tw(motion.div)`
  bg-gray-600
  h-44
  rounded-2xl
  relative
  overflow-hidden
  shadow-md
  transition
  border-gray-900
  duration-300
  border-2
  lg:(
    hover:cursor-pointer
    hover:scale-105
    hover:border-gray-300
    hover:shadow-2xl
  )
`;

export const Title = tw.span`
  text-white
  z-20
  absolute
  bg-black
  bg-opacity-60
  bottom-0
  font-bold
  w-full
  flex
  justify-center
  items-center
  text-center
  text-sm
  h-16
`;

import type { ReactNode } from 'react';

import { StyledGenre } from './Genre.styles';

interface Props {
  children: ReactNode;
}

export const Genre = ({ children }: Props) => {
  return <StyledGenre>{children}</StyledGenre>;
};

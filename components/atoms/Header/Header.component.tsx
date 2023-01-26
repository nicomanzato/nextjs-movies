import Image from 'next/image';

import { Container, Title } from './Header.styles';

export const Header = () => {
  return (
    <Container>
      <Image
        alt={'The Film club logo'}
        src={'/logo.jpg'}
        width={48}
        height={48}
      />
      <Title>The Film club</Title>
    </Container>
  );
};

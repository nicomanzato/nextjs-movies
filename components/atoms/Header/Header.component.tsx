import Image from 'next/image';
import { useRouter } from 'next/router';

import { Container, LogoContainer, Title } from './Header.styles';

export const Header = () => {
  const router = useRouter();

  return (
    <Container>
      <LogoContainer onClick={() => router.push('/')}>
        <Image
          alt={'The Film club logo'}
          src={'/logo.jpg'}
          width={48}
          height={48}
        />
        <Title>The Film club</Title>
      </LogoContainer>
    </Container>
  );
};

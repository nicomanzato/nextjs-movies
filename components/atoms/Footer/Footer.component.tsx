import Link from 'next/link';

import { Container, Label } from './Footer.styles';

export const Footer = () => {
  return (
    <Container>
      <Label>
        Powered by{' '}
        <Link
          href="https://www.themoviedb.org"
          passHref
          legacyBehavior
          target={'_blank'}
        >
          <a target={'_blank'}>The Movie DB</a>
        </Link>
      </Label>
    </Container>
  );
};

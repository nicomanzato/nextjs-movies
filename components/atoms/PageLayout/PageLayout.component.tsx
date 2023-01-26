import { Header } from '../Header/Header.component';
import { Section } from './PageLayout.styles';

interface Props {
  children: React.ReactElement;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <Section>
      <Header></Header>
      {children}
    </Section>
  );
};

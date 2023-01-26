import { Container, Label, Value } from './StatIndicator.styles';

interface Props {
  value: number;
  label?: string;
}

export const StatIndicator = ({ value, label }: Props) => {
  return (
    <Container>
      <Value>{value.toFixed(2)}</Value>
      <Label>{label}</Label>
    </Container>
  );
};

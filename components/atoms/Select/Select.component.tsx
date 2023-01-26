import { StyledSelect } from './Select.styles';

interface Props {
  cacheOptions?: boolean;
  loadOptions: (value: string) => any;
}

export const Select = (props: Props) => <StyledSelect {...props} />;

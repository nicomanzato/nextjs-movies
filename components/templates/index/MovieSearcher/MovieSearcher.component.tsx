import { StyledSelect } from 'components/atoms/Select/Select.styles';
import { moviesMock } from 'mock/movies';
import { useRouter } from 'next/router';

import { Container, SelectContainer } from './MovieSearcher.styles';

const filterMovies = (inputValue: string) => {
  return moviesMock
    .filter((movie) =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    )
    .map((movie) => ({ label: movie.title, value: movie.id }));
};

const promiseOptions = (inputValue: string) =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(filterMovies(inputValue));
    }, 1000);
  });

export const MovieSearcher = () => {
  const router = useRouter();

  const handleOnChange: any = ({ value }: { value: number }) => {
    router.push(`/movie/${value}`);
  };

  return (
    <Container>
      <SelectContainer>
        <StyledSelect
          loadOptions={promiseOptions}
          placeholder="What movie were you thinking about today?"
          noOptionsMessage={() => 'No results available, try another keyword'}
          onChange={handleOnChange}
        />
      </SelectContainer>
    </Container>
  );
};

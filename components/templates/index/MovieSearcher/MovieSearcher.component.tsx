import { StyledSelect } from 'components/atoms/Select/Select.styles';
import { moviesMock } from 'mock/movies';
import { useRouter } from 'next/router';
import { getMoviesByKeyword } from 'services/movie.service';

import { Container, SelectContainer } from './MovieSearcher.styles';

const filterMovies = (inputValue: string) => {
  return moviesMock.filter((movie) =>
    movie.title.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<any>(async (resolve) => {
    const movies = await getMoviesByKeyword(inputValue);
    resolve(
      movies.map((movie) => ({
        label: movie.title,
        value: movie.id,
      }))
    );
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

import { useState } from 'react';
import { useMoviesLazyQuery, Movie } from 'graphql/graphqlClientApi';

export const useMovie = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const [getMovies, moviesQuery] = useMoviesLazyQuery({
    onCompleted: (data) => setMovies(data.movies),
    onError: (error) => {
      console.log(error);
      alert('error');
    },
  });

  return { movies, getMovies, moviesQuery };
};

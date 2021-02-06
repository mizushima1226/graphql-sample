import { useEffect } from 'react';

import { useMovie } from '@hooks/useMovie';

export const Movies = () => {
  const { movies, moviesQuery, getMovies } = useMovie();

  useEffect(() => {
    // getMovies();
  }, []);

  const onClick = () => {
    getMovies();
  };

  return (
    <>
      <h2>This is Movies Page!</h2>
      <button onClick={onClick}>get movies</button>
      {moviesQuery.loading ? (
        <p>laoding...</p>
      ) : (
        <>
          {movies.map((movie, idx) => (
            <p key={movie.title}>
              {idx + 1}:{movie.title}:{movie.director}
            </p>
          ))}
        </>
      )}
    </>
  );
};

export default Movies;

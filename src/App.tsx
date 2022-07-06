import * as React from 'react';
import { useState } from 'react';
import { IMovie } from './interfaces';
import { HeaderBar, FavoriteMovies, MovieLibrary, SearchBar } from './components';

type Props = {};

const App: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>(JSON.parse(localStorage.getItem('favoriteMovies')) ?? []);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const addMovieToFavorites = React.useCallback((newMovie: IMovie) => {
    if (!favoriteMovies.includes(newMovie)) {
      setFavoriteMovies(((prev) =>
        [
          ...prev,
          newMovie
        ]
      ));
    }
  }, [setFavoriteMovies, favoriteMovies]);

  const removeMovieFromFavorites = React.useCallback((movieId: number) => {
    const filteredMovies = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(filteredMovies);
  }, [setFavoriteMovies, favoriteMovies]);

  React.useEffect(() => {
    window.localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <div>
      <HeaderBar isOpen={isOpen} setIsOpen={setIsOpen}>
        <FavoriteMovies isOpen={isOpen} setIsOpen={setIsOpen} favoriteMovies={favoriteMovies} removeMovie={removeMovieFromFavorites} />
      </HeaderBar>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
      <MovieLibrary queryString={searchValue} addMovieToFavorites={addMovieToFavorites} removeMovieFromFavorites={removeMovieFromFavorites} favorites={favoriteMovies} />
    </div>
  );
};

export default App;
import App from './App';
import { IMovie } from './interfaces';
import { localizedStrings } from './helpers';
import { render, screen } from '@testing-library/react';
import { FavoriteMovies, MovieCard, MovieLibrary, Pagination } from './components';

const mockMovies: IMovie[] = [
  {
    adult: false,
    backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
    genre_ids: [16, 10751, 35, 14],
    id: 508947,
    original_language: 'en',
    original_title: 'Turning Red',
    overview:
      'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
    popularity: 1366.464,
    poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
    release_date: '2022-03-10',
    title: 'Turning Red',
    video: false,
    vote_average: 7.5,
    vote_count: 2644,
  },
  {
    adult: false,
    backdrop_path: '/dK12GIdhGP6NPGFssK2Fh265jyr.jpg',
    genre_ids: [28, 35, 80, 53],
    id: 512195,
    original_language: 'en',
    original_title: 'Red Notice',
    overview:
      "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    popularity: 384.452,
    poster_path: '/lAXONuqg41NwUMuzMiFvicDET9Y.jpg',
    release_date: '2021-11-04',
    title: 'Red Notice',
    video: false,
    vote_average: 6.8,
    vote_count: 3800,
  },
  {
    adult: false,
    backdrop_path: '/zHHcindG4uVZLPLuYWoo4rnv6Ti.jpg',
    genre_ids: [18, 28, 53],
    id: 595743,
    original_language: 'en',
    original_title: 'SAS: Red Notice',
    overview:
      'An off-duty SAS soldier, Tom Buckingham, must thwart a terror attack on a train running through the Channel Tunnel. As the action escalates on the train, events transpire in the corridors of power that may make the difference as to whether Buckingham and the civilian passengers make it out of the tunnel alive.',
    popularity: 111.372,
    poster_path: '/6Y9fl8tD1xtyUrOHV2MkCYTpzgi.jpg',
    release_date: '2021-08-11',
    title: 'SAS: Red Notice',
    video: false,
    vote_average: 5.9,
    vote_count: 376,
  },
  {
    adult: false,
    backdrop_path: '/weneJTnAb1IFI94SKcaXzBFmPKH.jpg',
    genre_ids: [80, 53, 18, 28],
    id: 818192,
    original_language: 'en',
    original_title: 'Ida Red',
    overview:
      'Ida Red may not survive her 20-year prison sentence for armed robbery. She turns to her son, Wyatt, for one last job and a chance to regain her freedom.',
    popularity: 79.698,
    poster_path: '/etMxKseW67499tUJonLNHXTF538.jpg',
    release_date: '2021-11-05',
    title: 'Ida Red',
    video: false,
    vote_average: 5.9,
    vote_count: 36,
  },
];

test('renders header bar', () => {
  render(<App />);
  const headerBarElement = screen.getByText('Favorites');
  expect(headerBarElement).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const searchBarElement = screen.getByPlaceholderText('Search in the movie database...');
  expect(searchBarElement).toBeInTheDocument();
});

test('renders empty favorite movies list', () => {
  render(<FavoriteMovies isOpen={true} setIsOpen={(value: boolean) => { }} favoriteMovies={[]} removeMovie={(movieId: number) => { console.log(movieId); }} />);
  const noFavoriteMoviesElement = screen.getByText(localizedStrings.NoFavoriteMovies);
  expect(noFavoriteMoviesElement).toBeInTheDocument();
});

test('renders movie library component', () => {
  render(<MovieLibrary favorites={[]} queryString="Red" addMovieToFavorites={(movie: IMovie) => { console.log(movie); }} removeMovieFromFavorites={(movieId: number) => { }} />);
  const movieLibraryElement = screen.getByTestId('movie-lib');
  expect(movieLibraryElement).toBeInTheDocument();
});

test('renders favorite movies list', () => {
  render(<FavoriteMovies isOpen={true} setIsOpen={(value: boolean) => { }} favoriteMovies={mockMovies} removeMovie={(movieId: number) => { console.log(movieId); }} />);
  const noFavoriteMoviesElement = screen.getByText('Red Notice');
  expect(noFavoriteMoviesElement).toBeInTheDocument();
});

test('renders movie card', () => {
  render(<MovieCard isFavorite={true} movie={mockMovies.shift()} addMovieToFavorites={(movie: IMovie) => { console.log(movie); }} removeMovieFromFavorites={(movieId: number) => { console.log(movieId); }} />);
  const movieElement = screen.getByText('Turning Red');
  expect(movieElement).toBeInTheDocument();
});

test('renders pagination component', () => {
  render(<Pagination currentPage={1} totalPages={10} isLoading={false} setCurrentPage={(value: number) => { }} />);
  const paginationElement = screen.getByTestId('pagination');
  expect(paginationElement).toBeInTheDocument();
});

test('does not render pagination component', () => {
  render(<Pagination currentPage={1} totalPages={1} isLoading={false} setCurrentPage={(value: number) => { }} />);
  expect(() => screen.getByTestId('pagination')).toThrow('Unable to find an element');
});

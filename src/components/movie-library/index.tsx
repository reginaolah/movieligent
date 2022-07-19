import * as React from 'react';
import MovieCard from './movie-card';
import { IMovie } from '../../interfaces';
import { localizedStrings } from '../../helpers';
import ErrorIcon from '@mui/icons-material/Error';
import styles from '../../styles/movie-library.module.scss';
import { CircularProgress, Stack, ImageList } from '@mui/material';

type Props = {
    queryString: string;
    favorites: IMovie[];
    isLoading: boolean;
    addMovieToFavorites: (movie: IMovie) => void;
    removeMovieFromFavorites: (movieId: number) => void;
    currentPage: number;
    movies: IMovie[];
};

const MovieLibrary: React.FC<Props> = ({ queryString, addMovieToFavorites, removeMovieFromFavorites, favorites, isLoading, movies, currentPage }) => {
    const isFavorite = React.useCallback((movie: IMovie): boolean => {
        return favorites?.some(favorite => (favorite.id === movie.id));
    }, [favorites]);

    return (
        <Stack data-testid="movie-lib" className={styles.movieLibraryContainer}>
            {
                !!isLoading && queryString.length >= 3 && <Stack className={styles.loadingSpinner}>
                    <CircularProgress className={styles.spinner} />
                    {currentPage === 1 ? localizedStrings.Searching : localizedStrings.Loading}
                </Stack>
            }
            <Stack className={styles.movieListContainer}>
                {
                    !!movies?.length && movies?.map((movie, key) => {
                        return (<ImageList className={styles.movieList} key={key}>
                            <MovieCard
                                movie={movie}
                                addMovieToFavorites={addMovieToFavorites}
                                removeMovieFromFavorites={removeMovieFromFavorites}
                                isFavorite={isFavorite(movie)} />
                        </ImageList>
                        );
                    })
                }
            </Stack>
            {
                !movies?.length && !isLoading &&
                <Stack className={styles.noResultPlaceholder}>
                    <ErrorIcon className={styles.errorIcon} />
                    {localizedStrings.NoResultWithTheGivenConditions}
                </Stack>
            }
        </Stack>
    );
};

export default MovieLibrary;
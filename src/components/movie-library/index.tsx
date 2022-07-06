import * as React from 'react';
import { Pagination } from '..';
import { useState } from 'react';
import MovieCard from './movie-card';
import { IMovie } from '../../interfaces';
import { useSearchResult } from '../../hooks';
import { localizedStrings } from '../../helpers';
import ErrorIcon from '@mui/icons-material/Error';
import styles from '../../styles/movie-library.module.scss';
import { CircularProgress, Stack, ImageList } from '@mui/material';

type Props = {
    queryString: string;
    favorites: IMovie[];
    addMovieToFavorites: (movie: IMovie) => void;
    removeMovieFromFavorites: (movieId: number) => void;
};

const MovieLibrary: React.FC<Props> = ({ queryString, addMovieToFavorites, removeMovieFromFavorites, favorites }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { searchResult, isLoading, refetch } = useSearchResult(queryString, currentPage);

    const isFavorite = React.useCallback((movie: IMovie): boolean => {
        return favorites?.some(favorite => (favorite.id === movie.id));
    }, [favorites]);

    return (
        <Stack data-testid="movie-lib" className={styles.movieLibraryContainer}>
            {
                isLoading && !!queryString && <Stack className={styles.loadingSpinner}>
                    <CircularProgress className={styles.spinner} />
                    {currentPage === 1 ? localizedStrings.Searching : localizedStrings.Loading}
                </Stack>
            }
            <Stack className={styles.movieListContainer}>
                {
                    !!searchResult?.movies.length && searchResult?.movies?.map((movie, key) => {
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
                !searchResult?.movies.length && !isLoading &&
                <Stack className={styles.noResultPlaceholder}>
                    <ErrorIcon className={styles.errorIcon} />
                    {localizedStrings.NoResultWithTheGivenConditions}
                </Stack>
            }
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={searchResult?.totalPages} isLoading={isLoading} />
        </Stack>
    );
};

export default MovieLibrary;
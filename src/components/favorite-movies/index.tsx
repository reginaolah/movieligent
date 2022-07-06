import * as React from 'react';
import { IMovie } from '../../interfaces';
import { localizedStrings } from '../../helpers';
import FavoriteMovieCard from './favorite-movie-card';
import styles from '../../styles/favorite-movies.module.scss';
import { List, ListItem, ListSubheader, SwipeableDrawer } from '@mui/material';

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    favoriteMovies: IMovie[];
    removeMovie: (id: number) => void;
};

const FavoriteMovies: React.FC<Props> = ({ favoriteMovies, removeMovie, isOpen, setIsOpen }) => {
    return (
        <SwipeableDrawer
            anchor={'right'}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            PaperProps={{
                sx: { width: "60%" },
            }}
        >
            <List
                subheader={
                    < ListSubheader sx={{
                        backgroundColor: '#007887',
                        color: 'white',
                        height: '80px',
                        textAlign: 'center',
                        paddingTop: '15px'
                    }}>
                        {localizedStrings.FavoriteMovies}
                    </ListSubheader >
                }>
                {
                    !!favoriteMovies?.length && favoriteMovies?.map((movie, index) => {
                        return <FavoriteMovieCard key={index} movie={movie} />;
                    })
                }
                {
                    !favoriteMovies?.length && <ListItem className={styles.noFavoriteListItem}>
                        {localizedStrings.NoFavoriteMovies}
                    </ListItem>
                }
            </List >
        </SwipeableDrawer>
    );
};

export default FavoriteMovies;
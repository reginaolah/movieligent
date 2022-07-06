import * as React from 'react';
import { IMovie } from '../../interfaces';
import { BrokenImage } from '@mui/icons-material';
import styles from '../../styles/favorite-movie-card.module.scss';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

type Props = {
    movie: IMovie;
};

const FavoriteMovieCard: React.FC<Props> = ({ movie }) => {
    const [imageError, setImageError] = React.useState<boolean>(false);

    return (
        <ListItem className={styles.listItem}>
            <ListItemIcon>
                {
                    !imageError && <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}?w=248&fit=crop&auto=format`}
                        alt={movie.title}
                        onError={() => setImageError(true)}
                        className={styles.listItemImage}
                    />
                }
                {
                    !!imageError && <BrokenImage className={styles.listItemImagePlaceholder} />
                }
            </ListItemIcon>
            <ListItemText className={styles.listItemText} primary={<Tooltip title={movie.title}><div className={styles.movieTitle}>{movie.title}</div></Tooltip>} secondary={movie.vote_average} />
        </ListItem>
    );
};

export default FavoriteMovieCard;
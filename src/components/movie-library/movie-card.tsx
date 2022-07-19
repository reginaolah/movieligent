import * as React from 'react';
import { IMovie } from '../../interfaces';
import { BrokenImage, Star } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from '../../styles/movie-card.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material';

type Props = {
  movie: IMovie;
  isFavorite: boolean;
  addMovieToFavorites: (movie: IMovie) => void;
  removeMovieFromFavorites: (movieId: number) => void;
};

const MovieCard: React.FC<Props> = ({ movie, addMovieToFavorites, isFavorite: isFavoriteMovie, removeMovieFromFavorites }) => {
  const [imageError, setImageError] = React.useState<boolean>(false);
  const [isFavorit, setIsFavorite] = React.useState<boolean>(isFavoriteMovie);

  const isFavorite = React.useMemo(() => {
    return isFavoriteMovie;
  }, [isFavoriteMovie]);

  return (
    <ImageListItem key={movie.id} sx={{ minHeight: '300px' }}>
      {
        !imageError &&
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}?w=248&fit=crop&auto=format`}
          alt={movie.title}
          onError={() => setImageError(true)}
        />
      }
      {
        !!imageError && <BrokenImage className={styles.brokenImagePlaceholder} />
      }
      <ImageListItemBar
        title={<Tooltip title={movie.title}><div className={styles.movieTitle}>{movie.title}</div></Tooltip>}
        subtitle={<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Star className={styles.starIcon} />{movie.vote_average}</div>}
        sx={{ minHeight: '60px' }}
        actionIcon={
          <IconButton
            className={styles.favoriteIcon}
            onClick={() => {
              isFavorit
                ? removeMovieFromFavorites(movie.id)
                : addMovieToFavorites(movie);
              setIsFavorite(!isFavorit);
            }}
          >
            {!isFavorite && <FavoriteBorderIcon className={styles.favoriteIcon} />}
            {isFavorite && <FavoriteIcon className={styles.favoriteIcon} />}
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default MovieCard;
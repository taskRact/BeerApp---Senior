import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

export interface FavoriteProps {
    isFavorite: boolean
    toggleFavorite: () => void
}

export function Favorite({ isFavorite, toggleFavorite }: FavoriteProps) {
  return (

    <IconButton size="large" onClick={toggleFavorite}>
      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary" />}
    </IconButton>
  );
}

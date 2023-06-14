import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

export interface FavoriteProps {
    isFavorite: boolean
    toggleFavorite: () => void
}

export function Favorite({ isFavorite, toggleFavorite }: FavoriteProps) {
  return (

    <IconButton size="large" onClick={toggleFavorite} title={`${isFavorite ? 'Remove from ' : 'Add to '}saved`}>
      {isFavorite ? <FavoriteIcon style={{
        width: '1.5em',
        height: '1.5em'
      }} /> : <FavoriteBorderIcon style={{
        width: '1.5em',
        height: '1.5em'
      }} />}
    </IconButton>
  );
}

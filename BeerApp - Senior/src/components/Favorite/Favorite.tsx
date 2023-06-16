import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

export interface FavoriteProps {
  isFavorite: boolean
  toggleFavorite: () => void
}

export function Favorite({ isFavorite, toggleFavorite }: FavoriteProps) {
  const Icon = isFavorite ? FavoriteIcon : FavoriteBorderIcon;
  const title = `${isFavorite ? 'Remove from ' : 'Add to '}saved`;

  return (
    <IconButton size="large" onClick={toggleFavorite} title={title}>
      <Icon style={{
        width: '1.5em',
        height: '1.5em'
      }} />
    </IconButton>
  );
}

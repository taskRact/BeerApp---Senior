import { Beer } from '../types';
import { useLocalStorage } from './useLocalStorage';

export type FavoriteBeers = Record<Beer['id'], Beer['name'] | false>

export function useFavoriteBeers() {
  const [favoriteBeers, setFavoriteBeers] = useLocalStorage<FavoriteBeers>('favoriteBeers', {});

  const toggleFavorite = (id: string, name: string) => setFavoriteBeers({
    ...favoriteBeers,
    [id!]: favoriteBeers[id] ? false : name
  });

  return [favoriteBeers, setFavoriteBeers, toggleFavorite] as const;
}

import { Beer } from '../types';
import { useLocalStorage } from './useLocalStorage';

export type FavoriteBeers = Record<Beer['id'], Beer['name'] | false>

export function useFavoriteBeers() {
  return useLocalStorage<FavoriteBeers>('favoriteBeers', {});
}

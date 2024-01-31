import { getRandomBeerList, getFavouriteListByIds, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchFavouriteData = (setData: (data: Array<Beer>) => void) => {
    (async () => {
        try {
            let favouriteIds = JSON.parse(localStorage.getItem('favouriteList') || "").join(',');
            if (!favouriteIds) return setData([]);
            const { data } = await getFavouriteListByIds(favouriteIds);
            setData(data);
        } catch (error) {
            handle(error);
        }
    })();
};

const searchBreweries = (setData: (data: Array<Beer>) => void, query: string) => {
    (async () => {
      try {
        const { data } = await searchBeerList(query);
        setData(data);
      } catch (error) {
        handle(error);
      }
    })();
  };

export { fetchData, fetchFavouriteData, searchBreweries };

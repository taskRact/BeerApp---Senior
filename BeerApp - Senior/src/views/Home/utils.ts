import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const randomNumber = Math.round(10 + Math.random() * 40);
      const { data } = await getRandomBeerList(randomNumber);
      setData(data.slice(0,10));
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

export { fetchData, searchBreweries };

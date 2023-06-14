import { getBeerList, getBeerMetaData, searchBeerList } from '../../api';
import { ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);

      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchSearchData = (setData: (data: Array<Beer>) => void, query: string, params?: ApiParams) => {
  (async () => {
    try {
      const response = await searchBeerList(query, params);

      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetadata = (setData: (total: number) => void) => {
  (async () => {
    try {
      const response = await getBeerMetaData();

      setData(parseInt(response.data.total, 10));
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMetadata, fetchSearchData };

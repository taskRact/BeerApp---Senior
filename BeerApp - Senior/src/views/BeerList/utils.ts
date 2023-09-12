import { getBeerList, getBeerMetaData } from '../../api';
import { Beer, ApiParams } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params?: ApiParams) => {
  (async () => {
    console.log(params)
    try {
      const response = await getBeerList(params);
      console.log(response);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMeta = (setData: (data: ApiParams) => void) => {
  (async () => {
    try {
      const response = await getBeerMetaData();
      console.log(response);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMeta };

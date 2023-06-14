/* eslint-disable max-len */
import axios from 'axios';

import { ApiParams } from '../types';
import { API } from './config';

const getBeer = (id: string) => axios.get(`${API}breweries/${id}`);

const getBeerList = (params?: ApiParams) => axios.get(`${API}breweries/`, {
  params
});

/**
 * @param size Int between 1 and 50. Default is 3.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = (size = 3) => axios.get(`${API}breweries/random`, {
  params: {
    size
  }
});
const getSearchBeerUrl = (isAutoComplete = false) => `${API}breweries/${isAutoComplete ? 'autocomplete' : 'search'}`;

const searchBeerList = (query: string, params?: ApiParams, isAutoComplete = false) => axios.get(getSearchBeerUrl(isAutoComplete), {
  params: {
    query,
    ...params
  }
});

const getBeerMetaData = (params?: ApiParams) => axios.get(`${API}breweries/meta`, {
  params
});

export { getBeer, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData };

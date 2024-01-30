import { getBeerList, getBeerMetaData } from '../../api';
import { Beer, SORT, TYPE } from '../../types';
import handle from '../../utils/error';
import { ApiParams } from '../../types'; // Import the 'ApiParams' type

const fetchData = async (
        setData: (data: Array<Beer>) => void,
        page: number,
        per_page: number,
        sort: string,
        by_name: string,
        by_city: string,
        by_state: string,
        by_postal_code: string | number,
        by_type: string
    ) => {
        try {
            const params: ApiParams = { page, per_page, sort: sort as SORT,
                ...(by_name && { by_name }),
                ...(by_city && { by_city }),
                ...(by_state && { by_state }),
                ...(by_postal_code && { by_postal_code }),
                ...(by_type && { by_type: by_type as TYPE })
            };
            const [response, metadata] = await Promise.all([
                getBeerList(params), 
                getBeerMetaData(params)
            ]); 
            getBeerList(params);
            setData(response.data);
            return metadata.data.total;
        } catch (error) {
            handle(error);
        }
    };
  
export { fetchData };
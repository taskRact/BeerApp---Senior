import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { makeStyles } from 'tss-react/mui';

const fetchBeerData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      console.log(response.data);
      const latitude = parseFloat(response.data.latitude) || undefined;
      const longitude = parseFloat(response.data.longitude) || undefined;
      response.data.latitude = latitude;
      response.data.longitude = longitude;
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const useMuiStyles = makeStyles()({
  root: {
    margin: 'auto',
    padding: '20px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '3rem',
    marginTop: '10px'
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  subheading: {
    fontSize: '1.75rem',
    marginTop: '20px'
  },
  cardContent: {
    display: 'flex'
  }
});

export { fetchBeerData, useMuiStyles };

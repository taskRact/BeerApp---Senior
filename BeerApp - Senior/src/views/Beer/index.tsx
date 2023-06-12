import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Beer as IBeer } from '../../types';
import { LocationMap } from './map';
import { fetchData } from './utils';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <div>
        <Link to=".." relative="path">
          Back to the list
        </Link>
      </div>
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <main>
          <span>
            <strong>Type: </strong> {beer?.brewery_type}
          </span>
        </main>
        <div>Address</div>
        {!!beer?.address_1 && <div>{beer?.address_1}</div>}
        {!!beer?.address_2 && <div>{beer?.address_3}</div>}
        {!!beer?.address_3 && <div>{beer?.address_2}</div>}
        <div>{beer?.street}</div>
        <div>{beer?.postal_code}, {beer?.city}, {beer?.state || beer?.state_province}</div>
        <div>{beer?.country}</div>
        <div>Phone: {beer?.phone}</div>
        <div>Website: {beer?.website_url}</div>

        {beer?.latitude && <LocationMap latlang={[parseFloat(beer.latitude), parseFloat(beer.longitude)]} />}
      </section>
    </article>
  );
};

export default Beer;

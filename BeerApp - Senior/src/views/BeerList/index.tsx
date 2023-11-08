import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, BadgeRoot, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import styles from "../Home/Home.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(beerList.length / 5);

  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = beerList.slice(startIndex, endIndex);

  const changePage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle page navigation
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(beerList.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

//   // Render the paginated list
//   return (
//     <div>
//       <ul>
//         {displayedItems.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//       <div>
//         <button onClick={prevPage}>Previous</button>
//         <button onClick={nextPage}>Next</button>
//       </div>
//     </div>
//   );
// };


  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {displayedItems.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar >
                  <Avatar>
                    <SportsBar className={styles.listitem} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className={styles.listitembeer} primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          
      {/* <ul>
        {displayedItems.map((bear) => (
          <li key={bear.id}>{bear.name}</li>
        ))}
      </ul> */}
      

          <div>
          <div className={styles.pagination}>
            <div className={styles.button}>
            <Button  variant="contained" size="small" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
            </div>
      <div>
      <Button variant="contained" size="small" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
         
      </div>
      </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;

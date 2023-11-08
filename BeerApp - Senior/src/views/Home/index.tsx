import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>("");
  const localStorageKey = "savedItems";

  const initialSavedList = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );

  const [savedList, setSavedList] = useState<Array<Beer>>(initialSavedList);

  const [savedBufferList, setSavedBufferList] =
    useState<Array<Beer>>(savedList);

  const [sortByName, setSortByName] = useState(false); // State for sorting

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const filteredBeerList = beerList.filter((beer) =>
    beer.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleReload: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    fetchData(setBeerList);
  };

  const handleSaveItems = (beer: Beer) => {
    if (!savedBufferList.some((item) => item.id === beer.id)) {
      // If the item is not in the saved list, add it
      const updatedSavedBufferList = [...savedBufferList, beer];
      setSavedBufferList(updatedSavedBufferList);
    } else {
      // If the item is already in the saved list, remove it
      const updatedSavedList = savedBufferList.filter(
        (item) => item.id !== beer.id
      );
      setSavedBufferList(updatedSavedList);
    }
  };

  console.log({ savedBufferList });

  const handleSave = () => {
    const existingData = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    );

    // Combine existing data with savedBufferList
    const updatedData = [...existingData, ...savedBufferList];

    const uniqueData = updatedData.reduce((acc, obj) => {
      if (!acc.find((item: any) => item.id === obj.id)) {
        acc.push(obj);
      }
      return acc;
    }, []);

    // Save the unique data to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(uniqueData));

    // Update the state and clear the buffer
    setSavedList(uniqueData);
    setSavedBufferList([]);
  };

  const handleRemove = () => {
    localStorage.removeItem(localStorageKey);
    setSavedList([]);
    setSavedBufferList([]);
  };

  const sortItemsByName = () => {
    const sortedList = [...filteredBeerList];
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
    return sortedList;
  };

  const sortedList = sortByName ? sortItemsByName() : filteredBeerList;

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  onChange={(event) => setFilterText(event?.target.value)}
                  value={filterText}
                />
                <div>
                  {savedBufferList.length > 0 && (
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      style={{ marginLeft: "10px" }}
                    >
                      Save list
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => setSortByName(!sortByName)}
                    style={{ marginLeft: "10px" }}
                  >
                    Sort by name
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleReload}
                    style={{ marginLeft: "10px" }}
                  >
                    Reload list
                  </Button>
                </div>
              </div>
              <ul className={styles.list}>
                {sortedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      onChange={() => handleSaveItems(beer)}
                      checked={savedBufferList.some(
                        (item) => item.id === beer.id
                      )}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant="contained" size="small" onClick={handleRemove}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;

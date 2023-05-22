import { Beer } from "../../types";


const getSavedBeer = (id: string): Beer | undefined => {
    const savedListString = localStorage.getItem('savedList');
    if (!savedListString) {
        return
    }
    const savedListParsed = JSON.parse(savedListString);
    return savedListParsed.find((beer: Beer) => beer.id === id);
};

const getSavedBeerList = (): Array<Beer> => {
    const savedListString = localStorage.getItem('savedList');
    if (savedListString) {
        const savedListParsed = JSON.parse(savedListString);
        return savedListParsed;
    }
    return [];
};

const saveBeerList = (beerList: Array<Beer>) => {   
    localStorage.setItem('savedList', JSON.stringify(beerList));
};

const toggleSavedListItem = (id: string, savedList: Array<Beer>, beerList: Array<Beer>) => {
    const isSaved = savedList.some((brewery) => brewery.id === id);
    let updatedSavedList: Beer[];
  
    if (isSaved) {
      updatedSavedList = savedList.filter((brewery) => brewery.id !== id);
    } else {
      const selectedBrewery = beerList.find((brewery) => brewery.id === id);
      updatedSavedList = selectedBrewery ? [...savedList, selectedBrewery] : savedList;
    }

    return updatedSavedList;
  };  


export { getSavedBeer, getSavedBeerList, saveBeerList, toggleSavedListItem };

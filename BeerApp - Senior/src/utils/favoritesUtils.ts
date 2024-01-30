const saveAsFavourite = (id: string, setFavourite: React.Dispatch<React.SetStateAction<string[]>>) => {
    const favouriteList = JSON.parse(localStorage.getItem('favouriteList') || '[]');
    if (favouriteList.indexOf(id) === -1) {
      favouriteList.push(id);
      localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
      setFavourite(favouriteList);
    } else {
      favouriteList.splice(favouriteList.indexOf(id), 1);
      localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
      setFavourite(favouriteList);
    }
  };

  export default saveAsFavourite;
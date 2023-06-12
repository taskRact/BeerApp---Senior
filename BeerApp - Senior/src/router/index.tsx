import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer';
import Menu from '../components/Menu';
import NotFound from '../views/404';
import Beer from '../views/Beer';
import BeerList from '../views/BeerList';
import Home from '../views/Home';
import Offline from '../views/Offline';

const Router = () => (
  <BrowserRouter>
    <Menu>
      <Offline />
      <Routes>
        <Route index element={<Home />} />
        <Route path="beer">
          <Route index element={<BeerList />} />
          <Route path=":id" element={<Beer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export default Router;

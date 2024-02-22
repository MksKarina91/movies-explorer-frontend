import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from './Footer/Footer';
import Auth from './Auth/Auth';
import Page404 from './Page404/Page404';

function App() {
  const [loggedIn] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(true);
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} onMenuClick={handleMenuClick} onMenuClose={handleCloseMenu} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path='/movies'
          element={
            <>
              <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} onMenuClick={handleMenuClick} onMenuClose={handleCloseMenu} />
              <MoviesCardList name='movies' />
              <Footer />
            </>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <>
              <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} onMenuClick={handleMenuClick} onMenuClose={handleCloseMenu} />
              <MoviesCardList name='saved-movies' />
              <Footer />
            </>
          }
        />
        <Route
          path='/profile'
          element={
            <>
              <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} onMenuClick={handleMenuClick} onMenuClose={handleCloseMenu} />
              <Auth name='profile' />
            </>
          }
        />

        <Route path='/signup' element={<Auth name='signup' />} />

        <Route path='/signin' element={<Auth name='signin' />} />

        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;

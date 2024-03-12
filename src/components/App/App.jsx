import "./App.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from "../Movies/Movies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Login from "../Login/Login.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import Info from "../Info/Info.js";
import Page404 from '../Page404/Page404.js';

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import * as Auth from "../../utils/AuthApi.js";
import { api } from "../../utils/MainApi.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isFooterActive, setFooterActive] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false);


  const activePage = useLocation();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (["/movies", "/saved-movies"].includes(activePage.pathname)) {
      setHeaderActive(true);
      setFooterActive(true);
    } else if (activePage.pathname === "/profile") {
      setHeaderActive(true);
      setFooterActive(false);
    } else if (activePage.pathname === "/") {
      setHeaderActive(true);
      setFooterActive(true);
    } else {
      setHeaderActive(false);
      setFooterActive(false);
    }
  }, [activePage.pathname]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt && !loggedIn) {
      Auth.checkToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err);
          signOut();
        });
    }
  }, [signOut, loggedIn]);

  useEffect(() => {
    if (loggedIn && !userDataLoaded) {
      Promise.all([
        api.getUserInfoApi(localStorage.token),
        api.getSavedMovies(localStorage.token),
      ])
      .then(([user, savedList]) => {
        setCurrentUser(user);
        setSavedMovies(savedList);
        setUserDataLoaded(true);
      })
      .catch(err => {
        console.log(err);
        signOut();
      });
    }
  }, [loggedIn, userDataLoaded, signOut]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  function getWindowSize() {
    const { innerWidth } = window;
    return { innerWidth };
  }

  function handleClose() {
    setIsOpened(false);
  }

  function handleUpdateUser({ name, email }) {
    setIsUpdated(false);
    api.patchProfile({ name, email }, localStorage.token)
      .then((userData) => {
        setCurrentUser(userData);
        setInfoText("Успешно");
        setIsOpened(true);
      })
      .catch((err) => {
        console.log(err);
        setIsOpened(true);
        setInfoText("Произошла ошибка при обновлении профиля.");
      })
      .finally(() => setIsUpdated(true));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleMovieDelete(movie) {
    api.deleteMovieApi(movie._id, localStorage.token)
      .then(() => setSavedMovies(prevMovies => prevMovies.filter(i => i._id !== movie._id)))
      .catch(console.log);
  }

  function handleSave(movieCard) {
    const isSaved = savedMovies.some(i => i.movieId === movieCard.id);
    const savedMovie = savedMovies.find(i => i.movieId === movieCard.id);

    if (isSaved && savedMovie?._id) {
      api.changeSaveStatus(savedMovie, true, localStorage.token)
        .then(() => setSavedMovies(prevMovies => prevMovies.filter(i => i.movieId !== movieCard.id)))
        .catch(console.log);
    } else {
      api.changeSaveStatus(movieCard, false, localStorage.token)
        .then((res) => setSavedMovies(prevMovies => [res, ...prevMovies]))
        .catch(console.log);
    }
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        {isOpened && <Info text={infoText} onClose={handleClose} isOpen={isOpened} />}
        {isHeaderActive && <Header loggedIn={loggedIn} windowSize={windowSize.innerWidth} />}
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} savedMovies={savedMovies} handleSave={handleSave} handleMovieDelete={handleMovieDelete} loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} savedMovies={savedMovies} handleSave={handleSave} handleMovieDelete={handleMovieDelete} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} onUpdateUser={handleUpdateUser} onSignOut={signOut} isUpdated={isUpdated} loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Register handleLogin={handleLogin} loggedIn={loggedIn} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        {isFooterActive && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

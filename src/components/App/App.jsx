import "./App.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));

  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isFooterActive, setFooterActive] = useState(false);

  const [infoText, setInfoText] = useState("");

  const [isOpened, setIsOpened] = useState(false);
  
  const [isUpdated, setIsUpdated] = useState(true);

  const activePage = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (
        activePage.pathname === "/movies" ||
        activePage.pathname === "/saved-movies"
      ) {
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
    },
    [activePage, isFooterActive],
    [activePage, isHeaderActive]
  );

  useEffect(
    () => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        Auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              Promise.all([
                api.getUserInfoApi(localStorage.token),
                api.getSavedMovies(localStorage.token),
              ])
                .then(([user, savedList]) => {
                  setCurrentUser(user);
                  setSavedMovies(savedList);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => console.log(err));
      }
    },
    [navigate],
    [loggedIn]
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  function getWindowSize() {
    const { innerWidth } = window;
    return { innerWidth };
  }

  function handleClose() {
    setIsOpened(false);
  }

  function handleUpdateUser({ name, email }) {
    setIsUpdated(false);
    api
      .patchProfile({ name, email }, localStorage.token)
      .then((userData) => {
        setCurrentUser(userData);
        setInfoText("Успешно");
        setIsOpened(true);
      })
      .catch((err) => {
        console.log(err);
        setIsOpened(true);
        if (err === "Ошибка: 409") {
          setInfoText("Пользователь с таким email уже зарегистрирован.");
        } else if (err === "Ошибка: 500") {
          setInfoText("Проблемы на сервере. Повторите попытку позже.");
        } else if (err === "Ошибка: 400") {
          setInfoText("Неверно переданы данные");
        }
      })
      .finally(() => setIsUpdated(true));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function handleMovieDelete(movie) {
    api
      .deleteMovieApi(movie._id, localStorage.token)
      .then(() => {
        setSavedMovies((prevMovies) =>
          prevMovies.filter((i) => i._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSave(movieCard) {
    if (!savedMovies.some((i) => i.movieId === movieCard.id)) {
      api
        .changeSaveStatus(movieCard, false, localStorage.token)
        .then((res) => {
            setSavedMovies((prevMovies) => [res, ...prevMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const deletedMovie = savedMovies.find((i) => i.movieId === movieCard.id);
      if (deletedMovie && deletedMovie._id) {
        api
          .changeSaveStatus(deletedMovie, true, localStorage.token)
          .then(() => {
              setSavedMovies((prevMovies) =>
                prevMovies.filter((i) => i.movieId !== movieCard.id))
            })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        {isOpened && (
          <Info text={infoText} onClose={handleClose} isOpen={isOpened} />
        )}
        {isHeaderActive && (
          <Header loggedIn={loggedIn} windowSize={window.innerWidth} />
        )}
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                savedMovies={savedMovies}
                handleSave={handleSave}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                savedMovies={savedMovies}
                handleSave={handleSave}
                handleMovieDelete={handleMovieDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onSignOut={signOut}
                isUpdated={isUpdated}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register handleLogin={handleLogin} loggedIn={loggedIn} />}
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        {isFooterActive && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

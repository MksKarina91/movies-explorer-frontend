import React, { useEffect, useState, useCallback } from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {
  INITIAL_CARDS_SMALL,
  DISPLAY_WIDTH_SMALL,
  ROW_CARDS_MEDIUM,
  ROW_CARDS_LARGE,
  ROW_CARDS_EXTRA_LARGE,
  DISPLAY_WIDTH_LARGE,
  DISPLAY_WIDTH_MEDIUM,
  DISPLAY_WIDTH_EXTRA_LARGE,
  SHORT_MOVIE_DURATION,
  ADDITIONAL_CARDS_SMALL
} from "../../utils/constants";
import { getAllMovies } from "../../utils/MovieApi";

function Movies({ handleSave, savedMovies, handleMovieDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isToggleActive, setIsToggleActive] = useState(JSON.parse(localStorage.getItem("isToggleActive")) || false);
  const [searchError, setSearchError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [shownCards, setShownCards] = useState(0);

  const calculateInitialShownCards = useCallback(() => {
    if (window.innerWidth <= DISPLAY_WIDTH_SMALL) {
      return INITIAL_CARDS_SMALL;
    }
    else if (window.innerWidth > DISPLAY_WIDTH_SMALL && window.innerWidth < DISPLAY_WIDTH_MEDIUM) {
      return ROW_CARDS_MEDIUM * 4;
    }
    else if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM && window.innerWidth < DISPLAY_WIDTH_LARGE) {
      return ROW_CARDS_LARGE * 4;
    }
    else if (window.innerWidth >= DISPLAY_WIDTH_LARGE && window.innerWidth < DISPLAY_WIDTH_EXTRA_LARGE) {
      return ROW_CARDS_LARGE * 4;
    } 
    else {
      return ROW_CARDS_EXTRA_LARGE * 4;
    }
  }, []);
  

  useEffect(() => {
    setShownCards(calculateInitialShownCards);
  }, [calculateInitialShownCards]);

  useEffect(() => {
    const handleResize = () => {
      setShownCards(calculateInitialShownCards());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateInitialShownCards]);

  const requestFilmApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(res));
      setSearchError("");
    } catch (err) {
      console.log(err);
      setSearchError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterShortMovies = useCallback((arr) => {
    return arr.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }, []);

  const searchMovies = useCallback((arrMovies, query, isActive) => {
    let results = arrMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
    if (isActive) {
      results = filterShortMovies(results);
    }
    setFoundMovies(results);
    setShownMovies(results.slice(0, shownCards));
    setSearchError(results.length ? "" : "Ничего не найдено");
    localStorage.setItem("foundMovies", JSON.stringify(results));
    localStorage.setItem("searchQuery", query);
    localStorage.setItem("isToggleActive", JSON.stringify(isActive));
  }, [filterShortMovies, shownCards]);

  const handleSearchButton = useCallback(async (query, currentToggleState) => {
    setIsLoading(true);
    setShownCards(calculateInitialShownCards());
    let storedMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (storedMovies && storedMovies.length) {
      searchMovies(storedMovies, query, currentToggleState);
    } else {
      await requestFilmApi();
      storedMovies = JSON.parse(localStorage.getItem("allMovies"));
    }
    searchMovies(storedMovies, query, currentToggleState);
    setIsLoading(false);
  }, [requestFilmApi, searchMovies, calculateInitialShownCards]);
  
  function resetSearchResults() {
    setFoundMovies([]);
    setShownMovies([]);
  }

  const handleToggle = useCallback(() => {
    setIsToggleActive(prevState => {
      const newState = !prevState;
      localStorage.setItem("isToggleActive", JSON.stringify(newState));
      return newState;
    });
    if (searchQuery.trim()) {
      handleSearchButton(searchQuery, !isToggleActive);
    }
  }, [isToggleActive, searchQuery, handleSearchButton]);

  useEffect(() => {
    const savedFoundMovies = JSON.parse(localStorage.getItem("foundMovies"));
    const savedSearchQuery = localStorage.getItem("searchQuery");
    const isToggleActiveState = JSON.parse(localStorage.getItem("isToggleActive")) || false;
  
    if (savedFoundMovies && savedFoundMovies.length > 0) {
      setFoundMovies(savedFoundMovies);
      setShownMovies(savedFoundMovies.slice(0, shownCards));
      setSearchQuery(savedSearchQuery || "");
      setIsToggleActive(isToggleActiveState);
    } else {
      setFoundMovies([]);
      setShownMovies([]);
      setSearchQuery("");
      setIsToggleActive(false);
      setSearchError("");
    }
  }, [shownCards]);
  
  function handleMoreButton() {
    let additionalCardsCount;
    if (window.innerWidth <= DISPLAY_WIDTH_SMALL) {
      additionalCardsCount = ADDITIONAL_CARDS_SMALL;
    }
    else if (window.innerWidth > DISPLAY_WIDTH_SMALL && window.innerWidth < DISPLAY_WIDTH_MEDIUM) {
      additionalCardsCount = ADDITIONAL_CARDS_SMALL;
    }
    else if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM && window.innerWidth < DISPLAY_WIDTH_LARGE) {
      additionalCardsCount = ROW_CARDS_LARGE;
    }
    else if (window.innerWidth >= DISPLAY_WIDTH_LARGE && window.innerWidth < DISPLAY_WIDTH_EXTRA_LARGE) {
      additionalCardsCount = ROW_CARDS_LARGE;
    } 
    else {
      additionalCardsCount = ROW_CARDS_EXTRA_LARGE;
    }  
    setShownCards(prev => prev + additionalCardsCount);
  };  

  return (
  <main>
    <SearchForm
      handleSearchButton={handleSearchButton}
      isToggleActive={isToggleActive}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleToggle={handleToggle}
      setSearchError={setSearchError}
      resetSearchResults={resetSearchResults}
    />

    {isLoading && <Preloader />}
    {!isLoading && searchError && (
      <div className="movies-list__error">{searchError}</div>
    )}
    {!isLoading && !searchError && foundMovies.length === 0 && (
      <div className="error-container">
      <div className="movies-list__error">Ничего не найдено</div>
      </div>
    )}
    {!isLoading && foundMovies.length > 0 && (
      <MoviesCardList
        savedMovies={savedMovies}
        handleSave={handleSave}
        shownCards={shownCards}
        shownMovies={shownMovies}
        handleMovieDelete={handleMovieDelete}
      />
    )}
    {foundMovies.length > shownCards && (
      <section className="movies-list__more">
        <button type="button" className="movies-list__more-btn" onClick={handleMoreButton}>
          Ещё
        </button>
      </section>
    )}
  </main>
);

}

export default Movies;

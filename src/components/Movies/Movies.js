import React, { useEffect, useState, useCallback } from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import {
  DISPLAY_CARD_COUNTER_WIDTH_LESS_768,
  DISPLAY_CARD_COUNTER_WIDTH_MORE_768,
  DISPLAY_CARD_WIDTH_LARGE,
  DISPLAY_CARD_WIDTH_MEDIUM,
  DISPLAY_CARD_WIDTH_SMALL,
  DISPLAY_WIDTH_LARGE,
  DISPLAY_WIDTH_MEDIUM,
  SHORT_MOVIE_DURATION,
} from "../../utils/constants";
import { getAllMovies } from "../../utils/MovieApi";

function Movies({ handleSave, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isToggleActive, setIsToggleActive] = useState(JSON.parse(localStorage.getItem("isToggleActive")) || false);
  const [allMovies, setAllMovies] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
  
  const calculateInitialShownCards = () => {
    if (window.innerWidth >= DISPLAY_WIDTH_LARGE) {
      return DISPLAY_CARD_WIDTH_LARGE;
    } else if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM) {
      return DISPLAY_CARD_WIDTH_MEDIUM;
    } else {
      return DISPLAY_CARD_WIDTH_SMALL;
    }
  };
  const [shownCards, setShownCards] = useState(calculateInitialShownCards);

  const requestFilmApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllMovies();
      setAllMovies(res);
      localStorage.setItem("allMovies", JSON.stringify(res));
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

  const searchMovies = useCallback((arrMovies, searchQuery, isToggleActive) => {
    let results = arrMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (isToggleActive) {
      results = filterShortMovies(results);
    }
    setFoundMovies(results);
    setShownMovies(results);
    setSearchError(results.length ? "" : "Ничего не найдено");
    localStorage.setItem("foundMovies", JSON.stringify(results));
  }, [filterShortMovies]);

  const handleSearchButton = useCallback((searchQuery, currentToggleState) => {
    setShownCards(calculateInitialShownCards());
    
    if (!searchQuery.trim()) {
        setFoundMovies([]);
        setShownMovies([]);
        setSearchError('');
        return;
    }

    const storedMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (storedMovies && storedMovies.length) {
      searchMovies(storedMovies, searchQuery, currentToggleState);
    } else {
      requestFilmApi().then(() => {
        searchMovies(allMovies, searchQuery, currentToggleState);
      });
    }
  }, [allMovies, requestFilmApi, searchMovies]);


  useEffect(() => {
    setIsToggleActive(prevState => !prevState);
  }, []);

  useEffect(() => {
    localStorage.setItem("isToggleActive", isToggleActive);
    handleSearchButton(searchQuery, isToggleActive);
  }, [isToggleActive, handleSearchButton, searchQuery]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setShownCards(calculateInitialShownCards());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMoreButton() {
    const additionalCardsCount = window.innerWidth > DISPLAY_WIDTH_MEDIUM ? DISPLAY_CARD_COUNTER_WIDTH_MORE_768 : DISPLAY_CARD_COUNTER_WIDTH_LESS_768;
    setShownCards(prev => prev + additionalCardsCount);
  }

  return (
    <main>
      <SearchForm
        handleSearchButton={handleSearchButton}
        filterShortMovies={filterShortMovies}
        isToggleActive={isToggleActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allMovies={allMovies}
        handleToggle={() => setIsToggleActive(!isToggleActive)}
        setSearchError={setSearchError}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        savedMovies={savedMovies}
        handleSave={handleSave}
        searchError={searchError}
        shownCards={shownCards}
        shownMovies={shownMovies}
      />
      {foundMovies.length > 0 && foundMovies.length > shownCards && (
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

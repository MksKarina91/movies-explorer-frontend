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
  const [isToggleActive, setIsToggleActive] = useState(localStorage.getItem("isToggleActive") === "true");
  const [allMovies, setAllMovies] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [shownMovies, setShownMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [shownCards, setShownCards] = useState(DISPLAY_CARD_WIDTH_LARGE);

  const requestFilmApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllMovies();
      setAllMovies(res);
      localStorage.setItem("allMovies", JSON.stringify(res));
      return res;
    } catch (err) {
      console.log(err);
      setSearchError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      throw err;
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
    const storedMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (!storedMovies || !storedMovies.length) {
      requestFilmApi().then(() => {
        searchMovies(allMovies, searchQuery, currentToggleState);
      });
    } else {
      searchMovies(storedMovies, searchQuery, currentToggleState);
    }
  }, [allMovies, requestFilmApi, searchMovies]);

  useEffect(() => {
    const currentToggleValue = localStorage.getItem("isToggleActive") === "true";
    const currentQueryValue = localStorage.getItem("searchQuery");
    setIsToggleActive(currentToggleValue);
    setSearchQuery(currentQueryValue || "");
    if (currentQueryValue) {
      handleSearchButton(currentQueryValue, currentToggleValue);
    }
  }, [handleSearchButton]);

  useEffect(() => {
    localStorage.setItem("isToggleActive", isToggleActive);
    if (isToggleActive) {
      setShownMovies(filterShortMovies(foundMovies));
    } else {
      setShownMovies(foundMovies);
    }
  }, [isToggleActive, filterShortMovies, foundMovies]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [foundMovies]);

  useEffect(() => {
    function updateDisplayedCard() {
      if (window.innerWidth >= DISPLAY_WIDTH_LARGE) {
        setShownCards(DISPLAY_CARD_WIDTH_LARGE);
      } else if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM) {
        setShownCards(DISPLAY_CARD_WIDTH_MEDIUM);
      } else {
        setShownCards(DISPLAY_CARD_WIDTH_SMALL);
      }
    }
    window.addEventListener("resize", updateDisplayedCard);
    return () => {
      window.removeEventListener("resize", updateDisplayedCard);
    };
  }, []);

  function handleMoreButton() {
    if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM) {
      setShownCards((prev) => prev + DISPLAY_CARD_COUNTER_WIDTH_MORE_768);
    } else {
      setShownCards((prev) => prev + DISPLAY_CARD_COUNTER_WIDTH_LESS_768);
    }
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

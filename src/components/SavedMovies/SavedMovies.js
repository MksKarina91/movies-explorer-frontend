import React, { useState, useCallback, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, handleSave, handleMovieDelete }) {
  const [searchError, setSearchError] = useState("");
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [localQuery, setLocalQuery] = useState("");
  const [hasSearchBeenPerformed, setHasSearchBeenPerformed] = useState(false);

  const filterShortMovies = useCallback((arrayMovies) => {
    return arrayMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }, []);

  const searchSavedMovies = useCallback((query, isActive) => {
    let queryString = String(query);
    let results = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(queryString.toLowerCase()) || movie.nameEN.toLowerCase().includes(queryString.toLowerCase())
    );
    if (isActive) {
      results = filterShortMovies(results);
    }
    setFilteredSavedMovies(results);
    setHasSearchBeenPerformed(true);
    if (results.length) {
      setSearchError("");
    } else {
      setSearchError("Ничего не найдено");
    }
  }, [savedMovies, filterShortMovies]);

  const handleToggle = () => {
    setIsToggleActive((prev) => {
      const newIsActive = !prev;
      handleSearchButton(localQuery, newIsActive);
      return newIsActive;
    });
  };

  const handleSearchButton = (query, isActive) => {
    if (query.trim()) {
      setLocalQuery(query);
      searchSavedMovies(query, isActive);
      setHasSearchBeenPerformed(true);
    } else {
      setFilteredSavedMovies([]);
      setSearchError("");
      setHasSearchBeenPerformed(false);
    }
  };

  useEffect(() => {
    const refilterMovies = () => {
      if (localQuery.trim()) {
        let results = savedMovies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(localQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(localQuery.toLowerCase())
        );
        if (isToggleActive) {
          results = filterShortMovies(results);
        }
        setFilteredSavedMovies(results);
        if (!results.length) {
          setSearchError("Ничего не найдено");
        }
      } else {
        setFilteredSavedMovies([]);
        setSearchError("");
      }
    };
  
    if (hasSearchBeenPerformed) {
      refilterMovies();
    }
  }, [savedMovies, localQuery, isToggleActive, filterShortMovies, hasSearchBeenPerformed]);
  
  

  return (
    <main>
      <SearchForm
        handleSearchButton={handleSearchButton}
        isToggleActive={isToggleActive}
        handleToggle={handleToggle}
        setSearchQuery={setLocalQuery}
        searchQuery={localQuery}
        setSearchError={setSearchError}
      />
      {hasSearchBeenPerformed && (
        <MoviesCardList
          handleSave={handleSave}
          savedMovies={filteredSavedMovies}
          searchError={searchError}
          handleMovieDelete={handleMovieDelete}
        />
      )}
    </main>
  );
}

export default SavedMovies;

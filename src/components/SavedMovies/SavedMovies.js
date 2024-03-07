import React, { useState, useEffect, useCallback } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, handleSave, handleMovieDelete }) {
  const [searchError, setSearchError] = useState("");
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [localQuery, setLocalQuery] = useState("");

  const filterShortMovies = useCallback((arrayMovies) => {
    return arrayMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }, []);

  const searchSavedMovies = useCallback((query, isActive) => {
    let results = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
    if (isActive) {
      results = filterShortMovies(results);
    }
    setFilteredSavedMovies(results);
    if (results.length) {
      setSearchError("");
    } else {
      setSearchError("Ничего не найдено");
    }
  }, [savedMovies, filterShortMovies]);

  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
    searchSavedMovies(localQuery, isToggleActive);
  }, [savedMovies, localQuery, isToggleActive, searchSavedMovies]);

  const handleToggle = () => {
    setIsToggleActive((prev) => !prev);
  };

  useEffect(() => {
    searchSavedMovies(localQuery, isToggleActive);
  }, [isToggleActive, localQuery, searchSavedMovies]);

  const handleSearchButton = (query, isActive) => {
    setLocalQuery(query);
    searchSavedMovies(query, isActive);
  };

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
      <MoviesCardList
        handleSave={handleSave}
        savedMovies={filteredSavedMovies}
        searchError={searchError}
        handleMovieDelete={handleMovieDelete}
      />
    </main>
  );
}

export default SavedMovies;

import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({
  handleSearchButton,
  searchQuery,
  setSearchQuery,
  handleToggle,
  isToggleActive,
  setSearchError,
  resetSearchResults
}) {
  const location = useLocation();
  const [isErr, setIsErr] = useState(false);
  

  useEffect(() => {
    if (localStorage.getItem("searchQuery") && location.pathname === "/movies") {
      const newQuery = localStorage.getItem("searchQuery");
      setSearchQuery(newQuery);
    }
  }, [location, setSearchQuery]);

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) {
      localStorage.removeItem("foundMovies");
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("isToggleActive");
      setSearchError("Ничего не найдено");
      setSearchQuery("");
      resetSearchResults();
      setIsErr(true);
      return;
    }
  
    setIsErr(false);
    handleSearchButton(searchQuery, isToggleActive);
  }  

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="search-form"
        onSubmit={handleSearch}
      >
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          maxLength="60"
          value={searchQuery || ""}
          onChange={(e) => {
            setIsErr(false);
            setSearchQuery(e.target.value);
          }}
        />
        <button
          className="search-form__submit-btn"
          type="submit"
        >
          Найти
        </button>
        <FilterCheckbox handleToggle={handleToggle} isToggleActive={isToggleActive}/>
        {isErr && (
          <div className="search-form__error">
            {"Нужно ввести ключевое слово"}
          </div>
        )}
      </form>
      <div className="search-form__bottom-line"></div>
    </section>
  );
}

export default SearchForm;

import React, { useState } from 'react';
import './MoviesCardList.css';
import filmsArray from '../../utils/filmsArray';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';

function MoviesCardList({ name }) {
  const [visibleCards] = useState(16);

  return (
    <main className='main'>
      <SearchForm name={name} />
      <section className={`card-list ${name === 'saved-movies' && window.innerWidth <= 768 ? 'card-list__height-increase' : ''}`}>
        <div className='card-list__cards-container'>
          {name === 'movies'
            ? filmsArray.slice(0, visibleCards).map((film, index) => <MoviesCard film={film} pageName={name} key={index} />)
            : name === 'saved-movies'
            ? filmsArray.slice(0, 3).map((film, index) => <MoviesCard film={film} pageName={name} key={index} />)
            : null}
        </div>
        {name === 'movies' && (
          <button className='card-list__add-button' type='button' aria-label='Ещё.'>
            Ещё
          </button>
        )}
      </section>
    </main>
  );
}

export default MoviesCardList;

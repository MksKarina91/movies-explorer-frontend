import './SearchForm.css';
import loupe from '../../images/loupe.svg';

function SearchForm({ name }) {
  return (
    <section className='search-form'>
      <form className='search-form__form' name={name}>
        <fieldset className='search-form__fieldset'>
          <img className='search-form__loupe' src={loupe} alt='Лупа' />
          <div className='search-form__search-container'>
            <input className='search-form__input-search' type='text' placeholder='Фильм' required />
            <button className='search-form__button'>Найти</button>
          </div>
          <div className='search-form__container-checkbox'>
            <input className='search-form__checkbox' type='checkbox' id='check' />
            <label className='search-form__switch' htmlFor='check'></label>
            <label className='search-form__label' htmlFor='check'>
              Короткометражки
            </label>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;

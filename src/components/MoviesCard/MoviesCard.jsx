import './MoviesCard.css';

function MoviesCard({ film, pageName }) {
  const { image, name, time } = film;

  return (
    <article className='card'>
      <img className='card__image' src={image} alt={name} />
      <div className='card__container'>
        <h2 className='card__name'>{name}</h2>
        <button
          className={`card__button ${pageName === 'movies' ? 'card__button_type_like' : 'card__button_type_delete'}`}
          type='button'
          aria-label='Нравится.'
        />
      </div>
      <time className='card__time'>{time}</time>
    </article>
  );
}

export default MoviesCard;

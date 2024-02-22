import './Menu.css';
import { Link } from 'react-router-dom';

function Menu({ isMenuOpen, onClose }) {
  return (
    <aside className={`aside ${isMenuOpen ? 'aside_opened' : ''}`}>
      <div className='aside__container'>
        <button className='aside__close-button' type='button' aria-label='Меню.' onClick={onClose} />
        <nav className='aside__navigation'>
          <ul className='aside__unordered-list'>
            <div className='aside__unordered-list-container'>
              <li className='aside__list-item'>
                <Link className='aside__link' to='/' onClick={onClose}>
                  Главная
                </Link>
              </li>
              <li className='aside__list-item'>
                <Link className='aside__link' to='/movies' onClick={onClose}>
                  Фильмы
                </Link>
              </li>
              <li className='aside__list-item'>
                <Link className='aside__link' to='/saved-movies' onClick={onClose}>
                  Сохранённые фильмы
                </Link>
              </li>
            </div>
            <li className='aside__list-item aside__profile-list-item'>
              <Link className='aside__profile-link' to='/profile' onClick={onClose}>
                Аккаунт
                <div className='aside__link-icon'></div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;

import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <nav className='navigation-auth'>
          <ul className='navigation-auth__authorized'>
            <div className='navigation-auth__links-container'>
              <li className='navigation-auth__list-item'>
                <Link className='navigation-auth__link' to='/movies'>
                  Фильмы
                </Link>
              </li>
              <li className='navigation-auth__list-item'>
                <Link className='navigation-auth__link' to='/saved-movies'>
                  Сохранённые фильмы
                </Link>
              </li>
            </div>
            <li className='navigation-auth__list-item'>
              <Link className='navigation-auth__profile-link' to='/profile'>
                Аккаунт
                <div className='navigation-auth__link-icon'></div>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className='navigation-unauth'>
          <ul className='navigation-unauth__unauthorized'>
            <li className='navigation-auth__list-item'>
              <Link className='navigation-unauth__link' to='/signup'>
                Регистрация
              </Link>
            </li>
            <li className='navigation-auth__list-item'>
              <Link className='navigation-unauth__link-fat' to='/signin'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;

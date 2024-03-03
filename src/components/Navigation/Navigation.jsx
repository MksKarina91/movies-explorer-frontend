import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ loggedIn }) {
  const location = useLocation();

  // Функция для определения класса на основе текущего пути
  const getIconClassName = () => {
    return location.pathname === '/' ? 'navigation-auth__link-icon--home' : 'navigation-auth__link-icon--other';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {loggedIn ? (
        <nav className='navigation-auth'>
         <ul className='navigation-auth__authorized'>
            <li className='navigation-auth__list-item'>
              <div className='navigation-auth__links-container'>
                 <Link
                  className={`navigation-auth__link ${isActive('/movies') ? 'navigation-auth__link--active' : ''}`}
                  to='/movies'
                >
                  Фильмы
                </Link>
                <Link
                  className={`navigation-auth__link ${isActive('/saved-movies') ? 'navigation-auth__link--active' : ''}`}
                  to='/saved-movies'
                >
                  Сохранённые фильмы
                </Link>
            </div>
            </li>
            <li className='navigation-auth__list-item'>
            <Link
                className={`navigation-auth__profile-link ${isActive('/profile') ? 'navigation-auth__link--active' : ''}`}
                to='/profile'
              >
                Аккаунт
                <div className={`navigation-auth__link-icon ${getIconClassName()}`}></div>
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

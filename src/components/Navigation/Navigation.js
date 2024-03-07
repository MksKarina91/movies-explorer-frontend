import { React } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import './Navigation.css';

function Navigation({ loggedIn }) {
  const location = useLocation();

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
                 <NavLink
                  className={`navigation-auth__link ${isActive('/movies') ? 'navigation-auth__link--active' : ''}`}
                  to='/movies'
                >
                  Фильмы
                </NavLink>
                <NavLink
                  className={`navigation-auth__link ${isActive('/saved-movies') ? 'navigation-auth__link--active' : ''}`}
                  to='/saved-movies'
                >
                  Сохранённые фильмы
                </NavLink>
            </div>
            </li>
            <li className='navigation-auth__list-item'>
            <NavLink
                className={`navigation-auth__profile-link ${isActive('/profile') ? 'navigation-auth__link--active' : ''}`}
                to='/profile'
              >
                Аккаунт
                <div className={`navigation-auth__link-icon ${getIconClassName()}`}></div>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className='navigation-unauth'>
          <ul className='navigation-unauth__unauthorized'>
            <li className='navigation-auth__list-item'>
              <NavLink className='navigation-unauth__link' to='/signup'>
                Регистрация
              </NavLink>
            </li>
            <li className='navigation-auth__list-item'>
              <NavLink className='navigation-unauth__link-fat' to='/signin'>
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;

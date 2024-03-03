import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';

function Header({ loggedIn, isMenuOpen, onMenuClick, onMenuClose }) {
  const location = useLocation().pathname;

  return (
    <header className={`header ${location === '/' && 'header_color_dark-blue'}`}>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта.' />
      </Link>
      <Navigation loggedIn={loggedIn} />
      {loggedIn ? <button className='header__menu-button' type='button' aria-label='Меню.' onClick={onMenuClick} /> : null}
      <Menu loggedIn={loggedIn} isMenuOpen={isMenuOpen} onClose={onMenuClose} />
    </header>
  );
}

export default Header;

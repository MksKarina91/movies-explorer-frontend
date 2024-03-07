import { React } from "react";

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { NavLink, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';

function Header({ loggedIn, windowSize }) {
  const location = useLocation().pathname;

  return (
    <header className={`header ${location === '/' && 'header_color_dark-blue'}`}>
      <div className="header__container">
      <NavLink to='/'>
        <img className='header__logo' src={logo} alt='Логотип сайта.' />
      </NavLink>
      {
       (windowSize <= 768 && loggedIn) ?
        <Menu></Menu>
        :
        <Navigation loggedIn={loggedIn}/>
       }
       </div>
    </header>
  );
}

export default Header;

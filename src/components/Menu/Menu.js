import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const burgerMenuClassName = `burger-menu ${isOpen && 'burger-menu_opened'}`;
    const burgerMenuLinkClassName = ({ isActive }) => 
        `burger-menu__link ${isActive ? 'burger-menu__link_active' : ''}`;

    return (
        <>
            <button type="button" className="burger-menu__btn" onClick={() => setIsOpen(!isOpen)}/>
            <section className={burgerMenuClassName}>
                <div className="burger-menu__container">
                    <button onClick={() => setIsOpen(false)} className="burger-menu__close-icon"></button>
                    <div className="burger-menu__body">
                        <nav className="burger-menu__links">
                            <NavLink to="/" className={burgerMenuLinkClassName}>Главная</NavLink>
                            <NavLink to="/movies" className={burgerMenuLinkClassName}>Фильмы</NavLink>
                            <NavLink to="/saved-movies" className={burgerMenuLinkClassName}>Сохраненные фильмы</NavLink>
                        </nav>
                        <NavLink to="/profile" className="burger-menu__profile">
                            <p className="burger-menu__profile-text">Аккаунт</p>
                            <div className="burger-menu__profile-icon"></div>
                        </NavLink>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Menu;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo/logo.svg';
import closeIcon from '../images/logo/closeIcon.svg';

function Header({ email, isLoggedIn, onLogout }) {
  const { pathname } = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsBurgerOpen(false);
  };

  const handleBurgerToggle = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <header className="header">
      {!isBurgerOpen && <img src={logo} alt="Logo" className="header__logo" />}
      {isLoggedIn && (
        <>
          {isBurgerOpen && email && (
            <div className="header__user-info">
              <div className="header__info-line">
                <span className="header__email header__email-burger">{email}</span>
                <Link to="/" className="header__nav-link header__exit" onClick={handleLogout}>
                  Выйти
                </Link>
              </div>
              <img src={logo} alt="Logo" className="header__logo" />
            </div>
          )}
          <div className={`burger__menu ${isBurgerOpen ? 'burger__menu-open' : ''}`}>
            <button className="burger__menu-toggle" onClick={handleBurgerToggle}>
              {isBurgerOpen ? (
                <img
                  src={closeIcon}
                  alt="Cross"
                  className="popup__close-icon popup__burger-close-icon"
                />
              ) : (
                <>
                  <span className="burger__menu-toggle-line"></span>
                  <span className="burger__menu-toggle-line"></span>
                  <span className="burger__menu-toggle-line"></span>
                </>
              )}
            </button>
          </div>
        </>
      )}
      <nav className="header__nav ">
        <ul className="header__nav-list">
          {pathname === '/sign-in' && (
            <li className="header__nav-item">
              <Link to="/sign-up" className="header__nav-link">
                Регистрация
              </Link>
            </li>
          )}
          {pathname === '/sign-up' && (
            <li className="header__nav-item">
              <Link to="/sign-in" className="header__nav-link">
                Войти
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <div className="header__nav-burger">
              <li className="header__nav-item">
                <span className="header__email">{email}</span>
                <Link to="/" className="header__nav-link header__exit" onClick={handleLogout}>
                  Выйти
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

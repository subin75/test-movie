import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Header.css';

function Header() {
  return (
    <header className="header">
      <a href="/" className="logo">YFLIX</a>
      <nav className="nav">
        <NavLink exact="true" to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => isActive ? 'active' : ''}>
          Movies
        </NavLink>
        <NavLink to="/tv" className={({ isActive }) => isActive ? 'active' : ''}>
          TV Series
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
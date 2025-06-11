import React from 'react';
import { Link } from 'react-router';
import '../../styles/Navbar.css';
import { useAuth } from '../../hooks/context/authContext';

export const Navbar = () => {
  // Aquí podrías obtener el nombre de usuario del contexto o estado global
  const { user, logout } = useAuth();

  return (
    <nav className="sticky navbar">
      <div className="brand  display__logo">
        <a className="nav__link">{user.name}</a>
      </div>
      <input type="checkbox" id="nav" className="hidden" />
      <label className="nav__open"><i></i><i></i><i></i></label>
      <div className="nav">
        <ul className="nav__items">
          <Link className="nav__item" to={"/profile"}>
            <button className="nav__button">
              <span>Perfil</span>
            </button>
          </Link>
          <div className="button-wrap">
            <button className="nav__button" onClick={logout}>
              <span>Logout</span>
            </button>
            <div className="button-shadow"></div>
          </div>
        </ul>
      </div>
    </nav>
  )
}

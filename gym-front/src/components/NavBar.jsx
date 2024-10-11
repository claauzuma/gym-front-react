import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">ZUMA FIT</div>
        <button
          className="block md:hidden text-white focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div className="hidden md:flex md:items-center space-x-6" id="navbarNav">
          <NavLink
            to="/"
            className="text-white hover:text-gray-200 transition"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/servicios"
            className="text-white hover:text-gray-200 transition"
          >
            Servicios
          </NavLink>
          <NavLink
            to="/login"
            className="text-white hover:text-gray-200 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/logout"
            className="text-white hover:text-gray-200 transition"
          >
            Cerrar Sesión
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

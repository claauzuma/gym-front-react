import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfesoresNavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Profesor Dashboard</div>
        <button
          className="block md:hidden text-white focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAdmin"
          aria-controls="navbarAdmin"
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
        <div className="hidden md:flex md:items-center space-x-6" id="navbarAdmin">
          <NavLink to="/profesores" className="text-white hover:text-gray-400 transition">
            Inicio
          </NavLink>
          <NavLink to="/profesores/alumnos" className="text-white hover:text-gray-400 transition">
            Alumnos
          </NavLink>
          <NavLink to="/profesores/rutinas" className="text-white hover:text-gray-400 transition">
            Rutinas
          </NavLink>
          <NavLink to="/profesores/clases" className="text-white hover:text-gray-400 transition">
            Mis clases
          </NavLink>
          <NavLink to="/profesores/perfil" className="text-white hover:text-gray-400 transition">
            Perfil
          </NavLink>
          <NavLink to="/logout" className="text-white hover:text-gray-400 transition">
            Cerrar Sesión
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default ProfesoresNavBar;

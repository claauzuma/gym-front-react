import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Admin Dashboard</div>
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
          <NavLink to="/admin" className="text-white hover:text-gray-400 transition">
            Inicio
          </NavLink>
          <NavLink to="/admin/profesores" className="text-white hover:text-gray-400 transition">
            Profesores
          </NavLink>
          <NavLink to="/alumnos" className="text-white hover:text-gray-400 transition">
            Alumnos
          </NavLink>
          <NavLink to="/clases" className="text-white hover:text-gray-400 transition">
            Clases
          </NavLink>
          <NavLink to="/rutinas" className="text-white hover:text-gray-400 transition">
            Rutinas
          </NavLink>
          <NavLink to="/reportes" className="text-white hover:text-gray-400 transition">
            Reportes
          </NavLink>
          <NavLink to="/monitoreo" className="text-white hover:text-gray-400 transition">
            Monitoreo
          </NavLink>
          <NavLink to="/logout" className="text-white hover:text-gray-400 transition">
            Cerrar Sesión
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;

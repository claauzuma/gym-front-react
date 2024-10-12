import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar el colapso del menú

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Admin Dashboard</div>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)} // Toggle del menú
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

        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex md:items-center space-x-6">
          <NavLink to="/admin" className="text-white hover:text-gray-400 transition">
            Inicio
          </NavLink>
          <NavLink to="/admin/profesores" className="text-white hover:text-gray-400 transition">
            Profesores
          </NavLink>
          <NavLink to="/admin/alumnos" className="text-white hover:text-gray-400 transition">
            Alumnos
          </NavLink>
          <NavLink to="/admin/clases" className="text-white hover:text-gray-400 transition">
            Clases
          </NavLink>
          <NavLink to="/admin/rutinas" className="text-white hover:text-gray-400 transition">
            Rutinas
          </NavLink>
          <NavLink to="/admin/pagos" className="text-white hover:text-gray-400 transition">
            Pagos
          </NavLink>
          <NavLink to="/admin/asistencia" className="text-white hover:text-gray-400 transition">
            Asistencia
          </NavLink>
          <NavLink to="/admin/reservas" className="text-white hover:text-gray-400 transition">
            Reservas
          </NavLink>
          <NavLink to="/logout" className="text-white hover:text-gray-400 transition">
            Cerrar Sesión
          </NavLink>
        </div>

        {/* Menú colapsado para pantallas pequeñas */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden w-full mt-4 space-y-4`}>
          <NavLink to="/admin" className="block text-white hover:text-gray-400 transition">
            Inicio
          </NavLink>
          <NavLink to="/admin/profesores" className="block text-white hover:text-gray-400 transition">
            Profesores
          </NavLink>
          <NavLink to="/admin/alumnos" className="block text-white hover:text-gray-400 transition">
            Alumnos
          </NavLink>
          <NavLink to="/admin/clases" className="block text-white hover:text-gray-400 transition">
            Clases
          </NavLink>
          <NavLink to="/admin/rutinas" className="block text-white hover:text-gray-400 transition">
            Rutinas
          </NavLink>
          <NavLink to="/reportes" className="block text-white hover:text-gray-400 transition">
            Reportes
          </NavLink>
          <NavLink to="/monitoreo" className="block text-white hover:text-gray-400 transition">
            Monitoreo
          </NavLink>
          <NavLink to="/logout" className="block text-white hover:text-gray-400 transition">
            Cerrar Sesión
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;

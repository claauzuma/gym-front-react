import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from 'axios';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate(); 
  const params = useParams();

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/usuarios/alumnos'); 
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlumnos();
  }, []);

  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (alumno) => {

    const confirmDelete = window.confirm(`¿Estás seguro que deseas eliminar al alumno ${alumno.nombre}?`);
    
    if (confirmDelete) {
      console.log("Eliminamos al alumno " + alumno.nombre);
      try {
        const response = await axios.delete(`http://localhost:8080/api/usuarios/${alumno._id}`);
        console.log("alumno eliminado correctamente:", response.data);
        
        // Actualizar el estado de alumnos eliminando el alumno borrado
        setAlumnos(prevAlumnos => prevAlumnos.filter(p => p._id !== alumno._id));
        
      } catch (error) {
        console.log("Error eliminando al alumno", error);
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };
  const handleDetail = (alumno) => {
    console.log("Vemos el detalle " + alumno.nombre);
  };

  const handleEdit = (alumno) => {
    console.log("Vamos a editar al alumno " + alumno.nombre);
    navigate(`/admin/agregar-alumno/${alumno._id}`);
  };

  const handleAddClick = () => {
    navigate("/admin/agregar-alumno"); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <>
      <AdminNavBar />
      <h1 className="text-4xl font-bold text-center my-4">Alumnos</h1>
      <div className="container mx-auto p-2 sm:p-4">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Buscar alumno..."
              className="border p-2 rounded-lg w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
            onClick={handleAddClick}
          >
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">DNI</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Plan</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pago</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vencimiento</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
  {filteredAlumnos.map((alumno) => {
    const estadoH = new Date(alumno.vencimiento) >= new Date() ? "Habilitado" : "No habilitado"; // Determinar el estado
    return (
      <tr 
        key={alumno.dni} 
        className={`bg-gray-50 hover:bg-gray-100 
          ${estadoH === "No habilitado" ? 'bg-pink-200' : ''} 
          ${estadoH === "Habilitado" ? 'bg-green-200' : ''}`} // Clase para habilitado
      >
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{alumno.nombre} {alumno.apellido}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{alumno.dni}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{alumno.email}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{alumno.plan}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{alumno.pago}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{estadoH}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">{new Date(alumno.vencimiento).toLocaleDateString()}</td>
        <td className="px-4 sm:px-6 py-2 whitespace-nowrap">
          {estadoH === "No habilitado" &&  
            <button onClick={() => { handleDetail(alumno) }} className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded-lg mr-2 hover:bg-green-600">Renovar</button>
          }
          <button onClick={() => { handleDetail(alumno) }} className="bg-green-500 text-white px-2 sm:px-4 py-2 rounded-lg mr-2 hover:bg-green-600">Detalle</button>
          <button onClick={() => { handleEdit(alumno) }} className="bg-blue-500 text-white px-2 sm:px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Editar</button>
          <button onClick={() => { handleDelete(alumno) }} className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-red-600">Eliminar</button>
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alumnos;

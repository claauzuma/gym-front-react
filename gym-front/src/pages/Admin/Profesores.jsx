import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from 'axios';


const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate(); 
  const params = useParams();

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/usuarios/profesores'); 
        const data = await response.json();
        setProfesores(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfesores();
  }, []);

  const filteredProfesores = profesores.filter(profesor =>
    profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profesor.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (profesor)=> {
    console.log("Eliminamos al profesor " + profesor.nombre)
    try {
        const response = await axios.delete(`http://localhost:8080/api/usuarios/${profesor._id}`);
        console.log("Profesor eliminado correctamente:", response.data);
        setProfesores(prevProfesores => prevProfesores.filter(p => p._id !== profesor._id));

    } catch(error) {
        console.log("Error eliminando al profesor")
    }
  }

  const handleDetail = (profesor)=> {
    console.log("Vemos el detalle " + profesor.nombre)
  }

  const handleEdit = (profesor)=> {
    console.log("Vamos a editar al profesor" + profesor.nombre)
    navigate(`/admin/agregar-profesor/${profesor._id}`)
  }


  const handleAddClick = () => {
    navigate("/admin/agregar-profesor"); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario sea enviado
  };

  return (
    <>
      <AdminNavBar />
      <div className="container mx-auto p-4">
 
        <div className="flex justify-between items-center mb-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Buscar profesor..."
              className="border p-2 rounded-lg w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
            />
          </form>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
            onClick={handleAddClick} // Navega al componente ProfesFormPage
          >
            Agregar
          </button>
        </div>

        {/* Contenedor para hacer scroll horizontal en dispositivos móviles */}
        <div className="overflow-x-auto">
          <div className="shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Apellido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">DNI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfesores.map((profesor) => (
                  <tr key={profesor.dni} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-2 whitespace-nowrap">{profesor.nombre}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{profesor.apellido}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{profesor.dni}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{profesor.email}</td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <button onClick= { ()=> { handleDetail(profesor) }} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600">Detalle</button>
                      <button onClick= { ()=> { handleEdit(profesor) }}className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Editar</button>
                      <button onClick= { ()=> { handleDelete(profesor) }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profesores;

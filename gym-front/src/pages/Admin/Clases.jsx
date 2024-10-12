import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from 'axios';


const Clases = () => {
  const [clases, setClases] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate(); 
  const params = useParams();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clases'); 
        const data = await response.json();
        setClases(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClases();
  }, []);

  const filteredClases = clases.filter(clase =>
    clase.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (clase)=> {
    console.log("Eliminamos la clase " + clase.nombre)
    try {
        const response = await axios.delete(`http://localhost:8080/api/clases/${clase._id}`);
        console.log("Clase eliminada correctamente:", response.data);
        setClases(prevClases => prevClases.filter(c => c._id !== clase._id));

    } catch(error) {
        console.log("Error eliminando la clase")
    }
  }

  const handleDetail = (clase)=> {
    console.log("Vemos el detalle " + clase.descripcion)
    navigate(`/admin/clase-detail/${clase._id}`); 

  }

  const handleEdit = (clase)=> {
    console.log("Vamos a editar la clase " + clase.descripcion)
    navigate(`/admin/form-clase/${clase._id}`)
  }


  const handleAddClick = () => {
    navigate("/admin/form-clase"); 
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
              placeholder="Buscar clase..."
              className="border p-2 rounded-lg w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
            />
          </form>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
            onClick={handleAddClick} // Navega al componente ClaseFormPage
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Horario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Profesor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Capacidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Disponibilidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClases.map((clase) => (
                  <tr key={clase._id} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-2 whitespace-nowrap">{clase.descripcion}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.horaArranque} a {clase.horaFinalizacion} </td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.nombreProfesor}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.capacidad}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.capacidad - clase.anotados}</td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <button onClick= { ()=> { handleDetail(clase) }} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600">Detalle</button>
                      <button onClick= { ()=> { handleEdit(clase) }}className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Editar</button>
                      <button onClick= { ()=> { handleDelete(clase) }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Eliminar</button>
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

export default Clases;

import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from 'axios';


const Rutinas = () => {
  const [rutinas, setRutinas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate(); 
  const params = useParams();

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        console.log("Intentamos fetchear rutinas");
        const response = await fetch('http://localhost:8080/api/rutinas'); 
        const data = await response.json();
        setRutinas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRutinas();
  }, []);

  const filteredRutinas = rutinas.filter(rutina =>
    (rutina.descripcion && rutina.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleDelete = async (rutina) => {
    console.log("Eliminamos la rutina " + rutina.nombre)
    try {
        const response = await axios.delete(`http://localhost:8080/api/rutinas/${rutina._id}`);
        console.log("Rutina eliminada correctamente:", response.data);
        setRutinas(prevRutinas => prevRutinas.filter(r => r._id !== rutina._id));

    } catch (error) {
        console.log("Error eliminando la rutina")
    }
  }

  const handleDetail = (rutina) => {
    console.log("Vemos el detalle " + rutina.nombre);
  }

  const handleEdit = (rutina) => {
    console.log("Vamos a editar la rutina " + rutina.nombre);
    navigate(`/admin/agregar-rutina/${rutina._id}`);
  }

  const handleAddClick = () => {
    navigate("/admin/agregar-rutina"); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <>
      <AdminNavBar />
      <div className="container mx-auto p-4">

        <div className="flex justify-between items-center mb-4">
          <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar rutina..."
              className="border p-2 rounded-lg w-full md:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Contenedor para hacer scroll horizontal en dispositivos móviles */}
        <div className="overflow-x-auto">
          <div className="shadow-lg rounded-lg">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b">Nivel</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b">Alumno</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b">Dni</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRutinas.map((rutina) => (
                  <tr key={rutina._id} className="bg-gray-50 hover:bg-gray-100 border-b">
                    <td className="px-6 py-2 whitespace-nowrap">{rutina.descripcion}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{rutina.nivel}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{rutina.nombreAlumno}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{rutina.dniAlumno}</td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <button
                        onClick={() => { handleDetail(rutina); }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                      >
                        Detalle
                      </button>
                      <button
                        onClick={() => { handleEdit(rutina); }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => { handleDelete(rutina); }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Eliminar
                      </button>
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

export default Rutinas;

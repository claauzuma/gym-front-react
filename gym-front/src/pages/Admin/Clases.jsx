import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // Filtro por defecto "todas las clases"
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


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


  const getCurrentDay = () => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date();
    return days[today.getDay()]; 
  };

  const dayOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const handleAddMember = (clase) => {
    
  };



  const filteredClases = clases.filter(clase => {
    const today = getCurrentDay();
  
    if (filter === "today") {
      return clase.dia === today; 
    }

    return clase.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (filter === "all") {
      console.log("FILTRAMOSSSSS AL ALLL");
      const dayDifference = dayOrder.indexOf(a.dia) - dayOrder.indexOf(b.dia);
      if (dayDifference !== 0) {
        return dayDifference;
      }
      return a.horaArranque.localeCompare(b.horaArranque);
    }
  
    return a.horaArranque.localeCompare(b.horaArranque);
  });

  const handleDelete = async (clase) => {
    const confirmDelete = window.confirm(`¿Estás seguro que deseas eliminar la clase ${clase.descripcion}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/clases/${clase._id}`);
        setClases(prevClases => prevClases.filter(c => c._id !== clase._id));
      } catch (error) {
        console.error("Error eliminando la clase", error);
      }
    }
  };


  const handleDetail = (clase) => {
    navigate(`/admin/clase-detail/${clase._id}`);
  };

  const handleEdit = (clase) => {
    navigate(`/admin/form-clase/${clase._id}`);
  };

  const handleAddClick = () => {
    navigate("/admin/form-clase");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AdminNavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Clases</h1>
        
        {/* Barra de navegación para los filtros */}
        <div className="flex justify-around items-center bg-indigo-600 text-white p-4 rounded-lg mb-8">
          <button
            className={`text-lg font-semibold p-2 hover:bg-indigo-500 rounded-lg ${filter === "today" ? "bg-indigo-500" : ""}`}
            onClick={() => setFilter("today")}
          >
            Clases de hoy
          </button>
          <button
            className={`text-lg font-semibold p-2 hover:bg-indigo-500 rounded-lg ${filter === "all" ? "bg-indigo-500" : ""}`}
            onClick={() => setFilter("all")}
          >
            Clases totales
          </button>
         
   
        </div>

        {/* Formulario de búsqueda */}
        <div className="flex justify-between items-center mb-4">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Buscar clase..."
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

        {/* Tabla de clases */}
    
        <div className="overflow-x-auto">
          <div className="shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Día</th>
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
                    <td className="px-6 py-2 whitespace-nowrap">{clase.dia}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.horaArranque} a {clase.horaFinalizacion}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.nombreProfesor}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.capacidad}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{clase.capacidad - clase.anotados}</td>
                    <td className="px-6 py-2 whitespace-nowrap">
  <button onClick={() => handleDetail(clase)} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600">Detalle</button>
  <button onClick={() => handleEdit(clase)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Editar</button>
  <button onClick={() => handleDelete(clase)} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600">Eliminar</button>
  <button onClick={() => handleAddMember(clase)} className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">+</button>
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

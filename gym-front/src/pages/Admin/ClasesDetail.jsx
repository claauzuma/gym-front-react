import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNavBar from '../../components/NavBarAdmin';

const ClasesDetail = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inscriptos, setInscriptos] = useState([]); // Estado para almacenar los detalles de los alumnos inscriptos

  useEffect(() => {
    const getClaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/clases/${id}`);
        setClase(response.data);

        // Obtener los IDs de los alumnos inscriptos
        const idInscriptos = response.data.alumnosInscriptos || [];

        // Buscar detalles de cada alumno usando Promise.all
        const alumnoPromises = idInscriptos.map(idUsuario =>
          axios.get(`http://localhost:8080/api/usuarios/alumnos/${idUsuario}`).then(res => res.data)
        );

        // Esperar a que todas las promesas se resuelvan
        const alumnosDetalles = await Promise.all(alumnoPromises);
        setInscriptos(alumnosDetalles); // Actualiza el estado con los detalles de los alumnos

      } catch (error) {
        setError('Error al cargar los detalles de la clase o los alumnos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getClaseDetails();
  }, [id]);

  const handleDesuscribir = (alumnoId) => {
    // Lógica para desuscribir al alumno (por ejemplo, enviar una solicitud DELETE)
    console.log(`Desuscribir alumno con ID: ${alumnoId}`);
    
  };

  if (loading) {
    return <div className="text-center text-lg">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!clase) {
    return <div className="text-center">No se encontraron detalles para esta clase.</div>;
  }

  return (
    <>
      <AdminNavBar />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la Clase: {clase.descripcion}</h2>
        <h3 className="text-xl font-semibold mb-2 text-center">Alumnos Inscritos: {clase.anotados}</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mx-auto">
          <thead>
            <tr className="bg-blue-500 text-white"> {/* Cambiado a azul con texto blanco */}
              <th className="py-3 px-4 border-b text-center">ID</th>
              <th className="py-3 px-4 border-b text-center">Nombre</th>
              <th className="py-3 px-4 border-b text-center">Apellido</th>
              <th className="py-3 px-4 border-b text-center">Plan</th>
              <th className="py-3 px-4 border-b text-center">Acciones</th> {/* Columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {inscriptos.length > 0 ? (
              inscriptos.map((alumno) => (
                <tr key={alumno._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{alumno._id}</td>
                  <td className="py-2 px-4 border-b text-center">{alumno.nombre}</td>
                  <td className="py-2 px-4 border-b text-center">{alumno.apellido}</td>
                  <td className="py-2 px-4 border-b text-center">{alumno.plan}</td>
                  <td className="py-2 px-4 border-b text-center"> {/* Botón "Desuscribir" */}
                    <button 
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => handleDesuscribir(alumno._id)}
                    >
                      Desuscribir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No hay alumnos inscriptos en esta clase.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClasesDetail;

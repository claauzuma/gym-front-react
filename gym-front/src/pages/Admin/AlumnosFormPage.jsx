import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavBar from '../../components/NavBarAdmin';

const AlumnoFormPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    pago: '',
    plan: 'basico' // Valor predeterminado
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID del alumno que se va a editar

  useEffect(() => {
    if (id) { // Si existe 'id', es un caso de edición
      const getAlumno = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/usuarios/alumnos/${id}`);
          setFormData(response.data); // Rellenar el formulario con los datos del alumno
        } catch (error) {
          console.error("Error al cargar los datos del alumno", error);
        }
      };
      getAlumno();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      if (id) { 
        // Caso de edición: Usamos PUT para actualizar
        const response = await axios.put(`http://localhost:8080/api/usuarios/${id}`, formData, {
            withCredentials: true
        });
        alert('Alumno actualizado exitosamente');
      } else {
        // Caso de creación: Usamos POST para agregar
        const response = await axios.post('http://localhost:8080/api/usuarios/alumnos', formData);
        alert('Alumno agregado exitosamente');
      }

      // Limpiar el formulario o redirigir después de la acción
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        password: '',
        pago: '',
        plan: 'basico'
      });
      navigate('/admin/alumnos'); // Redirigir a la lista de alumnos

    } catch (error) {
      console.error("Error al guardar los datos del alumno", error);
      alert('Error al procesar la solicitud');
    }
  };

  return (
    <>
    
    <AdminNavBar />
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Editar Alumno" : "Agregar Alumno"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="dni">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-sm font-bold mb-2" htmlFor="pago">
    Pago
  </label>
  <select
    id="pago"
    name="pago"
    value={formData.pago}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-md"
    required
  >
    <option value="">Seleccione una opción</option> {/* Opción por defecto */}
    <option value="diario">Diario</option>
    <option value="mensual">Mensual</option>
    <option value="quincenal">Quincenal</option>
    <option value="bimestral">Bimestral</option>
    <option value="trimestral">Trimestral</option>
    <option value="semestral">Semestral</option>
    <option value="anual">Anual</option>
  </select>
</div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="plan">
            Plan
          </label>
          <select
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="basico">Básico</option>
            <option value="oro">Oro</option>
            <option value="platino">Platino</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AlumnoFormPage;

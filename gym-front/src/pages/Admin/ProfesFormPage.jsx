import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Si no lo tienes, instala axios con npm i axios

const ProfesFormPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID del profesor que se va a editar

  useEffect(() => {
    if (id) { // Si existe 'id', es un caso de edición
      const getProfesor = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/usuarios/profesores/${id}`);
          setFormData(response.data); // Rellenar el formulario con los datos del profesor
        } catch (error) {
          console.error("Error al cargar los datos del profesor", error);
        }
      };
      getProfesor();
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
        console.log("Vamos a intentar modificar al profesor")
        // Caso de edición: Usamos PUT para actualizar
        const response = await axios.put(`http://localhost:8080/api/usuarios/${id}`, formData, {
            withCredentials: true
        });
        alert('Profesor actualizado exitosamente');
      } else {
        // Caso de creación: Usamos POST para agregar
        const response = await axios.post('http://localhost:8080/api/usuarios/profesores', formData);
        alert('Profesor agregado exitosamente');
      }

      // Limpiar el formulario o redirigir después de la acción
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        password: ''
      });
      navigate('/admin/profesores'); // Redirigir a la lista de profesores

    } catch (error) {
      console.error("Error al guardar los datos del profesor", error);
      alert('Error al procesar la solicitud');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Editar Profesor" : "Agregar Profesor"}
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
            required={!id} // El password solo es requerido al agregar
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default ProfesFormPage;

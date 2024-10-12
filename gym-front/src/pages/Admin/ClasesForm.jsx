import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavBar from '../../components/NavBarAdmin';

const ClasesForm = () => {
  const [formData, setFormData] = useState({
    descripcion: '',
    nombreProfesor: '',
    emailProfesor: '',
    horaArranque: '',
    horaFinalizacion: '',
    capacidad: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID de la clase que se va a editar
  const [profesores, setProfesores] = useState([]); // Estado para almacenar la lista de profesores
  const [nombreProfe, setNombreProfe] = useState(''); // Estado para el nombre del profesor seleccionado
  const [emails, setEmails] = useState(['']); // Estado para almacenar los emails del profesor seleccionado

  useEffect(() => {
    const getProfesores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios/profesores');
        setProfesores(response.data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener la lista de profesores', error);
      }
    };
    
    getProfesores();
  
    if (id) { // Si existe 'id', es un caso de edición
      const getClase = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/clases/${id}`);
          setFormData(response.data); // Rellenar el formulario con los datos de la clase
  
          // Establecer nombreProfe y emailProfesor
          setNombreProfe(response.data.nombreProfesor);
          setFormData((prevData) => ({
            ...prevData,
            emailProfesor: response.data.emailProfesor, // Rellenar automáticamente el email
          }));
        } catch (error) {
          console.error("Error al cargar los datos de la clase", error);
        }
      };
      getClase();
    }
  }, [id]); 


  useEffect(() => {
    if (nombreProfe) {
      const getEmailsByProfesor = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/usuarios/profesores`);
          const profesoresConMismoNombre = response.data.filter((r) => r.nombre === nombreProfe);
          const emails = profesoresConMismoNombre.map((profesor) => profesor.email);
          setEmails(emails); 
        } catch (error) {
          console.error('Error al obtener los emails del profesor:', error);
        }
      };
  
      getEmailsByProfesor();
    }
  }, [nombreProfe]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeProfesor = (e) => {
    const selectedProfesor = e.target.value;
    
    setFormData({
      ...formData,
      nombreProfesor: selectedProfesor,
    });

    console.log("El profe seleccionado es : " + selectedProfesor)
  
    setNombreProfe(selectedProfesor);
   
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        console.log("Vamos a intentar modificar la clase");
        // Caso de edición: Usamos PUT para actualizar
        const response = await axios.put(`http://localhost:8080/api/clases/${id}`, formData, {
            withCredentials: true
        });
        alert('Clase actualizada exitosamente');
      } else {
        // Caso de creación: Usamos POST para agregar
        const response = await axios.post('http://localhost:8080/api/clases', formData);
        alert('Clase agregada exitosamente');
      }

      // Limpiar el formulario o redirigir después de la acción
      setFormData({
        descripcion: '',
        nombreProfesor: '',
        emailProfesor: '',
        horaArranque: '',
        horaFinalizacion: '',
        capacidad: ''
      });
      navigate('/admin/clases'); // Redirigir a la lista de clases

    } catch (error) {
      console.error("Error al guardar los datos de la clase", error);
      alert('Error al procesar la solicitud');
    }
  };

  return (
    <> 
    <AdminNavBar/> 
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg md:max-w-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        {id ? "Editar Clase" : "Agregar Clase"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="descripcion">
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            required
          />
        </div>
  
        <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="nombreProfesor">
          Nombre del Profesor
        </label>
        <select
          id="nombreProfesor"
          name="nombreProfesor"
          value={formData.nombreProfesor}
          onChange={handleChangeProfesor}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        >
          <option value="">Selecciona un Profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor.id} value={profesor.nombre}>
              {profesor.nombre}
            </option>
          ))}
        </select>
      </div>
  
      <div>
  <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="emailProfesor">
    Email del Profesor
  </label>
  <select
    id="emailProfesor"
    name="emailProfesor"
    value={formData.emailProfesor}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
    required
  >
    <option value="">Selecciona un Email</option>
    {emails.map((email, index) => (
      <option key={index} value={email}>
        {email}
      </option>
    ))}
  </select>
</div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="horaArranque">
            Hora de Arranque
          </label>
          <input
            type="time"
            id="horaArranque"
            name="horaArranque"
            value={formData.horaArranque}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="horaFinalizacion">
            Hora de Finalización
          </label>
          <input
            type="time"
            id="horaFinalizacion"
            name="horaFinalizacion"
            value={formData.horaFinalizacion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="capacidad">
            Capacidad
          </label>
          <input
            type="number"
            id="capacidad"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            required
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-all"
        >
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
    </>
  );
};

export default ClasesForm;

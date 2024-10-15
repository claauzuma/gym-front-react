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
    capacidad: '',
    dia: '', 
  });

  const navigate = useNavigate();
  const { id } = useParams(); 
  const [profesores, setProfesores] = useState([]); 
  const [nombreProfe, setNombreProfe] = useState(''); 
  const [emails, setEmails] = useState(['']); 

  const diasDeLaSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  useEffect(() => {
    const getProfesores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios/profesores');
        setProfesores(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de profesores', error);
      }
    };
    
    getProfesores();
  
    if (id) { 
      const getClase = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/clases/${id}`);
          setFormData(response.data);
  
          setNombreProfe(response.data.nombreProfesor);
          setFormData((prevData) => ({
            ...prevData,
            emailProfesor: response.data.emailProfesor,
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
  
    setNombreProfe(selectedProfesor);
  };

  // Función para manejar la selección del día
  const handleDiaChange = (e) => {
    setFormData({
      ...formData,
      dia: e.target.value, // Solo un día seleccionado
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        console.log("Vamos a intentar modificar la clase");
        const response = await axios.put(`http://localhost:8080/api/clases/${id}`, formData, {
          withCredentials: true
        });
        alert('Clase actualizada exitosamente');
      } else {
        const response = await axios.post('http://localhost:8080/api/clases', formData);
        alert('Clase agregada exitosamente');
      }

      setFormData({
        descripcion: '',
        nombreProfesor: '',
        emailProfesor: '',
        horaArranque: '',
        horaFinalizacion: '',
        capacidad: '',
        dia: '',
      });
      navigate('/admin/clases');

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

        {/* Campo para seleccionar un solo día */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Día de la Clase
          </label>
          <select
            id="dia"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            required
          >
            <option value="">Selecciona un día</option>
            {diasDeLaSemana.map((dia, index) => (
              <option key={index} value={dia}>
                {dia}
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

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {id ? "Guardar Cambios" : "Crear Clase"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ClasesForm;

import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/NavBarAdmin";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form , Alert } from 'react-bootstrap';


const Clases = () => {
  const [clases, setClases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // Filtro por defecto "todas las clases"
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedClase, setSelectedClase] = useState(null); // Clase seleccionada
  const [selectedAlumno, setSelectedAlumno] = useState(""); // Alumno seleccionado
  const [selectedMiembro, setSelectedMiembro] = useState(""); // Miembro seleccionado
  const [dniInput, setDniInput] = useState("");
  const [foundAlumno, setFoundAlumno] = useState(null);
  const [alumnos,setAlumnos] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clases');
        const data = await response.json();
        setClases(data);
        const responseAlumnos = await fetch('http://localhost:8080/api/usuarios/alumnos')
        if(responseAlumnos.status == 200) {
          const alumnosData = await responseAlumnos.json(); // Convertimos la respuesta en JSON
          setAlumnos(alumnosData);
        }

        data.forEach(clase => {
          if (hasClassPassed(clase.dia)) {
            desuscribirTodos(clase._id, clase.alumnosInscriptos);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchClases();
  }, []);
  
  const hasClassPassed = (diaDeClase) => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const today = new Date();
    const idx = days.indexOf(diaDeClase);
    const todayDayOfWeek = today.getDay(); 
    return idx < todayDayOfWeek; 
  };

  const desuscribirTodos = async (classId, inscriptosIds) => {
    try {
      for (const alumnoId of inscriptosIds) {
        const responseDesuscribir = await fetch(`http://localhost:8080/api/usuarios/clases/desuscribir/${classId}/${alumnoId}`, {
          method: 'DELETE',
        });
  
        if (responseDesuscribir.ok) {
          console.log(`Alumno con ID: ${alumnoId} desuscrito de la clase con ID: ${classId}`);
        } else {
          console.error(`Error al desuscribir al alumno con ID: ${alumnoId} de la clase con ID: ${classId}`);
        }
      }
    } catch (error) {
      console.error("Error al desuscribir a los inscriptos:", error);
    }
  };

  const getCurrentDay = () => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date();
    return days[today.getDay()]; 
  };

  const dayOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];


  const handleGuardar = async (alumno) => {
    console.log("Lógica para agregar alumno a la clase");
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/clases/agregar/${selectedClase._id}/${alumno._id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          alumnoId: alumno._id,
          claseId: selectedClase._id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("El error es este " + errorData.message)
        setErrorMessage(errorData.message)
        throw new Error(errorData.message || 'Error al agregar alumno a la clase');
      }

      setErrorMessage('');
      const data = await response.json();
      console.log("Alumno agregado exitosamente", data);
      alert("Alumno agregado exitosamente")
      window.location.reload();
      handleCloseModal();
    } catch (error) {
      console.error("Hubo un error en la petición:", error);
    }
  };

  const handleAddMember = (clase) => {
    setSelectedClase(clase);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDniInput("");
    setFoundAlumno(null); // Limpiar el alumno encontrado al cerrar el modal
    setErrorMessage("")
  };

  const handleCheckDni = () => {
    const alumno = alumnos.find((alumno) => alumno.dni === dniInput);
    setFoundAlumno(alumno ? alumno : null);
  };

  const filteredClases = clases.filter(clase => {
    const today = getCurrentDay();
  
    if (filter === "today") {
      return clase.dia === today; 
    }

    return clase.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (filter === "all") {
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
      <h1 className="text-4xl font-bold text-center my-4">Clases</h1>
        
        {/* Filtros y Búsqueda */}
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
                    <td className="px-6 py-2 whitespace-nowrap">{clase.capacidad - clase.alumnosInscriptos.length}</td>
                    <td className="px-6 py-2 whitespace-nowrap flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleDetail(clase)}
                      >
                        Detalle
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(clase)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(clase)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        onClick={() => handleAddMember(clase)}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal para agregar miembros */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Miembro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Ingresar DNI del Alumno:</Form.Label>
                <Form.Control
                  type="text"
                  value={dniInput}
                  onChange={(e) => setDniInput(e.target.value)}
                  placeholder="Ingrese el DNI"
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={handleCheckDni}>
                OK
              </Button>

              <Form.Group className="mt-3">
                <Form.Label>Alumno Encontrado:</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={foundAlumno ? `${foundAlumno.nombre} - DNI: ${foundAlumno.dni}` : "No se encontró al alumno"}
                />
              </Form.Group>

            
              {errorMessage && (
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => handleGuardar(foundAlumno)}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Clases;

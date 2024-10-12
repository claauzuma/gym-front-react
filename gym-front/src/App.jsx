import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Importa useAuth
import AdminIndex from "./pages/Admin/AdminIndex";
import ProfesoresIndex from "./pages/Profesores/ProfesoresIndex";
import AlumnosIndex from "./pages/Alumnos/AlumnosIndex";
import Inicio from "./pages/Inicio";
import NavBar from "./components/Navbar";
import Profesores from "./pages/Admin/Profesores";
import ProfesFormPage from "./pages/Admin/ProfesFormPage";
import Alumnos from "./pages/Admin/Alumnos";
import Clases from "./pages/Admin/Clases";
import Rutinas from "./pages/Admin/Rutinas";
import AlumnoFormPage from "./pages/Admin/AlumnosFormPage";
import AdminNavBar from "./components/NavBarAdmin";
import Pagos from "./pages/Admin/Pagos";
import Asistencia from "./pages/Admin/Asistencia";
import Reservas from "./pages/Admin/Reservas";
import ClasesForm from "./pages/Admin/ClasesForm";
import ClasesDetail from "./pages/Admin/ClasesDetail";

const AppContent = () => {
  const { logeado, rol } = useAuth(); // Utiliza useAuth aquí, dentro de AuthProvider

  return (
    <>
      {!logeado && <NavBar />}
  

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path="/admin/agregar-profesor" element={<ProfesFormPage />} /> 
        <Route path="/admin/agregar-profesor/:id" element={<ProfesFormPage />} /> 
        <Route path="/admin/agregar-alumno" element={<AlumnoFormPage />} /> 
        <Route path="/admin/agregar-alumno/:id" element={<AlumnoFormPage />} /> 
        <Route path='/admin/profesores' element={<Profesores />} />
        <Route path='/admin/clases' element={<Clases />} />
        <Route path='/admin/rutinas' element={<Rutinas />} />
        <Route path='/admin/alumnos' element={<Alumnos />} />
        <Route path='/admin' element={<AdminIndex />} />
        <Route path='/admin/pagos' element={<Pagos />} />
        <Route path='/admin/asistencia' element={<Asistencia />} />
        <Route path='/admin/reservas' element={<Reservas />} />
        <Route path='/admin/form-clase' element={<ClasesForm />} />
        <Route path='/admin/form-clase/:id' element={<ClasesForm />} />
        <Route path='/admin/clase-detail/:id' element={<ClasesDetail />} />




        <Route path='/profesor' element={<ProfesoresIndex />} />
        <Route path='/alumno' element={<AlumnosIndex />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

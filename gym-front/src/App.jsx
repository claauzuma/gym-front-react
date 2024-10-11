import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Importa useAuth
import AdminIndex from "./pages/Admin/AdminIndex";
import ProfesoresIndex from "./pages/ProfesoresIndex";
import AlumnosIndex from "./pages/AlumnosIndex";
import Inicio from "./pages/Inicio";
import NavBar from "./components/Navbar";
import Profesores from "./pages/Admin/Profesores";
import ProfesFormPage from "./pages/Admin/ProfesFormPage";

const AppContent = () => {
  const { logeado } = useAuth(); // Utiliza useAuth aquí, dentro de AuthProvider

  return (
    <>
      {!logeado && <NavBar />}
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/admin/agregar-profesor" element={<ProfesFormPage />} /> 
        <Route path="/admin/agregar-profesor/:id" element={<ProfesFormPage />} /> 
        <Route path='/admin/profesores' element={<Profesores />} />
        <Route path='/admin' element={<AdminIndex />} />
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

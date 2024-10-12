import React from 'react';
import ProfesoresNavBar from '../../components/NavBarProfesores';

const ProfesoresIndex = () => {
  return (

    <>
  <ProfesoresNavBar/>

    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Bienvenido, Profesor
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Gestiona tus clases y sigue el progreso de tus alumnos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">Mis Clases</h3>
            <p className="text-gray-700">
              Visualiza tus clases programadas y prepara el material necesario.
            </p>
            <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
              Ver Clases
            </button>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4">Progreso Alumnos</h3>
            <p className="text-gray-700">
              Haz un seguimiento del desempeño de tus estudiantes.
            </p>
            <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
              Ver Progreso
            </button>
          </div>

          <div className="bg-pink-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Calendario</h3>
            <p className="text-gray-700">
              Consulta el calendario académico y organiza tus clases.
            </p>
            <button className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700">
              Ver Calendario
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
            Explorar más
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfesoresIndex;

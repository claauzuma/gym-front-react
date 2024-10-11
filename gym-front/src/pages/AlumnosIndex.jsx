import React from 'react';

const AlumnosIndex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Bienvenido, Alumno
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Aquí puedes gestionar tus cursos y ver tus progresos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Mis Cursos</h3>
            <p className="text-gray-700">
              Visualiza tus cursos actuales y revisa el material disponible para ti.
            </p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Ver Cursos
            </button>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Progreso</h3>
            <p className="text-gray-700">
              Monitorea tu progreso académico y las tareas completadas.
            </p>
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Ver Progreso
            </button>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Calendario</h3>
            <p className="text-gray-700">
              Mantente al día con tu calendario académico y las próximas clases.
            </p>
            <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
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
  );
};

export default AlumnosIndex;

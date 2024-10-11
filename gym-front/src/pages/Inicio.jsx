import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido al Gimnasio Fitness
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Gym Zuma Fit</h2>

        {/* Imagen principal */}
        <div className="mb-8">
          <img
            src="https://www.sellingmybusiness.co.uk/images/1920x400/0x0-0x0/selling-a-business/gym-banner.jpg"
            alt="Gym Banner"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Información del Gimnasio */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestro Gimnasio</h2>
          <p className="text-gray-600 mb-4">
            En nuestro gimnasio, nos dedicamos a proporcionar un ambiente motivador y saludable para alcanzar tus
            objetivos de fitness. Contamos con instalaciones modernas, equipos de última generación y entrenadores
            calificados que te ayudarán en cada paso de tu viaje fitness.
          </p>
        </div>

        {/* Secciones de información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Equipamiento Moderno</h3>
            <p className="text-gray-600">
              Nuestro gimnasio está equipado con lo último en tecnología fitness para brindarte la mejor experiencia de entrenamiento.
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">Clases Variadas</h3>
            <p className="text-gray-600">
              Ofrecemos una variedad de clases, desde yoga hasta entrenamiento de alta intensidad, para satisfacer tus preferencias y metas.
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Entrenadores Expertos</h3>
            <p className="text-gray-600">
              Nuestro equipo de entrenadores altamente calificados está aquí para guiarte y motivarte en tu viaje hacia un estilo de vida más saludable.
            </p>
          </div>
        </div>

        {/* Segunda imagen */}
        <div className="mb-8">
          <img
            src="https://cdn.kingsbox.com/assets/media/landing-categories/home-gym-1627327264-2.jpg"
            alt="Gym Equipamiento"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Botón para comenzar */}
        <div>
          <Link to="/login">
            <button className="bg-indigo-600 text-white py-3 px-6 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition-all">
              ¡Comienza tu Viaje Fitness Ahora!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

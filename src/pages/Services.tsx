
import React from 'react';

const Services = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Nuestros Servicios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Instalación de Alarmas</h2>
          <p className="text-gray-600">
            Instalación profesional de sistemas de alarma para vehículos con garantía y soporte técnico.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Duplicado de Llaves</h2>
          <p className="text-gray-600">
            Servicio de duplicado de llaves con y sin chip para diversas marcas de vehículos.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Instalación de Autoradios</h2>
          <p className="text-gray-600">
            Instalación y configuración profesional de equipos de sonido y multimedia para vehículos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;

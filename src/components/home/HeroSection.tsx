
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 py-16 md:py-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Panel */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              VICARPERU: Protege y Mejora tu Vehículo
            </h1>
            <p className="text-lg text-gray-600">
              Alarmas, GPS, Autoradios Pioneer, Luces LED, Duplicado de llaves con chip y Servicio de instalación profesional en Lima.
            </p>
            <div>
              <Link to="/productos" className="btn-primary">
                Explorar Catálogo
              </Link>
            </div>
            <div className="relative mt-10 md:hidden">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-vicar-green rounded-full -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Instalación de alarma para auto" 
                className="w-full h-72 object-cover rounded-lg shadow-lg" 
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden md:block relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-vicar-green rounded-full -z-10"></div>
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Instalación de alarma para auto" 
                className="w-full h-96 object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-xl font-bold mb-1">
                  ¡Instalación GRATIS en Productos Seleccionados!
                </h2>
                <p className="text-white text-sm mb-3">
                  Aprovecha la instalación gratuita en alarmas Viper, autoradios Pioneer y más. ¡Consúltanos!
                </p>
                <Link to="/servicios" className="inline-block bg-white text-vicar-blue font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  Ver Servicios de Instalación
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

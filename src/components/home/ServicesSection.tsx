
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool, Shield, Zap, Clock } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: <Tool size={36} className="text-vicar-blue" />,
    title: "Instalación Profesional",
    description: "Técnicos certificados con años de experiencia en instalación de alarmas, GPS y autoradios."
  },
  {
    id: 2,
    icon: <Shield size={36} className="text-vicar-blue" />,
    title: "Garantía en Todos los Trabajos",
    description: "Respaldamos todos nuestros servicios con garantía por escrito para tu tranquilidad."
  },
  {
    id: 3,
    icon: <Zap size={36} className="text-vicar-blue" />,
    title: "Duplicado de Llaves con Chip",
    description: "Servicio rápido de duplicado y programación de llaves con chip para todas las marcas."
  },
  {
    id: 4,
    icon: <Clock size={36} className="text-vicar-blue" />,
    title: "Servicio Express",
    description: "Para emergencias ofrecemos servicios prioritarios con atención inmediata."
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <h2 className="section-title">Nuestros Servicios Profesionales</h2>
        <p className="section-subtitle">Contamos con técnicos calificados y garantizamos todos nuestros trabajos.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Link 
            to="/servicios" 
            className="btn-primary"
          >
            Descubrir Todos Nuestros Servicios
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

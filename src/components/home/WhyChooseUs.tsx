
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const reasons = [
  "Más de 10 años de experiencia en el sector automotriz",
  "Productos originales con garantía del fabricante",
  "Técnicos certificados para instalación profesional",
  "Amplio stock de productos para entrega inmediata",
  "Servicio posventa y soporte técnico continuo",
  "Precios competitivos y promociones exclusivas"
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <h2 className="section-title">¿Por qué elegir VICARPERU?</h2>
        <p className="section-subtitle">Nos distinguimos por ofrecer calidad, profesionalismo y confianza en cada servicio.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left Column - Reasons List */}
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle size={24} className="text-vicar-blue flex-shrink-0 mt-0.5 mr-3" />
                <p>{reason}</p>
              </div>
            ))}
          </div>
          
          {/* Right Column - Image with Overlay */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1617814325515-6144d109fcb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Técnico instalando sistema de seguridad" 
              className="w-full h-full object-cover"
              style={{ height: '400px' }}
            />
            <div className="absolute inset-0 bg-vicar-blue/70 flex flex-col justify-center p-8">
              <h3 className="text-white text-2xl font-bold mb-3">Profesionales a tu servicio</h3>
              <p className="text-white mb-6">
                Contamos con un equipo de técnicos certificados, listos para brindar el mejor servicio de instalación y mantenimiento para tu vehículo.
              </p>
              <Link 
                to="/servicios" 
                className="text-white underline hover:text-vicar-green transition-colors font-medium"
              >
                Conoce más sobre nuestros servicios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

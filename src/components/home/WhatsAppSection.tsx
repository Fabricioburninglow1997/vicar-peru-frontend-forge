
import React from 'react';

const consultationOptions = [
  {
    id: 1,
    icon: "🔒",
    title: "Consulta sobre Alarmas",
    description: "Información sobre modelos, precios e instalación de alarmas para tu vehículo.",
    messageTemplate: "Hola, me gustaría información sobre alarmas para mi vehículo."
  },
  {
    id: 2,
    icon: "🔑",
    title: "Duplicado de Llaves",
    description: "Consulta sobre disponibilidad y precios para duplicado de llaves con chip.",
    messageTemplate: "Hola, necesito un duplicado de llave para mi [marca y modelo de auto]."
  },
  {
    id: 3,
    icon: "🔈",
    title: "Sistemas de Audio",
    description: "Asesoría sobre autoradios, parlantes y sistemas de sonido para tu auto.",
    messageTemplate: "Hola, quisiera información sobre sistemas de audio para mi vehículo."
  },
  {
    id: 4,
    icon: "🛠️",
    title: "Servicios de Instalación",
    description: "Información sobre nuestros servicios de instalación profesional y garantías.",
    messageTemplate: "Hola, me gustaría saber sobre los servicios de instalación que ofrecen."
  }
];

const WhatsAppSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <h2 className="section-title">Consulta Fácil y Rápida vía WhatsApp</h2>
        <p className="section-subtitle">Nuestros asesores están listos para ayudarte a encontrar lo que necesitas.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {consultationOptions.map((option) => (
            <div 
              key={option.id} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{option.description}</p>
              <a 
                href={`https://wa.me/51123456789?text=${encodeURIComponent(option.messageTemplate)}`}
                className="btn-whatsapp text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
                </svg>
                Consultar
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://wa.me/51123456789" 
            className="text-vicar-blue font-semibold text-lg hover:underline flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
            </svg>
            +51 123 456 789
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;

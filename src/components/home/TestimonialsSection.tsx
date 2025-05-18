
import React, { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Carlos M.",
    rating: 5,
    text: "Excelente servicio. Me instalaron la alarma Viper en mi Toyota Corolla y quedé muy satisfecho con el trabajo. Los técnicos son muy profesionales y me explicaron todo el proceso."
  },
  {
    id: 2,
    name: "Ana R.",
    rating: 5,
    text: "Gracias a VICARPERU pude conseguir el duplicado de la llave de mi Mazda que había perdido. El servicio fue rápido y el precio justo. Totalmente recomendado."
  },
  {
    id: 3,
    name: "Jorge P.",
    rating: 4,
    text: "Compré un autoradio Pioneer y me dieron la instalación gratis. El sonido es increíble y la instalación quedó perfecta. Muy satisfecho con mi compra."
  },
  {
    id: 4,
    name: "María L.",
    rating: 5,
    text: "La mejor tienda de accesorios para autos en Lima. Tienen todo lo que necesitas y los precios son competitivos. El personal siempre está dispuesto a ayudarte."
  },
  {
    id: 5,
    name: "Roberto S.",
    rating: 5,
    text: "Les compré las luces LED para mi camioneta y quedaron espectaculares. La diferencia con las luces originales es impresionante. Gracias por el excelente servicio."
  },
  {
    id: 6,
    name: "Lucía T.",
    rating: 4,
    text: "Mi experiencia ha sido muy buena. Compré una alarma y la instalación fue rápida y profesional. Recomiendo a VICARPERU sin dudarlo."
  }
];

const TestimonialsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle pause on hover
  const handleMouseEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'paused';
    }
  };
  
  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'running';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        size={16} 
        className={`${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container-wide">
        <h2 className="section-title">Lo que dicen nuestros clientes satisfechos</h2>
        
        <div className="testimonial-container mt-12">
          <div 
            ref={containerRef}
            className="testimonial-slider py-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Double the testimonials for infinite scroll effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className="flex-shrink-0 w-[300px] mx-4 bg-white rounded-lg p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

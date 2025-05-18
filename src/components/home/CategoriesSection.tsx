
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Seguridad Total para tu Vehículo",
    description: "Alarmas, GPS y sistemas antirrobo para tu tranquilidad.",
    image: "https://images.unsplash.com/photo-1580979337343-b3c2cbe772d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    emoji: "🚨",
    link: "/categorias/alarmas"
  },
  {
    id: 2,
    name: "Potencia y Sonido con Car Audio",
    description: "Autoradios, parlantes y equipos para una experiencia única.",
    image: "https://images.unsplash.com/photo-1620628193519-89292999d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    emoji: "📻",
    link: "/categorias/autoradios"
  },
  {
    id: 3,
    name: "Llaves y Controles Inteligentes",
    description: "Duplicados de llaves con chip y controles para tu vehículo.",
    image: "https://images.unsplash.com/photo-1581275705163-0b0233d0561d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    emoji: "🔑",
    link: "/categorias/llaves"
  },
  {
    id: 4,
    name: "Iluminación LED de Alta Calidad",
    description: "Luces LED, halógenos y barras para mejorar tu visibilidad.",
    image: "https://images.unsplash.com/photo-1623914328116-83e7d99bcb16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    emoji: "💡",
    link: "/categorias/luces"
  },
  {
    id: 5,
    name: "Accesorios y Productos de Limpieza",
    description: "Todo lo que necesitas para mantener tu vehículo impecable.",
    image: "https://images.unsplash.com/photo-1601055283742-8b27e81b5553?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    emoji: "🧼",
    link: "/categorias/accesorios"
  }
];

const CategoriesSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350; // Adjust based on your card width + gap
      const currentScroll = sliderRef.current.scrollLeft;
      
      sliderRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <h2 className="section-title">Encuentra lo que buscas</h2>
        <p className="section-subtitle">Navega a través de nuestras categorías principales y descubre productos de calidad para cada necesidad</p>
        
        <div className="relative mt-12">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Ver categorías previas"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={sliderRef}
            className="flex space-x-5 overflow-x-hidden hide-scrollbar py-4"
          >
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={category.link} 
                className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    {category.emoji}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 hover:text-vicar-blue transition-colors">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Ver más categorías"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

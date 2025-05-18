
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';

// Mock data for bestseller products
const bestSellerProducts = [
  {
    id: "bs1",
    name: "Alarma Viper 3106V",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 349.90,
    description: "Alarma de seguridad con sensor de impacto y 2 controles remotos.",
    isBestseller: true
  },
  {
    id: "bs2",
    name: "Autoradio Pioneer SPH-10BT",
    image: "https://images.unsplash.com/photo-1619414063537-8c5e13511steepdi88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 599.90,
    description: "Autoradio con Bluetooth, USB y control desde smartphone.",
    isBestseller: true,
    isOnSale: true,
    discount: 15,
    originalPrice: 699.90
  },
  {
    id: "bs3",
    name: "Cámara de Retroceso HD",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 159.90,
    description: "Cámara de visión nocturna con líneas guía para estacionamiento.",
    isBestseller: true
  },
  {
    id: "bs4",
    name: "Kit de Luces LED H4",
    image: "https://images.unsplash.com/photo-1617197310667-c38da99f0cde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 219.90,
    description: "Kit de luces LED de alta intensidad con 12000 lúmenes.",
    isBestseller: true
  },
  {
    id: "bs5",
    name: "Duplicado de Llave Toyota Corolla",
    image: "https://images.unsplash.com/photo-1612185079868-61f1db929221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 289.90,
    description: "Duplicado de llave con chip y programación incluida.",
    isBestseller: true
  },
  {
    id: "bs6",
    name: "Parlante Pioneer TS-A1670F",
    image: "https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 179.90,
    description: "Parlantes de 6.5\" con 320W de potencia máxima.",
    isBestseller: true,
    isOnSale: true,
    discount: 10,
    originalPrice: 199.90
  }
];

const BestSellersSection: React.FC = () => {
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
    <section className="py-16 bg-white">
      <div className="container-wide">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Nuestros Productos Más Populares</h2>
          <Link 
            to="/productos" 
            className="text-vicar-blue font-medium hover:underline"
          >
            Ver todos los productos
          </Link>
        </div>
        
        <div className="relative mt-8">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Ver productos previos"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={sliderRef}
            className="flex space-x-5 overflow-x-hidden hide-scrollbar py-4"
          >
            {bestSellerProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-72">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Ver más productos"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;

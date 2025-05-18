
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';

// Mock data for new arrivals
const newArrivals = [
  {
    id: "na1",
    name: "Alarma Viper 5706V con pantalla LCD",
    image: "https://images.unsplash.com/photo-1621665698086-adc746478a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 799.90,
    description: "Alarma de 2 vías con arranque remoto y pantalla LCD."
  },
  {
    id: "na2",
    name: "Carcasa para llave Hyundai Accent",
    image: "https://images.unsplash.com/photo-1636455815329-b7c68f7a1404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 59.90,
    description: "Carcasa de repuesto para llave inteligente Hyundai Accent 2018-2022."
  },
  {
    id: "na3",
    name: "Kit de iluminación LED ambiental",
    image: "https://images.unsplash.com/photo-1577248139327-82e52adcf84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 129.90,
    description: "Kit de iluminación ambiental con control por aplicación móvil."
  }
];

// Mock data for offers
const offers = [
  {
    id: "of1",
    name: "Kit Neblineros LED Toyota Yaris 2012",
    image: "https://images.unsplash.com/photo-1609631983098-a828d6a45177?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 189.90,
    description: "Kit completo de neblineros LED para Toyota Yaris 2012.",
    isOnSale: true,
    discount: 25,
    originalPrice: 249.90
  },
  {
    id: "of2",
    name: "Amplificador Pioneer GM-A3702",
    image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 349.90,
    description: "Amplificador de 2 canales, 1000W de potencia máxima.",
    isOnSale: true,
    discount: 20,
    originalPrice: 439.90
  },
  {
    id: "of3",
    name: "Alarma sin llave para auto",
    image: "https://images.unsplash.com/photo-1607853827120-6847830b38b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 219.90,
    description: "Sistema de alarma con sensor de proximidad sin necesidad de llave.",
    isOnSale: true,
    discount: 30,
    originalPrice: 299.90
  },
  {
    id: "of4",
    name: "Cubrecadena de seguridad",
    image: "https://images.unsplash.com/photo-1567714943379-6c0f93bcf809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 79.90,
    description: "Protector para cinturón de seguridad en cuero sintético.",
    isOnSale: true,
    discount: 15,
    originalPrice: 94.90
  },
  {
    id: "of5",
    name: "Silicona para tablero Simoniz",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 29.90,
    description: "Silicona UV3300 para protección y brillo del tablero.",
    isOnSale: true,
    discount: 10,
    originalPrice: 32.90
  }
];

const NewArrivalsOffers: React.FC = () => {
  const [currentNewArrival, setCurrentNewArrival] = useState(0);
  const [visibleOffers, setVisibleOffers] = useState<number[]>([0, 1, 2]);
  const newArrivalSliderRef = useRef<HTMLDivElement>(null);
  const offersContainerRef = useRef<HTMLDivElement>(null);

  // Handle window resize to adjust number of visible offers
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleOffers([0]);
      } else if (width < 1024) {
        setVisibleOffers([0, 1]);
      } else {
        setVisibleOffers([0, 1, 2]);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      moveOffers('down');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [visibleOffers]);

  const scrollNewArrivals = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? (currentNewArrival - 1 + newArrivals.length) % newArrivals.length
      : (currentNewArrival + 1) % newArrivals.length;
      
    setCurrentNewArrival(newIndex);
    
    if (newArrivalSliderRef.current) {
      const itemWidth = newArrivalSliderRef.current.clientWidth;
      newArrivalSliderRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const moveOffers = (direction: 'up' | 'down') => {
    setVisibleOffers(prev => {
      return prev.map(index => {
        if (direction === 'up') {
          // Move up (show previous offers)
          return (index - 1 + offers.length) % offers.length;
        } else {
          // Move down (show next offers)
          return (index + 1) % offers.length;
        }
      });
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* New Arrivals - 60% width on desktop */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Novedades que llegaron</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => scrollNewArrivals('left')} 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="Ver producto anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scrollNewArrivals('right')} 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="Ver producto siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div 
              ref={newArrivalSliderRef}
              className="overflow-hidden bg-white rounded-lg shadow-md h-[400px]"
            >
              <div 
                className="flex transition-transform duration-500 h-full"
                style={{ transform: `translateX(-${currentNewArrival * 100}%)` }}
              >
                {newArrivals.map((product, index) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <Link to={`/producto/${product.id}`} className="block h-full">
                      <div className="relative h-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-white text-xl font-semibold mb-2">{product.name}</h3>
                              <p className="text-white/80 mb-4 line-clamp-2">{product.description}</p>
                              <button className="bg-vicar-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Ver detalles
                              </button>
                            </div>
                            <div className="bg-white/90 px-4 py-2 rounded">
                              <p className="text-vicar-blue font-bold">S/ {product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-4 space-x-1">
              {newArrivals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewArrival(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentNewArrival === index ? 'bg-vicar-blue' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir al producto ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Offers - 40% width on desktop */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ofertas imperdibles</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => moveOffers('up')} 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="Ver ofertas anteriores"
                >
                  <ChevronUp size={20} />
                </button>
                <button 
                  onClick={() => moveOffers('down')} 
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="Ver ofertas siguientes"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
            
            <div 
              ref={offersContainerRef} 
              className="space-y-3 h-[400px] overflow-hidden transition-all"
            >
              {visibleOffers.map((offerIndex) => {
                const offer = offers[offerIndex];
                return (
                  <Link
                    key={`visible-${offer.id}`}
                    to={`/producto/${offer.id}`}
                    className="block p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-1/3">
                        <img 
                          src={offer.image} 
                          alt={offer.name} 
                          className="w-full aspect-square object-cover rounded"
                        />
                        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tl">
                          -{offer.discount}%
                        </div>
                      </div>
                      <div className="w-2/3">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{offer.name}</h3>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-red-500 font-semibold">S/ {offer.price.toFixed(2)}</span>
                          <span className="text-gray-500 text-xs line-through">S/ {offer.originalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsOffers;

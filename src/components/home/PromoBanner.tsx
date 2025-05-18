
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const promoOffers = [
  "15% de descuento en alarmas Viper + instalación gratis",
  "20% de descuento en cámaras de retroceso + instalación",
  "Duplicado de llaves con chip con 25% de descuento",
  "Autoradios Pioneer desde S/299 con instalación gratuita"
];

const PromoBanner: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % promoOffers.length);
    }, 2300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-vicar-blue py-12 text-white">
      <div className="container-wide text-center">
        <h2 className="text-3xl font-bold mb-8">¡OFERTA ESPECIAL!</h2>
        
        <div className="h-12 overflow-hidden relative mb-8">
          {promoOffers.map((offer, index) => (
            <div 
              key={index}
              className={`text-xl md:text-2xl font-medium absolute w-full transition-all duration-500 ease-in-out ${
                currentOffer === index 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform -translate-y-10'
              }`}
            >
              {offer}
            </div>
          ))}
        </div>
        
        <Link 
          to="/ofertas" 
          className="inline-block bg-white text-vicar-blue font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Ver Ofertas
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;

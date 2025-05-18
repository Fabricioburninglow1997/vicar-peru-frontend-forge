
import React from 'react';
import { Link } from 'react-router-dom';

const showcaseCategories = [
  {
    id: 1,
    title: "Seguridad y Tranquilidad para Tu Auto",
    image: "https://images.unsplash.com/photo-1586610724971-52231653ff92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    buttonText: "Ver Alarmas y GPS",
    link: "/categorias/alarmas"
  },
  {
    id: 2,
    title: "Experiencia Sonora Premium",
    image: "https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    buttonText: "Explorar Autoradios",
    link: "/categorias/autoradios"
  }
];

const CategoriesShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <h2 className="section-title">Explora Nuestras Categorías Principales</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {showcaseCategories.map((category) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              style={{ height: '400px' }}
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-4">{category.title}</h3>
                <Link 
                  to={category.link}
                  className="bg-white text-vicar-blue font-medium px-6 py-3 rounded inline-block hover:bg-vicar-blue hover:text-white transition-colors"
                >
                  {category.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;

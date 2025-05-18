
import React from 'react';

// Mock brand logos
const brandLogos = [
  { id: 1, name: 'Pioneer', url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Pioneer_logo.svg' },
  { id: 2, name: 'Viper', url: 'https://img.freepik.com/premium-vector/simple-snake-head-logo-template_9638-95.jpg' },
  { id: 3, name: 'Ford', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/800px-Ford_logo_flat.svg.png' },
  { id: 4, name: 'Toyota', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/800px-Toyota_carlogo.svg.png' },
  { id: 5, name: 'Nissan', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/800px-Nissan-logo.svg.png' },
  { id: 6, name: 'Kenwood', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/KENWOOD_Corporation_Logo.svg/800px-KENWOOD_Corporation_Logo.svg.png' },
  { id: 7, name: 'JVC', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/JVC_logo.svg/800px-JVC_logo.svg.png' },
  { id: 8, name: 'Hyundai', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Hyundai_Motor_Company_logo.svg/800px-Hyundai_Motor_Company_logo.svg.png' },
];

const BrandsSection: React.FC = () => {
  // Duplicate logos for continuous scrolling effect
  const duplicatedLogos = [...brandLogos, ...brandLogos];
  
  return (
    <section className="py-16 bg-white">
      <div className="container-wide">
        <h2 className="section-title">Nuestras Marcas</h2>
        <p className="section-subtitle">Calidad, garantía y soporte en cada producto que ofrecemos.</p>
        
        <div className="mt-10">
          {/* First row - scrolling left to right */}
          <div className="infinite-scroll-wrapper mb-8">
            <div className="infinite-scroll">
              {duplicatedLogos.map((brand, index) => (
                <div 
                  key={`brand-1-${index}`}
                  className="w-[150px] h-[80px] mx-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <img 
                    src={brand.url} 
                    alt={brand.name} 
                    className="max-w-full max-h-full hover:scale-110 transition-transform"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Second row - scrolling right to left */}
          <div className="infinite-scroll-wrapper">
            <div className="infinite-scroll-reverse">
              {duplicatedLogos.reverse().map((brand, index) => (
                <div 
                  key={`brand-2-${index}`}
                  className="w-[150px] h-[80px] mx-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <img 
                    src={brand.url} 
                    alt={brand.name} 
                    className="max-w-full max-h-full hover:scale-110 transition-transform"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;

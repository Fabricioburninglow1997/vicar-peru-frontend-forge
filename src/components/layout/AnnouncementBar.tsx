
import React, { useState, useEffect } from 'react';

const announcements = [
  "¡15% OFF en alarmas Viper este mes!",
  "Duplicado de llaves con chip - ¡Servicio Express!",
  "Nuevos modelos de Autoradios Pioneer ¡Ya disponibles!",
  "¡Instalación GRATIS en productos seleccionados!",
];

const AnnouncementBar: React.FC = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="container-wide flex justify-center">
        <div className="ticker-wrap">
          <div className="ticker">
            {announcements.map((announcement, index) => (
              <span key={index} className="px-4">{announcement}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

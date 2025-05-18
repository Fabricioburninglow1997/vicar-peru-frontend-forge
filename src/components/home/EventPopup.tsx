
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventPopupProps {
  eventName: string;
  description: string;
  dateRange: string;
  imageUrl: string;
  offerUrl: string;
}

const EventPopup: React.FC<EventPopupProps> = ({ 
  eventName, 
  description, 
  dateRange, 
  imageUrl, 
  offerUrl 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if the popup has been dismissed in this session
    const hasBeenShownThisSession = sessionStorage.getItem(`event-popup-shown-${eventName}`);
    
    // Check if the popup has been permanently dismissed
    const hasBeenDismissed = localStorage.getItem(`event-popup-dismissed-${eventName}`);
    
    if (!hasBeenShownThisSession && !hasBeenDismissed) {
      // Show popup after a slight delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark as shown for this session
        sessionStorage.setItem(`event-popup-shown-${eventName}`, 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [eventName]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem(`event-popup-dismissed-${eventName}`, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fade-in p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up relative">
        <button 
          onClick={handleClose}
          className="absolute right-3 top-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={isMobile ? 24 : 20} />
        </button>
        
        <img 
          src={imageUrl} 
          alt={eventName} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        <div className="absolute top-4 left-4">
          <span className="bg-vicar-blue text-white text-xs font-bold px-2 py-1 rounded">
            Evento Especial
          </span>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{eventName}</h2>
          <p className="text-gray-600 mb-3">{description}</p>
          <p className="text-sm text-gray-500 mb-4">{dateRange}</p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={handleDontShowAgain}
              className="text-gray-500 text-sm hover:underline"
            >
              No mostrar de nuevo
            </button>
            
            <a 
              href={offerUrl} 
              className="bg-vicar-blue text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;

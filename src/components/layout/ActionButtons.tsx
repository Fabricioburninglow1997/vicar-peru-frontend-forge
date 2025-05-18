
import React from "react";
import { Bell, Heart, ShoppingCart, User, ArrowLeft } from "lucide-react";
import useAuthNavigation from "@/hooks/useAuthNavigation";
import { useAuth } from "@/contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ className = "" }) => {
  const { isAuthenticated } = useAuth();
  const { navigateToProtected } = useAuthNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're on a protected page that might need a back button
  const isOnProtectedPage = ['/notificaciones', '/favoritos', '/carrito', '/perfil'].some(
    path => location.pathname.startsWith(path)
  );
  
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigateToProtected("/perfil");
    } else {
      navigateToProtected("/auth");
    }
  };

  const handleNotificationsClick = () => {
    navigateToProtected("/notificaciones");
  };

  const handleFavoritesClick = () => {
    navigateToProtected("/favoritos");
  };

  const handleCartClick = () => {
    navigateToProtected("/carrito");
  };

  const handleBackClick = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      {isOnProtectedPage && (
        <button 
          aria-label="Regresar" 
          className="text-gray-600 hover:text-vicar-blue mr-2"
          onClick={handleBackClick}
        >
          <ArrowLeft size={22} />
        </button>
      )}
      <button 
        aria-label="Ver notificaciones" 
        className="text-gray-600 hover:text-vicar-blue relative"
        onClick={handleNotificationsClick}
      >
        <Bell size={22} />
        {isAuthenticated && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-2 h-2"></span>
        )}
      </button>
      <button 
        aria-label="Ver favoritos" 
        className="text-gray-600 hover:text-vicar-blue relative"
        onClick={handleFavoritesClick}
      >
        <Heart size={22} />
        {isAuthenticated && (
          <span className="absolute -top-2 -right-2 bg-vicar-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            0
          </span>
        )}
      </button>
      <button 
        aria-label="Ver carrito"
        className="text-gray-600 hover:text-vicar-blue relative"
        onClick={handleCartClick}
      >
        <ShoppingCart size={22} />
        <span className="absolute -top-2 -right-2 bg-vicar-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          0
        </span>
      </button>
      <button 
        onClick={handleProfileClick}
        className="hidden md:flex btn-primary"
      >
        {isAuthenticated ? 'MI PERFIL' : 'ACCEDER'}
      </button>
      <button 
        onClick={handleProfileClick}
        className="md:hidden text-gray-600 hover:text-vicar-blue"
      >
        <User size={22} />
      </button>
    </div>
  );
};

export default ActionButtons;

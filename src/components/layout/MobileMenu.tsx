
import React from "react";
import { X } from "lucide-react";
import MenuNavigation from "./MenuNavigation";
import { useAuth } from "@/contexts/AuthProvider";
import useAuthNavigation from "@/hooks/useAuthNavigation";

interface Category {
  emoji: string;
  name: string;
  subcategories: string[];
}

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  categories: Category[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  categories 
}) => {
  const { isAuthenticated } = useAuth();
  const { navigateToProtected } = useAuthNavigation();
  
  const handleFavoritesClick = () => {
    navigateToProtected("/favoritos");
  };

  const handleCartClick = () => {
    navigateToProtected("/carrito");
  };

  const handleCatalogClick = () => {
    navigateToProtected("/catalogo");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigateToProtected("/perfil");
    } else {
      navigateToProtected("/auth");
    }
  };

  return (
    <>
      <div
        className={`menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <div className={`menu-panel ${mobileMenuOpen ? "open" : ""}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menú</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <div className="mb-2 font-semibold">Categorías</div>
            <MenuNavigation 
              categories={categories} 
              onClose={() => setMobileMenuOpen(false)} 
            />
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <button onClick={handleFavoritesClick} className="block py-2 hover:text-vicar-blue transition-colors w-full text-left">
              Favoritos
            </button>
            <button onClick={handleCartClick} className="block py-2 hover:text-vicar-blue transition-colors w-full text-left">
              Carrito
            </button>
            <button onClick={handleCatalogClick} className="block py-2 hover:text-vicar-blue transition-colors w-full text-left">
              Catálogo Completo
            </button>
            <button onClick={handleProfileClick} className="block py-2 hover:text-vicar-blue transition-colors w-full text-left">
              {isAuthenticated ? 'Mi Perfil' : 'Acceder / Login'}
            </button>
            <a
              href="https://wa.me/51123456789?text=Hola%20VICAR-PERU,%20necesito%20ayuda"
              className="btn-whatsapp mt-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
              </svg>
              ¿Te quedaste sin batería?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

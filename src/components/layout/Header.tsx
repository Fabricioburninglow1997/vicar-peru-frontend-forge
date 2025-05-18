
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import { useAuth } from "@/contexts/AuthProvider";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "@/components/shared/AuthModal";
import useAuthNavigation from "@/hooks/useAuthNavigation";
import SearchBar from "./SearchBar";
import CategoryNavigation from "./CategoryNavigation";
import MobileMenu from "./MobileMenu";
import SubcategoryPanel from "./SubcategoryPanel";
import ActionButtons from "./ActionButtons";

const categories = [
  { emoji: "🔑", name: "Llaves", subcategories: ["Llaves con chip", "Duplicados", "Carcasas"] },
  { emoji: "🚨", name: "Alarmas", subcategories: ["Alarmas Viper", "Sin llave", "Con llave"] },
  { emoji: "💡", name: "Luces", subcategories: ["LED", "Halógenos", "Barras LED"] },
  { emoji: "📍", name: "GPS", subcategories: ["Trackers", "Dispositivos GPS"] },
  { emoji: "🔊", name: "Parlantes", subcategories: ["Pioneer", "Amplificadores", "Subwoofers"] },
  { emoji: "📻", name: "Autoradios", subcategories: ["Con chip", "Sin chip", "Consolas"] },
  { emoji: "🏢", name: "Corporativas", subcategories: ["Sistemas de seguridad", "Flotas", "Empresas"] }
];

const Header: React.FC = () => {
  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Auth related hooks
  const { isModalOpen, pendingRedirectUrl, closeModal } = useAuthModal();
  const { navigateToProtected } = useAuthNavigation();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
      setActiveSubMenu(null);
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  const handleCategoryClick = (name: string) => {
    setActiveSubMenu(name === activeSubMenu ? null : name);
  };

  const handleBackClick = () => {
    setActiveSubMenu(null);
  };

  const handleCatalogClick = () => {
    navigateToProtected("/catalogo");
  };

  return (
    <>
      <AnnouncementBar />
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        redirectUrl={pendingRedirectUrl} 
      />

      <header className={`header w-full z-50 ${isSticky ? "header-sticky" : ""}`}>
        {/* First row - Desktop */}
        <div className="container-wide py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and menu toggle */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-vicar-blue">
                VICAR-PERU
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-gray-500"
                aria-label="Menú principal"
              >
                <Menu size={24} />
              </button>
              {/* Desktop search bar */}
              <div className="hidden md:flex min-w-[300px]">
                <SearchBar />
              </div>
            </div>

            {/* Right side - Action icons */}
            <ActionButtons />
          </div>
        </div>

        {/* Mobile search bar - Second row for mobile/tablet */}
        <div className="md:hidden border-t border-gray-100 py-2 px-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <SearchBar className="w-full" />
            </div>
            <a
              href="https://wa.me/51123456789?text=Hola%20VICAR-PERU,%20necesito%20ayuda"
              className="inline-flex items-center text-vicar-whatsapp bg-vicar-green px-3 py-2 rounded-md text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
              </svg>
              ¿Te quedaste sin batería?
            </a>
          </div>
        </div>

        {/* Second row - Categories - Desktop only */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="container-wide">
            <div className="flex justify-between items-center">
              <CategoryNavigation categories={categories} />
              
              <a
                href="https://wa.me/51123456789?text=Hola%20VICAR-PERU,%20necesito%20ayuda"
                className="hidden lg:flex items-center text-vicar-dark-gray bg-vicar-green px-4 py-2 rounded-md"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
                </svg>
                ¿Te quedaste sin batería?
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        categories={categories}
      />

      {/* Subcategory Panels */}
      {categories.map((category) => (
        <SubcategoryPanel
          key={category.name}
          category={category}
          activeSubMenu={activeSubMenu}
          handleBackClick={handleBackClick}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      ))}
    </>
  );
};

export default Header;


import React from "react";
import { ChevronRight, X } from "lucide-react";
import useAuthNavigation from "@/hooks/useAuthNavigation";

interface Category {
  emoji: string;
  name: string;
  subcategories: string[];
}

interface SubcategoryPanelProps {
  category: Category;
  activeSubMenu: string | null;
  handleBackClick: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const SubcategoryPanel: React.FC<SubcategoryPanelProps> = ({
  category,
  activeSubMenu,
  handleBackClick,
  setMobileMenuOpen,
}) => {
  const { navigateToProtected } = useAuthNavigation();

  return (
    <div
      key={`submenu-${category.name}`}
      className={`submenu-panel ${activeSubMenu === category.name ? "open" : ""}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-500"
            aria-label="Volver atrás"
          >
            <ChevronRight size={20} className="transform rotate-180 mr-2" />
            Volver
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-500"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">{category.emoji}</span>
          {category.name}
        </h2>
        
        <ul className="space-y-3">
          {category.subcategories.map((subcategory) => (
            <li key={subcategory}>
              <button
                className="block py-2 px-3 w-full text-left hover:bg-gray-100 rounded transition-colors"
                onClick={() => {
                  navigateToProtected(`/categorias/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`);
                  setMobileMenuOpen(false);
                }}
              >
                {subcategory}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubcategoryPanel;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthNavigation from '@/hooks/useAuthNavigation';

interface Category {
  emoji: string;
  name: string;
  subcategories: string[];
}

interface MenuNavigationProps {
  categories: Category[];
  onClose?: () => void;
}

const MenuNavigation: React.FC<MenuNavigationProps> = ({ categories, onClose }) => {
  const { navigateToProtected } = useAuthNavigation();
  
  const handleCategoryClick = (categoryName: string) => {
    navigateToProtected(`/categorias/${categoryName.toLowerCase()}`);
    if (onClose) onClose();
  };
  
  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    navigateToProtected(`/categorias/${categoryName.toLowerCase()}/${subcategoryName.toLowerCase()}`);
    if (onClose) onClose();
  };
  
  return (
    <ul className="space-y-4">
      {categories.map((category) => (
        <li key={category.name}>
          <div 
            className="flex items-center space-x-1 hover:text-vicar-blue transition-colors cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </div>
          <ul className="ml-6 mt-2 space-y-1">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory}>
                <div 
                  className="text-sm hover:text-vicar-blue transition-colors cursor-pointer"
                  onClick={() => handleSubcategoryClick(category.name, subcategory)}
                >
                  {subcategory}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default MenuNavigation;


import React from "react";
import useAuthNavigation from "@/hooks/useAuthNavigation";

interface Category {
  emoji: string;
  name: string;
  subcategories: string[];
}

interface CategoryNavigationProps {
  categories: Category[];
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ categories }) => {
  const { navigateToProtected } = useAuthNavigation();

  return (
    <nav className="flex-1">
      <ul className="flex items-center space-x-6">
        {categories.map((category) => (
          <li key={category.name} className="dropdown py-3 relative">
            <button
              onClick={() => navigateToProtected(`/categorias/${category.name.toLowerCase()}`)}
              className="flex items-center space-x-1 hover:text-vicar-blue transition-colors"
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
            <div className="dropdown-content mt-3">
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => navigateToProtected(`/categorias/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors"
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavigation;

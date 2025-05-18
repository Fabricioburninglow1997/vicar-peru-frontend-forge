
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/ShoppingContext';
import useAuthNavigation from '@/hooks/useAuthNavigation';

interface ProductCardWrapperProps extends Product {
  showSku?: boolean;
}

/**
 * Wrapper for ProductCard that adds authentication check
 */
const ProductCardWrapper: React.FC<ProductCardWrapperProps> = (props) => {
  const { navigateToProtected } = useAuthNavigation();
  
  const handleProductClick = () => {
    navigateToProtected(`/producto/${props.id}`);
  };
  
  return (
    <div onClick={handleProductClick} className="cursor-pointer">
      <ProductCard {...props} />
    </div>
  );
};

export default ProductCardWrapper;

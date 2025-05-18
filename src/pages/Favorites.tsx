
import React from 'react';
import { useShopping } from '@/contexts/ShoppingContext';

const Favorites = () => {
  const { favoriteItems, removeFromFavorites } = useShopping();
  
  // Simple placeholder for now - will be enhanced in future iterations
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>
      
      {favoriteItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No tienes productos favoritos</p>
        </div>
      ) : (
        <div>
          {/* Favorite items will be displayed here */}
          <p>Tienes {favoriteItems.length} producto(s) en tus favoritos.</p>
          {/* This is a placeholder - will implement full UI in future iterations */}
        </div>
      )}
    </div>
  );
};

export default Favorites;

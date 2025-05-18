
import React from 'react';
import { useShopping } from '@/contexts/ShoppingContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useShopping();
  
  // Simple placeholder for now - will be enhanced in future iterations
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Carrito de Cotización</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Tu carrito de cotización está vacío</p>
        </div>
      ) : (
        <div>
          {/* Cart items will be displayed here */}
          <p>Tienes {cartItems.length} producto(s) en tu carrito.</p>
          {/* This is a placeholder - will implement full UI in future iterations */}
        </div>
      )}
    </div>
  );
};

export default Cart;

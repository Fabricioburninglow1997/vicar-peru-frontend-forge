import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { toast } from "@/hooks/use-toast";

// Product interface
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  category: string;
  isBestseller?: boolean;
  isOnSale?: boolean;
  discount?: number;
}

// Cart item interface (product + quantity)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Shopping context type
interface ShoppingContextType {
  cartItems: CartItem[];
  favoriteItems: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  isInFavorites: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
}

// Create the context with default values
const ShoppingContext = createContext<ShoppingContextType>({
  cartItems: [],
  favoriteItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isInCart: () => false,
  isInFavorites: () => false,
  cartTotal: 0,
  cartCount: 0,
});

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  // Load cart and favorites from localStorage when component mounts or when auth status changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const userKey = `vicar_${user.id}`;
      const storedCart = localStorage.getItem(`${userKey}_cart`);
      const storedFavorites = localStorage.getItem(`${userKey}_favorites`);
      
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      
      if (storedFavorites) {
        setFavoriteItems(JSON.parse(storedFavorites));
      }
    } else {
      // If not authenticated, reset the cart and favorites
      setCartItems([]);
      setFavoriteItems([]);
    }
  }, [isAuthenticated, user]);

  // Update cart totals when cartItems change
  useEffect(() => {
    // Calculate total price
    const total = cartItems.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + (price * item.quantity);
    }, 0);
    
    // Calculate total items
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
    
    // Save to localStorage if authenticated
    if (isAuthenticated && user) {
      const userKey = `vicar_${user.id}`;
      localStorage.setItem(`${userKey}_cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, user]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isAuthenticated && user) {
      const userKey = `vicar_${user.id}`;
      localStorage.setItem(`${userKey}_favorites`, JSON.stringify(favoriteItems));
    }
  }, [favoriteItems, isAuthenticated, user]);

  // Add product to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If product already exists in cart, update quantity
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Otherwise, add new item to cart
        return [...prevItems, { product, quantity }];
      }
    });
    
    toast({
      title: "Producto añadido al carrito",
      description: `${quantity} x ${product.name}`,
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    
    toast({
      title: "Producto eliminado del carrito",
      description: "El producto fue eliminado correctamente",
    });
  };

  // Update product quantity in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrito vacío",
      description: "Todos los productos fueron eliminados del carrito",
    });
  };

  // Add product to favorites
  const addToFavorites = (product: Product) => {
    setFavoriteItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
    
    toast({
      title: "Añadido a favoritos",
      description: product.name,
    });
  };

  // Remove product from favorites
  const removeFromFavorites = (productId: string) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: "Eliminado de favoritos",
      description: "El producto fue eliminado de favoritos correctamente",
    });
  };

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return cartItems.some(item => item.product.id === productId);
  };

  // Check if product is in favorites
  const isInFavorites = (productId: string) => {
    return favoriteItems.some(item => item.id === productId);
  };

  const shoppingContextValue = {
    cartItems,
    favoriteItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    isInCart,
    isInFavorites,
    cartTotal,
    cartCount,
  };

  return (
    <ShoppingContext.Provider value={shoppingContextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};

// Custom hook for using the shopping context
export const useShopping = () => useContext(ShoppingContext);

export default ShoppingProvider;

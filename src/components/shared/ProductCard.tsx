
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export interface ProductProps {
  id: string | number;
  name: string;
  image: string;
  price: number;
  description: string;
  isBestseller?: boolean;
  isOnSale?: boolean;
  discount?: number;
  originalPrice?: number;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  image,
  price,
  description,
  isBestseller = false,
  isOnSale = false,
  discount = 0,
  originalPrice = 0,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Product added to cart:", name);
    // In Phase 2 this will connect to the ShoppingProvider
  };

  return (
    <div className="product-card h-full flex flex-col">
      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        {/* Best Seller Badge */}
        {isBestseller && (
          <div className="absolute top-2 right-2 z-10 bg-yellow-500 text-xs font-bold text-white px-2 py-1 rounded">
            Más Vendido
          </div>
        )}

        {/* Discount Badge */}
        {isOnSale && discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-xs font-bold text-white px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>

        {/* View Details Overlay */}
        <div className="view-details">
          <Link
            to={`/producto/${id}`}
            className="bg-white text-vicar-blue px-4 py-2 rounded font-medium hover:bg-vicar-blue hover:text-white transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <Link to={`/producto/${id}`} className="block">
            <h3 className="font-semibold text-lg mb-1 hover:text-vicar-blue transition-colors">
              {name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {isOnSale && originalPrice > 0 ? (
              <div className="flex flex-col">
                <span className="text-red-500 font-semibold">S/ {price.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through">
                  S/ {originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-semibold">S/ {price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-vicar-blue text-white p-2 rounded hover:bg-blue-700 transition-colors"
            aria-label="Cotizar"
          >
            <ShoppingCart size={18} />
            <span className="sr-only">Cotizar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

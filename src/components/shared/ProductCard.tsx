
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useShopping, Product as ProductType } from "@/contexts/ShoppingContext";
import { useAuth } from "@/contexts/AuthProvider";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "@/components/shared/AuthModal";

export interface ProductProps extends ProductType {
  showSku?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  image,
  price,
  description,
  sku,
  isBestseller = false,
  isOnSale = false,
  discount = 0,
  discountPrice,
  showSku = false,
}) => {
  const { isAuthenticated } = useAuth();
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } = useShopping();
  const navigate = useNavigate();
  const { isModalOpen, requireAuth, closeModal, pendingRedirectUrl } = useAuthModal();
  const [isFavorite, setIsFavorite] = useState(isInFavorites(id));

  // Update favorite state when context changes
  React.useEffect(() => {
    setIsFavorite(isInFavorites(id));
  }, [isInFavorites, id]);

  const productData: ProductType = {
    id,
    name,
    sku,
    price,
    discountPrice,
    image,
    description,
    category: '', // This would come from API in a real app
    isBestseller,
    isOnSale,
    discount,
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    requireAuth(() => {
      if (isFavorite) {
        removeFromFavorites(id);
      } else {
        addToFavorites(productData);
      }
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    requireAuth(() => {
      addToCart(productData);
    });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    requireAuth(() => {
      navigate(`/producto/${id}`);
    }, `/producto/${id}`);
  };

  return (
    <>
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
            onClick={handleToggleFavorite}
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
            <button
              onClick={handleViewDetails}
              className="bg-white text-vicar-blue px-4 py-2 rounded font-medium hover:bg-vicar-blue hover:text-white transition-colors"
            >
              Ver detalles
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <button onClick={handleViewDetails} className="block text-left w-full">
              <h3 className="font-semibold text-lg mb-1 hover:text-vicar-blue transition-colors">
                {name}
              </h3>
            </button>
            {showSku && (
              <p className="text-gray-500 text-xs mb-1">SKU: {sku}</p>
            )}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {isOnSale && discountPrice !== undefined ? (
                <div className="flex flex-col">
                  <span className="text-red-500 font-semibold">S/ {discountPrice.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm line-through">
                    S/ {price.toFixed(2)}
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
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        redirectUrl={pendingRedirectUrl}
      />
    </>
  );
};

export default ProductCard;

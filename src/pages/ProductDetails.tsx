
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductById, fetchProducts } from '@/integrations/supabase/api';
import { useShopping, Product } from '@/contexts/ShoppingContext';
import { Heart, ShoppingCart, Share, ShieldCheck, Truck, Clock } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites, isInCart } = useShopping();
  
  const isFavorite = product ? isInFavorites(product.id) : false;
  const isInCartAlready = product ? isInCart(product.id) : false;
  
  // Fetch product details and related products
  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Load product details
        const productData = await fetchProductById(id);
        setProduct(productData);
        
        if (productData) {
          // Load related products from the same category
          const relatedData = await fetchProducts({ category: productData.category });
          // Filter out the current product and limit to 4 products
          setRelatedProducts(
            relatedData
              .filter(p => p.id !== productData.id)
              .slice(0, 4)
          );
        }
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProductData();
  }, [id]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Handle decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    if (!product) return '';
    
    const message = `Hola VICARPERU, estoy interesado en el siguiente producto: 
*${product.name}* 
SKU: ${product.sku}
Precio: S/ ${product.discountPrice || product.price}
Cantidad: ${quantity}
¿Podría darme más información?`;
    
    return encodeURIComponent(message);
  };
  
  // Handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const whatsappNumber = '51123456789'; // Replace with your actual WhatsApp number
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="py-8 px-4 bg-gray-50 min-h-screen">
          <div className="container-wide">
            <div className="py-10 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vicar-blue"></div>
              <p className="mt-4 text-gray-600">Cargando detalles del producto...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Header />
        <main className="py-8 px-4 bg-gray-50 min-h-screen">
          <div className="container-wide">
            <div className="bg-white rounded-lg shadow-md p-10 text-center">
              <p className="text-lg text-gray-600">Producto no encontrado</p>
              <Button
                onClick={() => window.history.back()}
                className="mt-4"
              >
                Volver
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="py-8 px-4 bg-gray-50">
        <div className="container-wide">
          {/* Product details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product image */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isBestseller && (
                    <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded">
                      Más Vendido
                    </span>
                  )}
                  
                  {product.isOnSale && product.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product info */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="text-sm text-gray-500 mb-4">
                  SKU: {product.sku}
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  {product.isOnSale && product.discountPrice !== undefined ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-500">
                        S/ {product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        S/ {product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold">
                      S/ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                
                {/* Quantity selector */}
                <div className="flex items-center mb-6">
                  <span className="mr-4 font-medium">Cantidad:</span>
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      type="button"
                      className="px-3 py-1 border-r border-gray-300"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center py-1 border-none focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 border-l border-gray-300"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 flex-grow"
                    disabled={isInCartAlready}
                  >
                    <ShoppingCart size={18} />
                    <span>{isInCartAlready ? 'En el carrito' : 'Añadir al carrito'}</span>
                  </Button>
                  
                  <Button
                    onClick={handleToggleFavorite}
                    variant="outline"
                    className={`flex items-center justify-center gap-2 ${
                      isFavorite ? 'text-red-500 border-red-500 hover:bg-red-50' : ''
                    }`}
                  >
                    <Heart
                      size={18}
                      className={isFavorite ? 'fill-red-500' : ''}
                    />
                    <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
                  </Button>
                </div>
                
                {/* WhatsApp button */}
                <Button
                  onClick={handleWhatsAppInquiry}
                  className="bg-green-500 hover:bg-green-600 text-white mb-6"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
                  </svg>
                  Consultar por WhatsApp
                </Button>
                
                {/* Additional info */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <ShieldCheck size={18} className="mr-2" />
                      <span>Garantía de 1 año</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck size={18} className="mr-2" />
                      <span>Envío en 24-48h</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      <span>Instalación profesional</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Share size={18} className="mr-2" />
                      <span>Soporte técnico</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    {...relatedProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;

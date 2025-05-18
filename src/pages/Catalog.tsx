import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { fetchProducts, fetchCategories } from '@/integrations/supabase/api';
import { Product } from '@/contexts/ShoppingContext';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Catalog: React.FC = () => {
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subcategory || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  
  // Get categories and products on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        // Load categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Build filters
        const filters: any = {};
        
        if (category) {
          filters.category = category.toLowerCase();
        }
        
        if (searchQuery) {
          filters.search = searchQuery;
        }
        
        if (priceRange[0] > 0 || priceRange[1] < 1000) {
          filters.minPrice = priceRange[0];
          filters.maxPrice = priceRange[1];
        }
        
        if (sortOption) {
          filters.sort = sortOption;
        }
        
        // Load products with filters
        const productsData = await fetchProducts(filters);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading catalog data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [category, searchQuery, priceRange, sortOption]);
  
  // Handle search input
  const handleSearch = () => {
    // Update URL params
    searchParams.set('search', searchQuery);
    setSearchParams(searchParams);
    
    // Products will be updated by the useEffect
  };
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // In a real app, this would update the URL and trigger a new fetch
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
    // Products will be updated by the useEffect
  };
  
  return (
    <>
      <Header />
      <main className="py-8 px-4 bg-gray-50 min-h-screen">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter size={18} />
                <span>Filtrar Productos</span>
              </Button>
            </div>
            
            {/* Filters Sidebar */}
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 flex-shrink-0`}>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filtros</h3>
                  <button 
                    className="md:hidden text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Categoría</h4>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las categorías</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                          {cat.emoji} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Rango de Precios</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      min={0}
                      max={1000}
                      step={50}
                      onValueChange={(values) => setPriceRange([values[0], values[1]])}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>S/ {priceRange[0]}</span>
                    <span>S/ {priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Other filters would go here */}
                
                <Button 
                  onClick={() => {
                    // Reset filters
                    setSelectedCategory('');
                    setPriceRange([0, 1000]);
                    setSortOption('');
                    setSearchQuery('');
                    searchParams.delete('search');
                    setSearchParams(searchParams);
                    setMobileFiltersOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full mt-2"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-grow">
              {/* Search and Sort Bar */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Buscar productos..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={sortOption} onValueChange={handleSortChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Relevancia</SelectItem>
                        <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                        <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                        <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {category ? `Categoría: ${category}` : 'Todos los Productos'}
                  {subcategory ? ` > ${subcategory}` : ''}
                  {searchQuery ? ` - Resultados para "${searchQuery}"` : ''}
                </h1>
                
                {loading ? (
                  <div className="py-10 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vicar-blue"></div>
                    <p className="mt-4 text-gray-600">Cargando productos...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                    <p className="text-lg text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
                    <Button 
                      onClick={() => {
                        setSelectedCategory('');
                        setPriceRange([0, 1000]);
                        setSortOption('');
                        setSearchQuery('');
                        searchParams.delete('search');
                        setSearchParams(searchParams);
                      }} 
                      variant="outline"
                      className="mt-4"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        showSku={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Catalog;

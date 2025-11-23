import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

const Products: React.FC = () => {
  const { products: allProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<number>(200000);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured');
  const [show10Min, setShow10Min] = useState<boolean>(searchParams.get('delivery') === '10min');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => ['all', ...Array.from(new Set(allProducts.map(p => p.category)))], [allProducts]);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    if(show10Min) {
      products = products.filter(p => p.deliveryTime === 10);
    }

    products = products.filter(p => p.price <= priceRange);

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
        products = products.filter(p => p.trending);
        break;
    }

    return products;
  }, [searchParams, selectedCategory, priceRange, sortBy, show10Min, allProducts]);
  
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (show10Min) params.set('delivery', '10min');
    if (sortBy !== 'featured') params.set('sort', sortBy);
    const searchQuery = searchParams.get('search');
    if(searchQuery) params.set('search', searchQuery);
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, show10Min, sortBy, setSearchParams]);


  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <Filter className="w-5 h-5" /> Filters
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <SlidersHorizontal className="w-5 h-5" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent focus:outline-none">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            <div className="hidden md:flex bg-white rounded-lg shadow-sm border">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-subtle'} rounded-l-lg`}><Grid className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-subtle'} rounded-r-lg`}><List className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Filters</h3>
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700">
                  <input type="checkbox" checked={show10Min} onChange={() => setShow10Min(!show10Min)} className="w-4 h-4 text-secondary focus:ring-secondary" />
                  <Zap className="w-4 h-4 text-secondary-700" /> 10-Min Delivery
                </label>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Max Price</h4>
                <div className="space-y-2">
                  <input type="range" min="100" max="200000" step="100" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="text-center text-sm text-subtle font-medium">Up to ₹{priceRange.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange(200000);
                  setSortBy('featured');
                  setShow10Min(false);
                  setSearchParams({});
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 text-subtle">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                <p className="text-xl text-subtle">No products found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

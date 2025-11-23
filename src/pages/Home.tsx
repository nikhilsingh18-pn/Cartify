import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import CategoryNav from '../components/CategoryNav';
import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  const { products } = useProducts();
  const topDeals = products.filter(p => p.discount && p.discount > 0).slice(0, 5);

  return (
    <div className="bg-background">
      <CategoryNav />
      <div className="container mx-auto px-4">
        <HeroSlider />

        <div className="bg-white shadow-sm my-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Top Deals</h2>
              <p className="text-subtle text-sm">Grab them before they're gone!</p>
            </div>
            <Link to="/products" className="bg-primary text-white px-4 py-2 rounded-sm text-sm font-semibold flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
             <Link to="/products" className="hidden md:flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100">
                <p className="text-primary font-semibold">View All</p>
                <ArrowRight className="w-8 h-8 text-primary mt-2"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

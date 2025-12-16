import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-sm overflow-hidden group text-center p-2"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-32 md:h-40 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-2">
          <h3 className="font-medium text-sm text-foreground mb-1 truncate">{product.name}</h3>
          
          {product.discount && (
            <p className="text-green-600 font-semibold text-sm">From ₹{product.price.toLocaleString('en-IN')}</p>
          )}

          <p className="text-xs text-subtle truncate">{product.category}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

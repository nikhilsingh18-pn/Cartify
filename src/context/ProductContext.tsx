import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { realProducts } from '../data/realProducts';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductsBySeller: (sellerId: string) => Product[];
}

// Create the context with a default value of undefined
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(realProducts);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Simple ID generation
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  const getProductsBySeller = (sellerId: string) => {
    // In a real app, this would be an API call.
    // Here we'll just filter. For demo purposes, let's assign some products to the logged-in seller.
    return products.filter(p => p.sellerId.includes('seller') || p.sellerId === sellerId);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductsBySeller }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

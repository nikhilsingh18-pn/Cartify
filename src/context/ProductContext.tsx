import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '../types';
import { api } from '../lib/api';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getProductsBySeller: (sellerId: string) => Product[];
  refreshProducts: (params?: Record<string, string | number | boolean>) => Promise<void>;
  loading: boolean;
}

// Create the context with a default value of undefined
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    api.admin.categories.list().then((cats: { id: number; name: string }[]) => {
      const map: Record<number, string> = {};
      cats.forEach(c => { map[c.id] = c.name; });
      setCategoryMap(map);
      localStorage.setItem('cartify_category_map', JSON.stringify(map));
    }).catch(() => {
      const saved = localStorage.getItem('cartify_category_map');
      if (saved) setCategoryMap(JSON.parse(saved));
    });
    refreshProducts();
  }, [categoryMap]);

  type ProductPayload = {
    name: string;
    categoryId?: number;
    price: number;
    comparePrice?: number;
    image: string;
    images?: string[];
    description: string;
    rating: number;
    reviews: number;
    stock: number;
    trending?: boolean;
    discount?: number;
    tags?: string[];
    deliveryTime?: number;
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const categoryId = Object.entries(categoryMap).find(([, name]) => name === productData.category)?.[0];
    const payload: ProductPayload = {
      name: productData.name,
      categoryId: categoryId ? Number(categoryId) : undefined,
      price: productData.price,
      image: productData.image,
      images: productData.images ?? [],
      description: productData.description,
      rating: productData.rating ?? 0,
      reviews: productData.reviews ?? 0,
      stock: productData.stock,
      trending: productData.trending ?? false,
      discount: productData.discount ?? undefined,
      tags: productData.tags ?? [],
      deliveryTime: productData.deliveryTime ?? undefined,
    };
    const created = await api.products.create(payload);
    const newProduct: Product = {
      ...productData,
      id: created.id,
      sellerId: created.sellerId,
      category: payload.categoryId ? (categoryMap[payload.categoryId] || productData.category) : productData.category,
    } as Product;
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = async (updatedProduct: Product) => {
    const categoryId = Object.entries(categoryMap).find(([, name]) => name === updatedProduct.category)?.[0];
    const payload: ProductPayload = {
      name: updatedProduct.name,
      categoryId: categoryId ? Number(categoryId) : undefined,
      price: updatedProduct.price,
      image: updatedProduct.image,
      images: updatedProduct.images ?? [],
      description: updatedProduct.description,
      rating: updatedProduct.rating,
      reviews: updatedProduct.reviews,
      stock: updatedProduct.stock,
      trending: updatedProduct.trending ?? false,
      discount: updatedProduct.discount ?? undefined,
      tags: updatedProduct.tags ?? [],
      deliveryTime: updatedProduct.deliveryTime ?? undefined,
    };
    await api.products.update(updatedProduct.id, payload);
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = async (productId: string) => {
    await api.products.remove(productId);
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  const mapProducts = (list: {
    id: string;
    name: string;
    categoryId?: number;
    category?: string;
    price: number;
    comparePrice?: number;
    image: string;
    images?: string[];
    description: string;
    rating: number;
    reviews: number;
    stock: number;
    sellerId: string;
    sellerName?: string;
    trending?: boolean;
    discount?: number;
    tags?: string[];
    deliveryTime?: number;
  }[]): Product[] => {
    return list.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.categoryId ? (categoryMap[p.categoryId] || 'Uncategorized') : (p.category || 'Uncategorized'),
      price: p.price,
      comparePrice: p.comparePrice ?? undefined,
      image: p.image,
      images: p.images ?? [],
      description: p.description,
      rating: p.rating,
      reviews: p.reviews,
      stock: p.stock,
      sellerId: p.sellerId,
      sellerName: p.sellerName ?? 'Seller',
      trending: p.trending ?? false,
      discount: p.discount ?? undefined,
      tags: p.tags ?? [],
      deliveryTime: p.deliveryTime ?? undefined,
    } as Product));
  };

  const refreshProducts = async (params: Record<string, string | number | boolean> = {}) => {
    try {
      setLoading(true);
      const list = await api.products.list(params);
      setProducts(mapProducts(list));
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  const getProductsBySeller = (sellerId: string) => {
    return products.filter(p => p.sellerId === sellerId);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductsBySeller, refreshProducts, loading }}>
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

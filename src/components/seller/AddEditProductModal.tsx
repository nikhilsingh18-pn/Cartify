import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const AddEditProductModal: React.FC<Props> = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useProducts();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'rating' | 'reviews'>>({
    name: '',
    category: 'Electronics',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    sellerId: user?.id || '',
    sellerName: user?.name || '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
      setImagePreview(productToEdit.image);
    } else {
      setFormData({
        name: '',
        category: 'Electronics',
        price: 0,
        stock: 0,
        description: '',
        image: '',
        sellerId: user?.id || '',
        sellerName: user?.name || '',
      });
      setImagePreview(null);
    }
  }, [productToEdit, isOpen, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, image: imagePreview || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400.png' };
    if (productToEdit) {
      updateProduct(finalData as Product);
    } else {
      addProduct({
        ...finalData,
        rating: 0,
        reviews: 0,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={onClose} className="text-subtle hover:text-foreground"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md"/>
                      ) : (
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-700 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Garden</option>
                      <option>Groceries</option>
                      <option>Books</option>
                      <option>Beauty & Personal Care</option>
                      <option>Sports & Outdoors</option>
                      <option>Toys & Games</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">{productToEdit ? 'Save Changes' : 'Add Product'}</button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEditProductModal;

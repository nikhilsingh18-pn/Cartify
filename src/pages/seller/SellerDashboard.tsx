import React, { useState, useMemo } from 'react';
import { Package, DollarSign, TrendingUp, ShoppingCart, BarChart3, Plus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import AddEditProductModal from '../../components/seller/AddEditProductModal';
import ProductRow from '../../components/seller/ProductRow';
import { Product } from '../../types';
import { mockOrders } from '../../data/mockOrders';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getProductsBySeller, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const sellerProducts = useMemo(() => {
    return user ? getProductsBySeller(user.id) : [];
  }, [user, getProductsBySeller]);
  
  const sellerOrders = useMemo(() => {
    const sellerProductIds = sellerProducts.map(p => p.id);
    return mockOrders.filter(order => order.items.some(item => sellerProductIds.includes(item.product.id)));
  }, [sellerProducts]);

  const totalRevenue = sellerOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);
  
  const totalOrders = sellerOrders.length;

  const salesData = [
    { month: 'Jan', sales: 40000, orders: 240 },
    { month: 'Feb', sales: 30000, orders: 198 },
    { month: 'Mar', sales: 50000, orders: 312 },
    { month: 'Apr', sales: 45000, orders: 280 },
    { month: 'May', sales: 60000, orders: 390 },
    { month: 'Jun', sales: 55000, orders: 345 }
  ];

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-subtle">Welcome back, {user?.name}!</p>
          </div>
          <button onClick={handleAddProduct} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 font-semibold">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Total Products</h3><Package className="w-8 h-8 text-primary" /></div><p className="text-3xl font-bold text-foreground">{sellerProducts.length}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Total Orders</h3><ShoppingCart className="w-8 h-8 text-blue-500" /></div><p className="text-3xl font-bold text-foreground">{totalOrders}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Total Revenue</h3><DollarSign className="w-8 h-8 text-green-500" /></div><p className="text-3xl font-bold text-foreground">₹{totalRevenue.toLocaleString('en-IN')}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Avg. Rating</h3><TrendingUp className="w-8 h-8 text-yellow-500" /></div><p className="text-3xl font-bold text-foreground">4.7</p></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">My Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">Product</th>
                  <th scope="col" className="p-4">Price</th>
                  <th scope="col" className="p-4">Stock</th>
                  <th scope="col" className="p-4">Rating</th>
                  <th scope="col" className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map(product => (
                  <ProductRow key={product.id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center gap-2 mb-4"><BarChart3 className="w-6 h-6 text-primary" /><h2 className="text-xl font-bold text-foreground">Sales Overview</h2></div><ResponsiveContainer width="100%" height={300}><LineChart data={salesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} /><Line type="monotone" dataKey="sales" stroke="#008060" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center gap-2 mb-4"><BarChart3 className="w-6 h-6 text-primary" /><h2 className="text-xl font-bold text-foreground">Monthly Orders</h2></div><ResponsiveContainer width="100%" height={300}><BarChart data={salesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="orders" fill="#80c0ad" /></BarChart></ResponsiveContainer></div>
        </div>
      </div>
      <AddEditProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productToEdit={productToEdit} />
    </div>
  );
};

export default SellerDashboard;

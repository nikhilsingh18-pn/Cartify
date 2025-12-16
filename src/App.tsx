import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SellerDashboard from './pages/seller/SellerDashboard';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Rewards from './pages/Rewards';
import Apply from './pages/Apply';
import OrderHistory from './pages/profile/OrderHistory';
import TrackOrder from './pages/profile/TrackOrder';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <ProductProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen bg-background font-sans">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/seller/dashboard" element={<SellerDashboard />} />
                    <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/rewards" element={<Rewards />} />
                  </Routes>
                </main>
                <Footer />
                {/* <AIChatbot /> */}
              </div>
            </CartProvider>
          </ProductProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;


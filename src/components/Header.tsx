import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { pendingCount } = useAdmin();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="bg-midnight text-white sticky top-0 z-50 shadow-lg border-b border-ocean-teal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Area */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="flex flex-col items-start group">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-accent drop-shadow-sm italic group-hover:scale-105 transition-transform">
                Cartify
              </span>
            </Link>

            {/* Search Bar - Compacted */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
              <div className="flex w-full bg-white rounded-full overflow-hidden shadow-inner border-2 border-transparent focus-within:border-accent transition-colors h-10">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <button type="submit" className="px-4 bg-ocean-cyan text-white hover:bg-primary transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Login / User Menu */}
            <div className="hidden md:block relative group">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition-all border border-white/10">
                {user ? (
                   <>
                    <img src={user.avatar} alt="avatar" className="w-5 h-5 rounded-full border border-white" />
                    <span>{user.name.split(' ')[0]}</span>
                   </>
                ) : (
                  'Login'
                )}
              </button>
              
              <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 border border-gray-100 overflow-hidden transform origin-top-right">
                {user ? (
                  <>
                    <div className="p-4 bg-ocean-cyan/10 border-b border-gray-100">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{user.role}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-3 hover:bg-ocean-cyan/10 transition-colors">My Profile</Link>
                    {user.role === 'customer' && <Link to="/orders" className="block px-4 py-3 hover:bg-ocean-cyan/10 transition-colors">My Orders</Link>}
                    {user.role === 'seller' && <Link to="/seller/dashboard" className="block px-4 py-3 hover:bg-ocean-cyan/10 transition-colors">Seller Dashboard</Link>}
                    {user.role === 'delivery' && <Link to="/delivery/dashboard" className="block px-4 py-3 hover:bg-ocean-cyan/10 transition-colors">Delivery Dashboard</Link>}
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-ocean-cyan/10 transition-colors flex justify-between items-center">
                        Admin Dashboard
                        {pendingCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{pendingCount}</span>}
                      </Link>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 transition-colors border-t">Logout</button>
                  </>
                ) : (
                  <>
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                      <span className="text-sm font-medium">New here?</span>
                      <Link to="/login" className="text-primary font-bold text-sm hover:underline">Sign Up</Link>
                    </div>
                    <Link to="/login" className="block px-4 py-3 hover:bg-gray-50 transition-colors">Login</Link>
                    <Link to="/login?role=seller" className="block px-4 py-3 hover:bg-gray-50 transition-colors">Seller Login</Link>
                    <Link to="/login?role=admin" className="block px-4 py-3 hover:bg-gray-50 transition-colors">Admin Login</Link>
                  </>
                )}
              </div>
            </div>

            {/* Become a Partner */}
            <Link to="/apply" className="hidden md:flex items-center gap-2 font-semibold text-white hover:text-accent transition-colors">
              <Store className="w-5 h-5" />
              <span className="text-sm">Become a Seller</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center gap-2 font-semibold text-white hover:text-accent transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:block text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-midnight text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-white/20 mt-2 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="flex bg-white rounded-lg overflow-hidden mx-1">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"/>
              <button type="submit" className="px-4 text-primary"><Search className="w-5 h-5" /></button>
            </form>
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2 text-white">
                   <img src={user.avatar} className="w-8 h-8 rounded-full border border-white" alt={user.name} />
                   <span className="font-semibold">{user.name}</span>
                </div>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-white hover:bg-white/10 rounded">My Profile</Link>
                {user.role === 'admin' && <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-white hover:bg-white/10 rounded">Admin Dashboard</Link>}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-200 hover:bg-white/10 rounded">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-white hover:bg-white/10 rounded">Login</Link>
            )}
            <Link to="/apply" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-white hover:bg-white/10 rounded">Become a Seller</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

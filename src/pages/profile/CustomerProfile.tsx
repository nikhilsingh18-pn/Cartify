import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, ShoppingBag, MapPin, Edit, ChevronRight, Save, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Address {
  id: number;
  type: string;
  address: string;
}

const CustomerProfile: React.FC = () => {
  const { user } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    { id: 1, type: 'Home', address: '123, Blossom Heights, Koramangala, Bengaluru - 560034' },
    { id: 2, type: 'Work', address: '456, Tech Park, Whitefield, Bengaluru - 560066' }
  ]);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (addr: Address) => {
    setEditingId(addr.id);
    setEditValue(addr.address);
  };

  const handleSaveClick = (id: number) => {
    setSavedAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, address: editValue } : addr));
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-black text-gray-800 mb-10">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Info */}
        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-pastel-pink to-pastel-blue opacity-50"></div>
            <div className="relative z-10 mt-8">
               <div className="relative inline-block mb-6">
                  <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover" />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors shadow-sm">
                    <Edit size={16} />
                  </button>
               </div>
               <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
               <p className="text-gray-500 font-medium mb-4">{user?.email}</p>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pastel-yellow text-yellow-800 rounded-full text-sm font-bold">
                  Customer
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="md:col-span-2 space-y-8">
          {/* Order History Preview */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-pastel-blue/30 rounded-lg text-blue-600"><ShoppingBag size={24}/></div>
                Order History
              </h3>
              <Link to="/orders" className="text-primary font-bold flex items-center gap-1 text-sm hover:underline">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
               <div>
                  <p className="font-semibold text-gray-800">Recent Orders</p>
                  <p className="text-sm text-gray-500">You have 3 recent orders</p>
               </div>
               <Link to="/orders" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 border">View</Link>
            </div>
          </div>
          
          {/* Saved Addresses */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                 <div className="p-2 bg-pastel-mint/30 rounded-lg text-teal-600"><MapPin size={24}/></div>
                 Saved Addresses
               </h3>
               <button className="text-primary font-bold text-sm flex items-center gap-1 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                 <Plus size={16} /> Add New
               </button>
            </div>

            <div className="space-y-4">
              {savedAddresses.map(addr => (
                <div key={addr.id} className={`p-6 border-2 rounded-2xl transition-all ${editingId === addr.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-pastel-blue bg-white'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-xs uppercase tracking-wider bg-gray-800 text-white px-2.5 py-1 rounded-md">{addr.type}</span>
                    {editingId === addr.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleSaveClick(addr.id)} className="text-green-600 hover:text-green-700 bg-green-100 p-2 rounded-lg transition-colors"><Save size={18}/></button>
                        <button onClick={handleCancelClick} className="text-red-600 hover:text-red-700 bg-red-100 p-2 rounded-lg transition-colors"><X size={18}/></button>
                      </div>
                    ) : (
                      <button onClick={() => handleEditClick(addr)} className="text-gray-400 hover:text-primary p-2 rounded-lg transition-colors hover:bg-gray-50"><Edit size={18}/></button>
                    )}
                  </div>
                  
                  {editingId === addr.id ? (
                    <textarea 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700 font-medium leading-relaxed">{addr.address}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Banknote, Building, Edit } from 'lucide-react';

const SellerProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Seller Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-200" />
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <button className="mt-4 bg-primary-50 text-primary font-semibold px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 mx-auto">
              <Edit size={16}/> Edit Personal Details
            </button>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Building className="text-primary"/> Store Information</h3>
            <p className="text-gray-500">Store details have not been set up yet.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Banknote className="text-primary"/> Banking & Payouts</h3>
            <p className="text-gray-500">Banking details have not been configured.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

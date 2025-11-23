import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Bike, History, Edit, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryProfile: React.FC = () => {
  const { user } = useAuth();
  const vehicleInfo = {
    make: 'Honda',
    model: 'Activa 6G',
    year: '2022',
    plate: 'KA-01-XY-1234'
  };
  const deliveryHistory = [
    { id: 'DEL987', date: '2025-07-20', earnings: 250, items: 3 },
    { id: 'DEL986', date: '2025-07-19', earnings: 450, items: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Delivery Partner Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-200" />
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-subtle">{user?.email}</p>
            <button className="mt-4 bg-primary-50 text-primary font-semibold px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 mx-auto">
              <Edit size={16}/> Edit Profile
            </button>
          </div>
        </div>
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Bike className="text-primary"/> Vehicle Information</h3>
            <div className="p-4 border rounded-md">
              <p className="font-semibold text-lg">{vehicleInfo.make} {vehicleInfo.model} ({vehicleInfo.year})</p>
              <p className="text-subtle">{vehicleInfo.plate}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><History className="text-primary"/> Delivery History</h3>
            <div className="space-y-4">
              {deliveryHistory.map(del => (
                <div key={del.id} className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{del.id} - {del.date}</p>
                    <p className="text-sm text-subtle">{del.items} items delivered</p>
                  </div>
                  <p className="font-semibold text-green-600">₹{del.earnings}</p>
                </div>
              ))}
              <Link to="#" className="text-primary font-semibold flex items-center gap-1 text-sm float-right">
                View All <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfile;

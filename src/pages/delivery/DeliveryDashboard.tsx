import React from 'react';
import { Package, TrendingUp, DollarSign, Star, MapPin, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';

const DeliveryDashboard: React.FC = () => {
  const { user } = useAuth();

  const earningsData = [
    { day: 'Mon', earnings: 1200 },
    { day: 'Tue', earnings: 1500 },
    { day: 'Wed', earnings: 1800 },
    { day: 'Thu', earnings: 1400 },
    { day: 'Fri', earnings: 2000 },
    { day: 'Sat', earnings: 2200 },
    { day: 'Sun', earnings: 1900 }
  ];

  const pendingDeliveries = [
    { id: '1', address: '123 MG Road, Bengaluru', items: 3, payment: 450, time: '2:30 PM' },
    { id: '2', address: '456 Koramangala 5th Block, Bengaluru', items: 2, payment: 325, time: '3:00 PM' },
    { id: '3', address: '789 Indiranagar 100 Feet Road, Bengaluru', items: 5, payment: 780, time: '3:45 PM' },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Delivery Partner Dashboard</h1>
          <p className="text-subtle">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Today's Deliveries</h3><Package className="w-8 h-8 text-primary" /></div><p className="text-3xl font-bold text-foreground">12</p><p className="text-sm text-green-600 mt-2">3 pending</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Total Deliveries</h3><TrendingUp className="w-8 h-8 text-blue-500" /></div><p className="text-3xl font-bold text-foreground">487</p><p className="text-sm text-green-600 mt-2">+15% this month</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Total Earnings</h3><DollarSign className="w-8 h-8 text-green-500" /></div><p className="text-3xl font-bold text-foreground">₹28,470</p><p className="text-sm text-green-600 mt-2">+18% this month</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><div className="flex items-center justify-between mb-2"><h3 className="text-subtle">Your Rating</h3><Star className="w-8 h-8 text-yellow-500" /></div><p className="text-3xl font-bold text-foreground">4.8</p><p className="text-sm text-subtle mt-2">Based on 487 reviews</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Weekly Earnings</h2>
            <ResponsiveContainer width="100%" height={300}><LineChart data={earningsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} /><Line type="monotone" dataKey="earnings" stroke="#008060" strokeWidth={2} /></LineChart></ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Pending Deliveries</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pendingDeliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2"><div className="flex items-start gap-2"><MapPin className="w-5 h-5 text-primary mt-1" /><div><p className="font-semibold text-foreground">{delivery.address}</p><p className="text-sm text-subtle">{delivery.items} items</p></div></div><span className="bg-primary-50 text-primary px-2 py-1 rounded text-sm font-semibold">₹{delivery.payment.toLocaleString('en-IN')}</span></div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t"><div className="flex items-center gap-1 text-sm text-subtle"><Clock className="w-4 h-4" />{delivery.time}</div><button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-sm font-semibold">Start Delivery</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;

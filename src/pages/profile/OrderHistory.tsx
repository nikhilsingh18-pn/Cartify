import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { mockOrders } from '../../data/mockOrders';

const OrderHistory: React.FC = () => {
  const statusColors = {
    delivered: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>
        <div className="space-y-6">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                  <p className="font-bold text-foreground">Order #{order.id}</p>
                  <p className="text-sm text-subtle">Placed on {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                {order.items.slice(0, 2).map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 mb-2">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain rounded-md bg-gray-50" />
                    <div>
                      <p className="font-semibold text-sm">{item.product.name}</p>
                      <p className="text-xs text-subtle">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && <p className="text-xs text-subtle">+ {order.items.length - 2} more items</p>}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <p className="font-bold text-lg">Total: ₹{order.total.toLocaleString('en-IN')}</p>
                <Link to="/track-order" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 text-sm font-semibold">
                  Track Order <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

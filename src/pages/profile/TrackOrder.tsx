import React from 'react';
import { CheckCircle, Truck, Package, Home } from 'lucide-react';

const TrackOrder: React.FC = () => {
  const steps = [
    { icon: CheckCircle, title: 'Order Placed', time: 'Jul 20, 2:15 PM', completed: true },
    { icon: Package, title: 'Packed', time: 'Jul 20, 4:00 PM', completed: true },
    { icon: Truck, title: 'Shipped', time: 'Jul 21, 9:00 AM', completed: true },
    { icon: Home, title: 'Delivered', time: 'Estimated Jul 22', completed: false },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">Track Order</h1>
        <p className="text-subtle mb-8">Order #ORD123456789</p>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start mb-8 last:mb-0">
                <div className={`z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-white' : 'bg-gray-200 text-subtle'}`}>
                  <step.icon size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-subtle">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

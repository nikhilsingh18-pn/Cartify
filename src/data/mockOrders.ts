import { Order } from '../types';
import { realProducts } from './realProducts';

export const mockOrders: Order[] = [
  {
    id: 'ORD123456789',
    customerId: 'user-1',
    items: [
      { product: realProducts.find(p => p.id === 'prod-2')!, quantity: 1 },
      { product: realProducts.find(p => p.id === 'prod-9')!, quantity: 2 },
    ],
    total: 28090,
    status: 'shipped',
    paymentStatus: 'paid',
    deliveryPartnerId: 'del-1',
    createdAt: new Date('2025-07-20T14:15:00Z'),
    shippingAddress: '123, Blossom Heights, Koramangala, Bengaluru',
    trackingNumber: 'CTFY987654321',
  },
  {
    id: 'ORD123456790',
    customerId: 'user-1',
    items: [
      { product: realProducts.find(p => p.id === 'prod-7')!, quantity: 1 },
    ],
    total: 450,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryPartnerId: 'del-2',
    createdAt: new Date('2025-07-18T10:00:00Z'),
    shippingAddress: '123, Blossom Heights, Koramangala, Bengaluru',
  },
  {
    id: 'ORD123456791',
    customerId: 'user-2',
    items: [
      { product: realProducts.find(p => p.id === 'prod-4')!, quantity: 1 },
      { product: realProducts.find(p => p.id === 'prod-13')!, quantity: 1 },
    ],
    total: 10694,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryPartnerId: 'del-1',
    createdAt: new Date('2025-07-15T18:30:00Z'),
    shippingAddress: '456, Tech Park, Whitefield, Bengaluru',
  },
];

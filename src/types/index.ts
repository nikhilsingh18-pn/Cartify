export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'delivery' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
  rewards?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  comparePrice?: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  sellerId: string;
  sellerName: string;
  trending?: boolean;
  discount?: number;
  tags?: string[];
  deliveryTime?: number; // in minutes
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryPartnerId?: string;
  createdAt: Date;
  shippingAddress: string;
  trackingNumber?: string;
}

export interface PartnerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'seller' | 'delivery';
  details: string; // Business name or City
  extraInfo: string; // GST or License
  status: 'pending' | 'approved' | 'rejected';
  date: Date;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

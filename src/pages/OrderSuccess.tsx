import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You will receive an email confirmation shortly. Your order is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="w-full sm:w-auto bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            View My Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;

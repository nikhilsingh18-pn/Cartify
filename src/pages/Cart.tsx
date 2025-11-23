import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shippingCost = cartTotal > 500 ? 0 : 49;
  const total = cartTotal + shippingCost;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row gap-4 p-6 border-b last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-contain rounded"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-semibold text-gray-800 hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 text-xl mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-sm text-primary">
                    Add ₹{(500 - cartTotal).toLocaleString('en-IN')} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-800 transition-colors flex items-center justify-center gap-2 mb-4 font-semibold"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block text-center text-primary hover:text-primary-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

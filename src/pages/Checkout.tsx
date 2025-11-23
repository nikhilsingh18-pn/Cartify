import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postcode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = cartTotal > 500 ? 0 : 49;
  const total = cartTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // In a real app, you would process the payment here
      if (user) {
        updateUser({
          ...user,
          rewards: (user.rewards || 0) + Math.floor(total)
        });
      }
      clearCart();
      navigate('/order-success');
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: 'Details' },
            { num: 2, label: 'Shipping' },
            { num: 3, label: 'Payment' }
          ].map((s, index, arr) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= s.num ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {s.num}
                </div>
                <p className={`mt-2 text-sm font-medium ${step >= s.num ? 'text-primary' : 'text-gray-500'}`}>{s.label}</p>
              </div>
              {index < arr.length - 1 && (
                <div className={`h-1 w-16 mx-2 self-start mt-5 ${step > s.num ? 'bg-primary' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Personal Information</h2>
                  </div>
                  <div className="space-y-4">
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                  </div>
                  <div className="space-y-4">
                    <input name="address" value={formData.address} onChange={handleChange} required placeholder="Address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <div className="grid grid-cols-2 gap-4">
                      <input name="city" value={formData.city} onChange={handleChange} required placeholder="City" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input name="postcode" value={formData.postcode} onChange={handleChange} required placeholder="Postcode" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Payment Information</h2>
                  </div>
                  <div className="space-y-4">
                    <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input name="cardName" value={formData.cardName} onChange={handleChange} placeholder="Cardholder Name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <div className="grid grid-cols-2 gap-4">
                      <input name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">Back</button>
                )}
                <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold">
                  {step === 3 ? `Place Order (₹${total.toLocaleString('en-IN')})` : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 text-xl mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t pt-4 mb-4">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}</span></div>
              </div>
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg text-gray-900"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <CheckCircle className="w-5 h-5" />
                  <span>You'll earn {Math.floor(total)} reward points!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

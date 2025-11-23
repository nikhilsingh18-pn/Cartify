import React, { useState } from 'react';
import { Briefcase, Bike, Send, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Apply: React.FC = () => {
  const [role, setRole] = useState<'seller' | 'delivery'>('seller');
  const [submitted, setSubmitted] = useState(false);
  const { submitApplication } = useAdmin();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '', // Business Name or City
    extraInfo: '', // GST or License
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication({
      ...formData,
      role,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-background">
        <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-lg text-center border border-gray-100">
          <div className="w-20 h-20 bg-mint-light rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="w-10 h-10 text-teal" />
          </div>
          <h2 className="text-3xl font-bold text-midnight mb-4">Application Submitted!</h2>
          <p className="text-subtle text-lg">Thank you for your interest in partnering with Cartify. Your application has been sent to our Admin team for review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-midnight mb-3">Become a Partner</h2>
          <p className="text-subtle text-lg">Join our growing network of sellers and delivery partners.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => setRole('seller')}
            className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-300 ${role === 'seller' ? 'border-teal bg-mint-light text-teal-dark shadow-md' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
          >
            <Briefcase className={`w-10 h-10 mb-3 ${role === 'seller' ? 'text-teal' : 'text-gray-400'}`} />
            <span className="font-bold text-lg">I'm a Seller</span>
          </button>
          <button
            onClick={() => setRole('delivery')}
            className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-300 ${role === 'delivery' ? 'border-teal bg-mint-light text-teal-dark shadow-md' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
          >
            <Bike className={`w-10 h-10 mb-3 ${role === 'delivery' ? 'text-teal' : 'text-gray-400'}`} />
            <span className="font-bold text-lg">Delivery Partner</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-bold text-midnight border-b pb-2">Your Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
            </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
             <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
          </div>
          
          {role === 'seller' && (
            <>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Business/Store Name</label>
                 <input type="text" name="details" required value={formData.details} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                 <input type="text" name="extraInfo" required value={formData.extraInfo} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>
            </>
          )}
          {role === 'delivery' && (
            <>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">City of Operation</label>
                 <input type="text" name="details" required value={formData.details} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number</label>
                 <input type="text" name="extraInfo" required value={formData.extraInfo} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>
            </>
          )}
          
          <button type="submit" className="w-full bg-teal text-white py-4 rounded-xl hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 font-bold text-lg shadow-lg shadow-teal/30 mt-8">
            <Send className="w-5 h-5" /> Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;

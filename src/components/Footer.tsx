import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight text-gray-300 mt-auto border-t border-ocean-teal">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About Cartify</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Your ultimate shopping destination with AI-powered features, multi-vendor support, and seamless shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/apply" className="hover:text-accent transition-colors">Become a Seller</Link></li>
              <li><Link to="/apply" className="hover:text-accent transition-colors">Become a Delivery Partner</Link></li>
              <li><Link to="/seller/dashboard" className="hover:text-accent transition-colors">Seller Login</Link></li>
              <li><Link to="/delivery/dashboard" className="hover:text-accent transition-colors">Delivery Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-accent transition-colors">Help Centre</Link></li>
              <li><Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /><span>support@cartify.shop</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /><span>+91 80 1234 5678</span></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /><span>Jaipur, India</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Cartify. All rights reserved. Built by the Cartify Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

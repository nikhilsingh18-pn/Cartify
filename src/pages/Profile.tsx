import React from 'react';
import { useAuth } from '../context/AuthContext';
import CustomerProfile from './profile/CustomerProfile';
import SellerProfile from './profile/SellerProfile';
import DeliveryProfile from './profile/DeliveryProfile';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderProfile = () => {
    switch (user.role) {
      case 'customer':
        return <CustomerProfile />;
      case 'seller':
        return <SellerProfile />;
      case 'delivery':
        return <DeliveryProfile />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return <>{renderProfile()}</>;
};

export default Profile;

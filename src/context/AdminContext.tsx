import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartnerApplication } from '../types';

interface AdminContextType {
  applications: PartnerApplication[];
  submitApplication: (app: Omit<PartnerApplication, 'id' | 'status' | 'date'>) => void;
  updateApplicationStatus: (id: string, status: PartnerApplication['status']) => void;
  pendingCount: number;
  categories: string[];
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [categories, setCategories] = useState<string[]>([
    'Electronics', 'Fashion', 'Home & Garden', 'Groceries', 'Books', 'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games'
  ]);

  // Load from local storage on mount
  useEffect(() => {
    const savedApps = localStorage.getItem('cartify_applications');
    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    }
    const savedCats = localStorage.getItem('cartify_categories');
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cartify_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('cartify_categories', JSON.stringify(categories));
  }, [categories]);

  const submitApplication = (appData: Omit<PartnerApplication, 'id' | 'status' | 'date'>) => {
    const newApp: PartnerApplication = {
      ...appData,
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      date: new Date(),
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: PartnerApplication['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories(prev => [...prev, name]);
    }
  };

  const removeCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;

  return (
    <AdminContext.Provider value={{ applications, submitApplication, updateApplicationStatus, pendingCount, categories, addCategory, removeCategory }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

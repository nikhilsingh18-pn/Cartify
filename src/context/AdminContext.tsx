import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartnerApplication } from '../types';
import { api } from '../lib/api';

interface AdminContextType {
  applications: PartnerApplication[];
  submitApplication: (app: Omit<PartnerApplication, 'id' | 'status' | 'date'>) => void;
  updateApplicationStatus: (id: string, status: PartnerApplication['status']) => void;
  pendingCount: number;
  categories: string[];
  categoryList: { id: number; name: string }[];
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [categories, setCategories] = useState<string[]>([
    'Electronics', 'Fashion', 'Home & Garden', 'Groceries', 'Books', 'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games'
  ]);
  const [categoryList, setCategoryList] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    api.admin.categories.list().then((cats: { id: number; name: string }[]) => {
      setCategories(cats.map(c => c.name));
      setCategoryList(cats);
      localStorage.setItem('cartify_categories', JSON.stringify(cats.map(c => c.name)));
    }).catch(() => {
      const savedCats = localStorage.getItem('cartify_categories');
      if (savedCats) setCategories(JSON.parse(savedCats));
    });
    api.admin.applications.list().then((apps: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: 'seller' | 'delivery';
      details: string;
      extraInfo: string;
      status: 'pending' | 'approved' | 'rejected';
      date: string;
    }[]) => {
      const normalized = apps.map(a => ({
        id: a.id,
        name: a.name,
        email: a.email,
        phone: a.phone,
        role: a.role,
        details: a.details,
        extraInfo: a.extraInfo,
        status: a.status,
        date: new Date(a.date),
      } as PartnerApplication));
      setApplications(normalized);
      localStorage.setItem('cartify_applications', JSON.stringify(normalized));
    }).catch(() => {
      const savedApps = localStorage.getItem('cartify_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartify_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('cartify_categories', JSON.stringify(categories));
  }, [categories]);

  const submitApplication = async (appData: Omit<PartnerApplication, 'id' | 'status' | 'date'>) => {
    const created = await api.admin.applications.submit(appData);
    const newApp: PartnerApplication = {
      id: created.id,
      name: created.name,
      email: created.email,
      phone: created.phone,
      role: created.role,
      details: created.details,
      extraInfo: created.extraInfo,
      status: created.status,
      date: new Date(created.date),
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = async (id: string, status: PartnerApplication['status']) => {
    await api.admin.applications.updateStatus(id, status);
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const addCategory = async (name: string) => {
    if (categories.includes(name)) return;
    await api.admin.categories.add(name);
    const cats: { id: number; name: string }[] = await api.admin.categories.list();
    setCategories(cats.map((c) => c.name));
    setCategoryList(cats);
  };

  const removeCategory = async (name: string) => {
    const cats: { id: number; name: string }[] = await api.admin.categories.list();
    const target = cats.find((c) => c.name === name);
    if (!target) return;
    await api.admin.categories.remove(target.id);
    const refreshed: { id: number; name: string }[] = await api.admin.categories.list();
    setCategories(refreshed.map((c) => c.name));
    setCategoryList(refreshed);
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;

  return (
    <AdminContext.Provider value={{ applications, submitApplication, updateApplicationStatus, pendingCount, categories, categoryList, addCategory, removeCategory }}>
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

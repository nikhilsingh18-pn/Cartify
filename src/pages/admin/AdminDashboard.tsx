import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, ShoppingBag, Check, X, Clock, Bell, BarChart3, Settings, Grid, Trash2, Plus } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { applications, updateApplicationStatus, categories, addCategory, removeCategory } = useAdmin();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'categories' | 'settings'>('overview');
  const [newCategory, setNewCategory] = useState('');

  // Simulated Real-time Data
  const [liveStats, setLiveStats] = useState({
    activeUsers: 124,
    ordersToday: 45,
    revenueToday: 125000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        ordersToday: prev.ordersToday + (Math.random() > 0.8 ? 1 : 0),
        revenueToday: prev.revenueToday + (Math.random() > 0.8 ? Math.floor(Math.random() * 5000) : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    totalUsers: 1250 + liveStats.activeUsers,
    totalRevenue: 4500000 + liveStats.revenueToday,
    activeSellers: 45,
    pendingApps: applications.filter(a => a.status === 'pending').length
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 min-h-screen hidden md:block fixed left-0 top-20 bottom-0 z-10">
          <div className="p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Main Menu</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <BarChart3 size={20} /> Overview
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'applications' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <Users size={20} /> Applications
                {stats.pendingApps > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.pendingApps}</span>}
              </button>
              <button 
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'categories' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <Grid size={20} /> Categories
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <Settings size={20} /> Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 p-8">
          <div className="mb-10 flex justify-between items-center">
            <div>
               <h1 className="text-4xl font-black text-gray-800 mb-2">Admin Dashboard</h1>
               <p className="text-gray-500 font-medium">Manage your platform in real-time.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 relative cursor-pointer hover:bg-gray-50">
                  <Bell className="text-gray-600" size={20} />
                  {stats.pendingApps > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
               </div>
               <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-700">System Live</span>
               </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 rounded-xl"><Users className="text-blue-600" /></div>
                      <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded">+12%</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800">{stats.totalUsers.toLocaleString()}</h3>
                   <p className="text-gray-500 text-sm font-medium">Total Users</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 rounded-xl"><ShoppingBag className="text-green-600" /></div>
                      <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded">+8%</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800">₹{(stats.totalRevenue / 100000).toFixed(2)}L</h3>
                   <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-purple-50 rounded-xl"><Shield className="text-purple-600" /></div>
                      <span className="text-gray-400 text-sm font-bold bg-gray-50 px-2 py-1 rounded">0%</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800">{stats.activeSellers}</h3>
                   <p className="text-gray-500 text-sm font-medium">Active Sellers</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-orange-50 rounded-xl"><Clock className="text-orange-600" /></div>
                      <span className="text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded">{stats.pendingApps} New</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800">{stats.pendingApps}</h3>
                   <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Live Activity Feed</h3>
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">S</div>
                            <div>
                               <p className="font-bold text-gray-800">New Seller Registration</p>
                               <p className="text-sm text-gray-500">Just now • from Application Form</p>
                            </div>
                         </div>
                         <button className="text-sm text-primary font-bold hover:underline">View Details</button>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Partner Applications</h3>
                <p className="text-gray-500 text-sm">Review and approve new seller and delivery partner requests.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-6">Applicant</th>
                      <th className="p-6">Role</th>
                      <th className="p-6">Details</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">No pending applications found.</td>
                      </tr>
                    ) : (
                      applications.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6">
                            <p className="font-bold text-gray-800">{app.name}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                            <p className="text-sm text-gray-500">{app.phone}</p>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.role === 'seller' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                              {app.role}
                            </span>
                          </td>
                          <td className="p-6">
                            <p className="text-sm text-gray-600"><span className="font-semibold">Info:</span> {app.details}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">ID:</span> {app.extraInfo}</p>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                              app.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            {app.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => updateApplicationStatus(app.id, 'approved')}
                                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                  title="Approve"
                                >
                                  <Check size={18} />
                                </button>
                                <button 
                                  onClick={() => updateApplicationStatus(app.id, 'rejected')}
                                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                  title="Reject"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Manage Categories</h3>
                
                <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
                  <input 
                    type="text" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    placeholder="Enter new category name..." 
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add Category
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 group hover:border-primary transition-colors">
                      <span className="font-semibold text-gray-700">{cat}</span>
                      <button 
                        onClick={() => removeCategory(cat)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-10 h-10 text-gray-400" />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">System Settings</h3>
               <p className="text-gray-500 max-w-md mx-auto">Global platform configuration, payment gateway keys, and email server settings would be managed here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

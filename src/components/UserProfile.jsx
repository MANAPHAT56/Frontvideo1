import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Shield, History, LogOut, Edit2, Save, X, Eye, EyeOff, ChevronRight } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mock user data - ในการใช้งานจริงจะดึงจาก API
  const [userData, setUserData] = useState({
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+66 81 234 5678',
    address: '123 Bangkok Street, Sukhumvit, Bangkok 10110',
    profileImage: null,
    joinDate: '2024-01-15',
    lastLogin: '2025-11-13T10:30:00',
    role: 'user'
  });

  const [editForm, setEditForm] = useState({...userData});
  
  const [paymentHistory] = useState([
    {
      id: '1',
      date: '2025-11-10',
      videoTitle: 'The Great Adventure',
      amount: 299,
      method: 'KPlus',
      status: 'completed',
      transactionId: 'TXN20251110001'
    },
    {
      id: '2',
      date: '2025-11-05',
      videoTitle: 'Comedy Night Special',
      amount: 199,
      method: 'Credit Card',
      status: 'completed',
      transactionId: 'TXN20251105002'
    },
    {
      id: '3',
      date: '2025-10-28',
      videoTitle: 'Documentary: Nature',
      amount: 349,
      method: 'Wallet',
      status: 'completed',
      transactionId: 'TXN20251028003'
    }
  ]);

  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Bangkok, Thailand',
      lastActive: '2025-11-13T10:30:00',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Bangkok, Thailand',
      lastActive: '2025-11-12T18:45:00',
      current: false
    }
  ]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({...userData});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({...userData});
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserData({...editForm});
      setIsEditing(false);
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert('Please fill in all password fields!');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  const handleLogoutDevice = (sessionId) => {
    alert(`Logged out from device: ${sessionId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              VideoStream
            </h1>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              Back
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-b border-gray-700">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 ring-4 ring-gray-800">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{userData.firstName} {userData.lastName}</h2>
                  <p className="text-gray-400 text-sm">@{userData.username}</p>
                  <span className="mt-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                    {userData.role === 'admin' ? 'Administrator' : 'Member'}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all mb-1 ${
                    activeTab === 'personal'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all mb-1 ${
                    activeTab === 'payment'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Payment History
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all mb-1 ${
                    activeTab === 'security'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Security
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all disabled:opacity-50"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-white text-lg">{userData.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-white text-lg">{userData.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                      <div className="flex items-center text-white text-lg">
                        <User className="w-5 h-5 mr-2 text-gray-400" />
                        {userData.username}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <div className="flex items-center text-white text-lg">
                        <Mail className="w-5 h-5 mr-2 text-gray-400" />
                        {userData.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                      {isEditing ? (
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-white text-lg">
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                          {userData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                      {isEditing ? (
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 mr-2 mt-2 text-gray-400" />
                          <textarea
                            value={editForm.address}
                            onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                            rows="3"
                            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>
                      ) : (
                        <div className="flex items-start text-white text-lg">
                          <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                          <span>{userData.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                        <div className="flex items-center text-white text-lg">
                          <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                          {formatDate(userData.joinDate)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Login</label>
                        <div className="flex items-center text-white text-lg">
                          <History className="w-5 h-5 mr-2 text-gray-400" />
                          {formatDateTime(userData.lastLogin)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment History Tab */}
              {activeTab === 'payment' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Payment History</h3>
                  
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{payment.videoTitle}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(payment.date)}
                              </span>
                              <span className="flex items-center">
                                <CreditCard className="w-4 h-4 mr-1" />
                                {payment.method}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Transaction ID: {payment.transactionId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-400">฿{payment.amount}</p>
                            <span className="inline-block px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs mt-1 border border-green-500/30">
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {paymentHistory.length === 0 && (
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No payment history yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Security Settings</h3>

                  {/* Change Password */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all disabled:opacity-50"
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="pt-8 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Active Sessions</h4>
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div key={session.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="text-white font-medium">{session.device}</h5>
                                {session.current && (
                                  <span className="px-2 py-0.5 bg-green-600/20 text-green-400 rounded text-xs border border-green-500/30">
                                    Current
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-400 space-y-1">
                                <p className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {session.location}
                                </p>
                                <p className="flex items-center">
                                  <History className="w-4 h-4 mr-1" />
                                  Last active: {formatDateTime(session.lastActive)}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <button
                                onClick={() => handleLogoutDevice(session.id)}
                                className="flex items-center px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all text-sm border border-red-500/30"
                              >
                                <LogOut className="w-4 h-4 mr-1" />
                                Logout
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
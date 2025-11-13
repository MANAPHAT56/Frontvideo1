import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Shield, History, LogOut, Edit2, Save, X, Eye, EyeOff, ChevronRight, Loader } from 'lucide-react';

const UserProfile = () => {
    const apiBaseUrl = 'https://api.toteja.co';
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock sessions data - ในการใช้งานจริงจะต้องมี session management
  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Bangkok, Thailand',
      lastActive: new Date().toISOString(),
      current: true
    }
  ]);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiBaseUrl+'/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      setUserData(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to load profile data');
    }
  };

  // Fetch purchase history
  const fetchPurchaseHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiBaseUrl+'/api/user/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch purchases');
      
      const data = await response.json();
      setPurchaseHistory(data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      alert('Failed to load purchase history');
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setPageLoading(true);
      await Promise.all([fetchProfile(), fetchPurchaseHistory()]);
      setPageLoading(false);
    };
    loadData();
  }, []);

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
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiBaseUrl+'/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      const updatedUser = await response.json();
      setUserData(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
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
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiBaseUrl+'/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to change password');
      }
      
      alert('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutDevice = (sessionId) => {
    alert(`Logged out from device: ${sessionId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <p className="text-white">Failed to load user data</p>
      </div>
    );
  }

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
                  <h2 className="text-xl font-bold text-white">{userData.email?.split('@')[0]}</h2>
                  <p className="text-gray-400 text-sm">{userData.email}</p>
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
                          {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <div className="flex items-center text-white text-lg">
                        <Mail className="w-5 h-5 mr-2 text-gray-400" />
                        {userData.email}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Account Type</label>
                      <div className="flex items-center text-white text-lg">
                        <Shield className="w-5 h-5 mr-2 text-gray-400" />
                        {userData.role === 'admin' ? 'Administrator' : 'Standard User'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                        <div className="flex items-center text-white text-lg">
                          <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                          {formatDate(userData.createdAt)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Updated</label>
                        <div className="flex items-center text-white text-lg">
                          <History className="w-5 h-5 mr-2 text-gray-400" />
                          {formatDateTime(userData.updatedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Purchased Videos</label>
                      <div className="flex items-center text-white text-lg">
                        <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                        {userData.purchasedVideos?.length || 0} videos purchased
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
                    {purchaseHistory.map((purchase) => (
                      <div key={purchase._id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">
                              {purchase.videoId?.title || 'Unknown Video'}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(purchase.purchaseDate)}
                              </span>
                              {purchase.paymentMethod && (
                                <span className="flex items-center">
                                  <CreditCard className="w-4 h-4 mr-1" />
                                  {purchase.paymentMethod}
                                </span>
                              )}
                              <span className="text-xs">
                                Currency: {purchase.currency}
                              </span>
                            </div>
                            {purchase.transactionId && (
                              <p className="text-xs text-gray-500 mt-1">Transaction ID: {purchase.transactionId}</p>
                            )}
                            {purchase.accessCount > 0 && (
                              <p className="text-xs text-gray-500 mt-1">Played {purchase.accessCount} times</p>
                            )}
                            {purchase.lastAccessedAt && (
                              <p className="text-xs text-gray-500">Last watched: {formatDateTime(purchase.lastAccessedAt)}</p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-blue-400">฿{purchase.amount}</p>
                            <span className={`inline-block px-2 py-1 rounded text-xs mt-1 border ${
                              purchase.status === 'completed' ? 'bg-green-600/20 text-green-400 border-green-500/30' :
                              purchase.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' :
                              purchase.status === 'failed' ? 'bg-red-600/20 text-red-400 border-red-500/30' :
                              'bg-gray-600/20 text-gray-400 border-gray-500/30'
                            }`}>
                              {purchase.status}
                            </span>
                            {purchase.expiresAt && (
                              <p className="text-xs text-gray-500 mt-1">
                                Expires: {formatDate(purchase.expiresAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {purchaseHistory.length === 0 && (
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No payment history yet</p>
                      <p className="text-gray-500 text-sm mt-2">Start purchasing videos to see your transaction history</p>
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
                            placeholder="Enter current password"
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
                          placeholder="Enter new password (min 6 characters)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all disabled:opacity-50 flex items-center"
                      >
                        {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : null}
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
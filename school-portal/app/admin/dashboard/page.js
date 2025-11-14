'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleFormData, setRoleFormData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: []
  });

  // Navigation menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'roles', label: 'Roles & Permissions', icon: '🔐' },
    { id: 'students', label: 'Students', icon: '👨‍🎓' },
    { id: 'teachers', label: 'Teachers', icon: '👩‍🏫' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Stats
  const stats = [
    { label: 'Total Students', value: '2,845', trend: '+12%', isPositive: true, icon: '👨‍🎓', color: 'from-blue-500 to-blue-600' },
    { label: 'Active Teachers', value: '147', trend: '+5%', isPositive: true, icon: '👩‍🏫', color: 'from-green-500 to-green-600' },
    { label: 'Course Success', value: '94%', trend: '+2%', isPositive: true, icon: '📈', color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue', value: '$128.5k', trend: '+18%', isPositive: true, icon: '💰', color: 'from-orange-500 to-orange-600' },
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, user: 'Sarah Wilson', action: 'Added new course', time: '2 minutes ago', icon: '📚', type: 'course' },
    { id: 2, user: 'John Smith', action: 'Updated student records', time: '15 minutes ago', icon: '📝', type: 'student' },
    { id: 3, user: 'Emma Davis', action: 'Scheduled exam', time: '1 hour ago', icon: '📅', type: 'exam' },
    { id: 4, user: 'Michael Brown', action: 'Generated reports', time: '2 hours ago', icon: '📊', type: 'report' },
  ];

  const showTestAlert = (type) => {
    setAlertType(type);
    setShowAlert(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Fixed Position */}
        <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <div className="text-white">
                  <div className="text-sm font-bold">School Portal</div>
                  <div className="text-xs text-indigo-300">Admin Panel</div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer - Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              title={!isSidebarOpen ? 'Logout' : ''}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {isSidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Top Header */}
          <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Toggle Sidebar Button - ALWAYS VISIBLE */}
                <button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Page Title */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Welcome back, SuperAdmin</p>
                </div>
              </div>

              {/* Top Right Actions */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">SuperAdmin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    SA
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {activeTab === 'overview' && (
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-indigo-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                          <div className="mt-3 flex items-baseline space-x-3">
                            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                            <span className={`text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.trend}
                            </span>
                          </div>
                        </div>
                        <div className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${stat.color} opacity-20`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                          <div className="text-2xl">{activity.icon}</div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-semibold">{activity.user}</span> {activity.action}
                            </p>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                            {activity.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Quick Stats</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-600 font-semibold uppercase">Attendance Rate</p>
                        <p className="text-2xl font-bold text-blue-900 mt-2">87%</p>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                          <div className="bg-blue-600 h-2 rounded-full w-[87%]"></div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs text-green-600 font-semibold uppercase">Completion Rate</p>
                        <p className="text-2xl font-bold text-green-900 mt-2">92%</p>
                        <div className="w-full bg-green-200 rounded-full h-2 mt-3">
                          <div className="bg-green-600 h-2 rounded-full w-[92%]"></div>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-600 font-semibold uppercase">System Health</p>
                        <p className="text-2xl font-bold text-purple-900 mt-2">99%</p>
                        <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
                          <div className="bg-purple-600 h-2 rounded-full w-[99%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                      onClick={() => setShowModal(true)}
                    >
                      <span className="text-3xl mb-2">👤</span>
                      <span className="text-sm font-semibold text-gray-700">Add New User</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                      onClick={() => setActiveTab('roles')}
                    >
                      <span className="text-3xl mb-2">🔐</span>
                      <span className="text-sm font-semibold text-gray-700">Manage Roles</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                      onClick={() => showTestAlert('success')}
                    >
                      <span className="text-3xl mb-2">📊</span>
                      <span className="text-sm font-semibold text-gray-700">View Reports</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                      onClick={() => showTestAlert('warning')}
                    >
                      <span className="text-3xl mb-2">⚙️</span>
                      <span className="text-sm font-semibold text-gray-700">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">User Management</h2>
                  <p className="text-gray-600">User management section coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="p-6 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Roles & Permissions</h2>
                      <p className="text-sm text-gray-600 mt-1">Manage roles and assign permissions to users</p>
                    </div>
                    <button
                      onClick={() => setShowRoleModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
                    >
                      <span>➕</span>
                      <span>Create New Role</span>
                    </button>
                  </div>

                  {/* Predefined Roles */}
                  <div className="mb-8">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Predefined Roles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'SuperAdmin', description: 'Full system access', users: 1, color: 'red' },
                        { name: 'Admin', description: 'Administrative access', users: 5, color: 'orange' },
                        { name: 'Teacher', description: 'Classroom management', users: 147, color: 'blue' },
                        { name: 'Student', description: 'Student access', users: 2845, color: 'green' },
                        { name: 'Parent', description: 'Parent access', users: 1200, color: 'purple' },
                      ].map((role) => (
                        <div key={role.name} className={`border-l-4 border-${role.color}-500 bg-${role.color}-50 p-4 rounded-lg`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{role.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                              <p className="text-xs text-gray-500 mt-2">{role.users} users assigned</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">⋮</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Roles */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Custom Roles</h3>
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No custom roles created yet. Click "Create New Role" to add one.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {['students', 'teachers', 'courses', 'reports', 'settings'].includes(activeTab) && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {menuItems.find(m => m.id === activeTab)?.label || 'Section'}
                  </h2>
                  <p className="text-gray-600">This section is under development...</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Alert Component */}
      <Alert
        type={alertType}
        title={`${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert`}
        message={`This is a test ${alertType} alert message. It will auto-close in 5 seconds.`}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        autoClose={5000}
      />

      {/* Modal Component */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add New User"
        primaryButton={{
          text: "Create",
          onClick: () => {
            showTestAlert('success');
            console.log("User created!");
            setShowModal(false);
          }
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: () => {
            setShowModal(false);
            console.log("Cancelled!");
          }
        }}
      >
        <p>User creation form will be displayed here with role assignment options.</p>
      </Modal>

      {/* Role Creation Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create New Role</h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Role Name *</label>
                <input
                  type="text"
                  value={roleFormData.roleName}
                  onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })}
                  placeholder="e.g., Department Head, Accountant"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Role Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={roleFormData.roleDescription}
                  onChange={(e) => setRoleFormData({ ...roleFormData, roleDescription: e.target.value })}
                  placeholder="Describe the purpose of this role..."
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Permissions Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Permissions</label>
                <div className="space-y-6">
                  {/* Students Permissions */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Student Management</h4>
                    <div className="space-y-2">
                      {['View Students', 'Create Student', 'Edit Student', 'Delete Student', 'View Grades'].map((perm) => (
                        <label key={perm} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-2" />
                          <span className="text-sm text-gray-700">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Teachers Permissions */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Teacher Management</h4>
                    <div className="space-y-2">
                      {['View Teachers', 'Create Teacher', 'Edit Teacher', 'Delete Teacher', 'Assign Classes'].map((perm) => (
                        <label key={perm} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-2" />
                          <span className="text-sm text-gray-700">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Grades & Attendance */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Grades & Attendance</h4>
                    <div className="space-y-2">
                      {['View Grades', 'Create Grade', 'Mark Attendance', 'View Attendance', 'Generate Reports'].map((perm) => (
                        <label key={perm} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-2" />
                          <span className="text-sm text-gray-700">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* System Admin */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">System Administration</h4>
                    <div className="space-y-2">
                      {['Manage Users', 'Manage Roles', 'View Audit Logs', 'System Settings', 'Backup Data'].map((perm) => (
                        <label key={perm} className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-2" />
                          <span className="text-sm text-gray-700">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showTestAlert('success');
                  setShowRoleModal(false);
                  setRoleFormData({ roleName: '', roleDescription: '', permissions: [] });
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

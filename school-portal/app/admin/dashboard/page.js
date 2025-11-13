'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);

  const showTestAlert = (type) => {
    setAlertType(type);
    setShowAlert(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Dummy stats data
  const stats = [
    { label: 'Total Students', value: '2,845', trend: '+12%', isPositive: true },
    { label: 'Active Teachers', value: '147', trend: '+5%', isPositive: true },
    { label: 'Course Success', value: '94%', trend: '+2%', isPositive: true },
    { label: 'Revenue', value: '$128.5k', trend: '+18%', isPositive: true },
  ];

  // Dummy recent activities
  const recentActivities = [
    { id: 1, user: 'Sarah Wilson', action: 'Added new course', time: '2 minutes ago', icon: '📚' },
    { id: 2, user: 'John Smith', action: 'Updated student records', time: '15 minutes ago', icon: '📝' },
    { id: 3, user: 'Emma Davis', action: 'Scheduled exam', time: '1 hour ago', icon: '📅' },
    { id: 4, user: 'Michael Brown', action: 'Generated reports', time: '2 hours ago', icon: '📊' },
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 min-h-screen shadow-lg transition-all duration-300 ${!isSidebarOpen ? '-ml-64' : ''}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col">
              <div className="text-xl font-bold text-gray-800">School Portal</div>
              {isSidebarOpen && <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mt-1">SuperAdmin</div>}
            </div>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleSidebar}
              title={isSidebarOpen ? "Collapse menu" : "Expand menu"}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l-7 7 7 7M3 12h18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l7-7-7-7M21 12H3" />
                )}
              </svg>
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            <button
              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Overview
            </button>
            
            <button
              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-colors ${
                activeTab === 'students'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('students')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Students
            </button>

            <button
              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-colors ${
                activeTab === 'teachers'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('teachers')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Teachers
            </button>

            <button
              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-colors ${
                activeTab === 'courses'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Courses
            </button>

            <button
              className={`w-full flex items-center px-4 py-2.5 text-left rounded-lg transition-colors ${
                activeTab === 'reports'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Reports
            </button>
          </nav>

          <button
            className="flex items-center w-full px-4 py-2.5 text-left text-gray-600 hover:bg-gray-50 transition-colors mt-auto border-t"
            onClick={handleLogout}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : ''}`}>
          <header className="bg-white shadow-sm">
            <div className="mx-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, SuperAdmin</h1>
                  <p className="mt-1 text-sm text-gray-600">Here's what's happening in your school today.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 font-semibold text-sm">
                      SA
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">SuperAdmin</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                    <div className={`text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  <svg className="w-8 h-8 text-indigo-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Add New Student</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => showTestAlert('success')}
                >
                  <svg className="w-8 h-8 text-green-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Test Success Alert</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => showTestAlert('error')}
                >
                  <svg className="w-8 h-8 text-red-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Test Error Alert</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => showTestAlert('warning')}
                >
                  <svg className="w-8 h-8 text-yellow-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Test Warning Alert</span>
                </button>
              </div>
            </section>

            {/* Test Components Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Notifications</h2>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => showTestAlert('info')}
                >
                  Show Info Alert
                </button>
                <button 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  Open Test Modal
                </button>
              </div>
            </section>
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
            title="Test Modal"
            primaryButton={{
              text: "Confirm",
              onClick: () => {
                showTestAlert('success');
                console.log("Modal confirmed!");
              }
            }}
            secondaryButton={{
              text: "Cancel",
              onClick: () => console.log("Modal cancelled!")
            }}
          >
            <p>This is a test modal to demonstrate the functionality. You can close it by:</p>
            <ul className="mt-3 ml-6 list-disc">
              <li>Clicking the X button</li>
              <li>Clicking outside the modal</li>
              <li>Pressing the ESC key</li>
              <li>Using the Cancel or Confirm buttons</li>
            </ul>
          </Modal>
        </main>
      </div>
    </>
  );
}
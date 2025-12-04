'use client';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../../components/Alert.js';
import Modal from '../../../components/Modal';
import RolePermission from  "./components/rolepermission";
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);



  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
    experience: '',
    department: ''
  });


  // Dummy Teachers Data
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ahmed Khan', email: 'ahmed@school.com', subject: 'Mathematics', phone: '03001234567', qualification: 'M.Sc', experience: '5 years', department: 'Science', status: 'Active' },
    { id: 2, name: 'Fatima Ali', email: 'fatima@school.com', subject: 'English', phone: '03009876543', qualification: 'M.A', experience: '3 years', department: 'Languages', status: 'Active' },
    { id: 3, name: 'Muhammad Hassan', email: 'hassan@school.com', subject: 'Physics', phone: '03005555555', qualification: 'M.Sc', experience: '7 years', department: 'Science', status: 'Active' },
    { id: 4, name: 'Aisha Malik', email: 'aisha@school.com', subject: 'Chemistry', phone: '03003333333', qualification: 'M.Sc', experience: '4 years', department: 'Science', status: 'Inactive' },
  ]);

  // Dummy Classes Data
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 1', sections: ['A', 'B'], totalStudents: 85, classTeacher: 'Ahmed Khan', status: 'Active' },
    { id: 2, name: 'Class 2', sections: ['A', 'B', 'C'], totalStudents: 125, classTeacher: 'Fatima Ali', status: 'Active' },
    { id: 3, name: 'Class 5', sections: ['A', 'B'], totalStudents: 90, classTeacher: 'Muhammad Hassan', status: 'Active' },
    { id: 4, name: 'Class 10', sections: ['A', 'B', 'C'], totalStudents: 140, classTeacher: 'Aisha Malik', status: 'Active' },
  ]);

  // Form states for classes
  const [showClassModal, setShowClassModal] = useState(false);

  

  // Section view state
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [showTestReportModal, setShowTestReportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentRemark, setStudentRemark] = useState('');
  const [showTeacherProfileModal, setShowTeacherProfileModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Dummy Students Data with Marks and Remarks
  const [sectionStudents, setSectionStudents] = useState({
    '1-A': [
      { id: 1, name: 'Ali Ahmed', rollNo: 1, midExam: 78, finalExam: 85, total: 163, percentage: '81.5%', status: 'Pass', grade: 'A', remark: 'Good performance', classTests: [{ date: '2025-11-05', marks: 18, total: 20, pdf: 'test1.pdf' }, { date: '2025-11-10', marks: 17, total: 20, pdf: 'test2.pdf' }], homeWork: 'Regular submission' },
      { id: 2, name: 'Sara Khan', rollNo: 2, midExam: 92, finalExam: 88, total: 180, percentage: '90%', status: 'Pass', grade: 'A+', remark: 'Excellent student', classTests: [{ date: '2025-11-05', marks: 19, total: 20, pdf: 'test1.pdf' }, { date: '2025-11-10', marks: 18, total: 20, pdf: 'test2.pdf' }], homeWork: 'Consistently excellent' },
      { id: 3, name: 'Hassan Ali', rollNo: 3, midExam: 65, finalExam: 72, total: 137, percentage: '68.5%', status: 'Pass', grade: 'B', remark: 'Needs improvement in concepts', classTests: [{ date: '2025-11-05', marks: 14, total: 20, pdf: 'test1.pdf' }, { date: '2025-11-10', marks: 15, total: 20, pdf: 'test2.pdf' }], homeWork: 'Sometimes incomplete' },
      { id: 4, name: 'Zara Malik', rollNo: 4, midExam: 88, finalExam: 90, total: 178, percentage: '89%', status: 'Pass', grade: 'A+', remark: 'Brilliant student, keep it up', classTests: [{ date: '2025-11-05', marks: 19, total: 20, pdf: 'test1.pdf' }, { date: '2025-11-10', marks: 19, total: 20, pdf: 'test2.pdf' }], homeWork: 'Always on time' },
      { id: 5, name: 'Usman Farooq', rollNo: 5, midExam: 45, finalExam: 52, total: 97, percentage: '48.5%', status: 'Fail', grade: 'F', remark: 'Requires special attention and coaching', classTests: [{ date: '2025-11-05', marks: 10, total: 20, pdf: 'test1.pdf' }, { date: '2025-11-10', marks: 11, total: 20, pdf: 'test2.pdf' }], homeWork: 'Not submitted regularly' },
    ],
    '1-B': [
      { id: 6, name: 'Iqra Hussain', rollNo: 1, midExam: 80, finalExam: 86, total: 166, percentage: '83%', status: 'Pass', grade: 'A', remark: 'Very good progress', classTests: [{ date: '2025-11-05', marks: 18, total: 20, pdf: 'test1.pdf' }], homeWork: 'Mostly complete' },
      { id: 7, name: 'Bilal Khan', rollNo: 2, midExam: 75, finalExam: 79, total: 154, percentage: '77%', status: 'Pass', grade: 'B+', remark: 'Good effort shown', classTests: [{ date: '2025-11-05', marks: 16, total: 20, pdf: 'test1.pdf' }], homeWork: 'Satisfactory' },
      { id: 8, name: 'Hira Ahmed', rollNo: 3, midExam: 91, finalExam: 89, total: 180, percentage: '90%', status: 'Pass', grade: 'A+', remark: 'Outstanding performance', classTests: [{ date: '2025-11-05', marks: 19, total: 20, pdf: 'test1.pdf' }], homeWork: 'Exceptional' },
    ]
  });

  // Navigation menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'roles', label: 'Roles & Permissions', icon: '🔐' },
    { id: 'classes', label: 'Classes & Sections', icon: '🏫' },
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

 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleAddTeacher = () => {
    if (teacherFormData.name && teacherFormData.email) {
      const newTeacher = {
        id: teachers.length + 1,
        ...teacherFormData,
        status: 'Active'
      };
      setTeachers([...teachers, newTeacher]);
      setTeacherFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        qualification: '',
        experience: '',
        department: ''
      });
      setShowTeacherModal(false);
      showTestAlert('success');
    }
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(t => t.id !== id));
    showTestAlert('success');
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

                {/* User Profile Dropdown */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 relative" data-profile-dropdown>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">SuperAdmin</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      SA
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">SuperAdmin</p>
                        <p className="text-xs text-gray-500">Administrator Role</p>
                        <p className="text-xs text-green-600 mt-1">✓ Active</p>
                      </div>

                      {/* View Profile Option */}
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          showTestAlert('info', 'Opening your profile...');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <span>👤</span>
                        <span className="text-sm text-gray-700 font-medium">View Profile</span>
                      </button>

                      {/* Edit Profile Option */}
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          showTestAlert('info', 'Opening profile settings...');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <span>✏️</span>
                        <span className="text-sm text-gray-700 font-medium">Edit Profile</span>
                      </button>

                      <div className="border-t border-gray-200 my-2"></div>

                      {/* Logout Option */}
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          showTestAlert('success', 'Logged out successfully!');
                          setTimeout(() => router.push('/login'), 1500);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <span>🚪</span>
                        <span className="text-sm text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  )}
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
              <RolePermission></RolePermission>
            )}

            {activeTab === 'teachers' && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Teachers Management</h2>
                      <p className="text-sm text-gray-600 mt-1">Manage all teachers and their assignments</p>
                    </div>
                    <button
                      onClick={() => setShowTeacherModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
                    >
                      <span>➕</span>
                      <span>Add New Teacher</span>
                    </button>
                  </div>

                  {/* Teachers Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Experience</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {teacher.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-gray-900">{teacher.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{teacher.email}</td>
                            <td className="py-3 px-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {teacher.subject}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{teacher.department}</td>
                            <td className="py-3 px-4 text-gray-600">{teacher.experience}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                teacher.status === 'Active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {teacher.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                                  ✏️
                                </button>
                                <button 
                                  onClick={() => handleDeleteTeacher(teacher.id)}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Empty State */}
                  {teachers.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No teachers found. Add your first teacher to get started.</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Total Teachers</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{teachers.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Active Teachers</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{teachers.filter(t => t.status === 'Active').length}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Departments</p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">{new Set(teachers.map(t => t.department)).size}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {['students', 'courses', 'reports', 'settings'].includes(activeTab) && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {menuItems.find(m => m.id === activeTab)?.label || 'Section'}
                  </h2>
                  <p className="text-gray-600">This section is under development...</p>
                </div>
              </div>
            )}

            {activeTab === 'classes' && !selectedClass && (
              <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Classes & Sections</h2>
                      <p className="text-sm text-gray-600 mt-1">Manage all school classes and their sections</p>
                    </div>
                    <button
                      onClick={() => setShowClassModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
                    >
                      <span>➕</span>
                      <span>Add New Class</span>
                    </button>
                  </div>

                  {/* Classes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                      <div key={classItem.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{classItem.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">Class Teacher: <span className="font-semibold">{classItem.classTeacher}</span></p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classItem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {classItem.status}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {/* Sections */}
                          <div>
                            <p className="text-xs text-gray-600 font-medium uppercase">Sections</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {classItem.sections.map((section, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setSelectedClass(classItem);
                                    setSelectedSection(section);
                                  }}
                                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition-colors cursor-pointer"
                                >
                                  {classItem.name}-{section}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Students Count */}
                          <div className="pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">{classItem.totalStudents}</p>
                              </div>
                              <div className="text-3xl">👥</div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-3 flex items-center space-x-2">
                            <button className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 font-semibold text-sm">
                              ✏️ Edit
                            </button>
                            <button className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 font-semibold text-sm">
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {classes.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No classes found. Create your first class to get started.</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Total Classes</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{classes.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Total Sections</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{classes.reduce((sum, c) => sum + c.sections.length, 0)}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Total Students</p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">{classes.reduce((sum, c) => sum + c.totalStudents, 0)}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Avg. Students/Class</p>
                      <p className="text-2xl font-bold text-orange-600 mt-2">{Math.round(classes.reduce((sum, c) => sum + c.totalStudents, 0) / (classes.length || 1))}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Detail View with Student Marks */}
            {activeTab === 'classes' && selectedClass && selectedSection && (
              <div className="p-6">
                {/* Back Button & Header */}
                <div className="mb-6 flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedClass(null);
                      setSelectedSection(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center space-x-2"
                  >
                    <span>←</span>
                    <span>Back to Classes</span>
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedClass.name}-{selectedSection}</h2>
                    <p className="text-sm text-gray-600">Class Teacher: {selectedClass.classTeacher}</p>
                  </div>
                </div>

                {/* Students & Marks Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Roll No</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Mid Exam</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Final Exam</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Total</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Percentage</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Grade</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Remarks</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Class Tests</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sectionStudents[`${selectedClass.id}-${selectedSection}`]?.map((student, idx) => (
                          <tr key={student.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition-colors`}>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.rollNo}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{student.midExam}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">{student.finalExam}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">{student.total}</span>
                            </td>
                            <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{student.percentage}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                student.grade === 'A+' ? 'bg-green-100 text-green-800' :
                                student.grade === 'A' ? 'bg-green-100 text-green-800' :
                                student.grade === 'B+' ? 'bg-yellow-100 text-yellow-800' :
                                student.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                student.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setStudentRemark(student.remark || '');
                                  setShowRemarkModal(true);
                                }}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
                                title="Add/Edit Remark"
                              >
                                📝 View
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setShowTestReportModal(true);
                                }}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors"
                                title="View Class Tests"
                              >
                                📄 Tests
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center flex items-center justify-center space-x-2">
                              <button className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors" title="Edit">
                                ✏️
                              </button>
                              <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors" title="Delete">
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-t border-gray-200">
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium uppercase">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{sectionStudents[`${selectedClass.id}-${selectedSection}`]?.length || 0}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium uppercase">Passed</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{sectionStudents[`${selectedClass.id}-${selectedSection}`]?.filter(s => s.status === 'Pass').length || 0}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium uppercase">Failed</p>
                      <p className="text-2xl font-bold text-red-600 mt-2">{sectionStudents[`${selectedClass.id}-${selectedSection}`]?.filter(s => s.status === 'Fail').length || 0}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium uppercase">Avg Percentage</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-2">
                        {(
                          sectionStudents[`${selectedClass.id}-${selectedSection}`]?.reduce((sum, s) => sum + parseFloat(s.percentage), 0) / 
                          (sectionStudents[`${selectedClass.id}-${selectedSection}`]?.length || 1)
                        ).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">⚙️ Settings & Configuration</h1>
                  <p className="text-gray-600 mt-2">Manage school portal settings, preferences, and system configuration</p>
                </div>

                {/* Settings Tabs */}
                <div className="flex space-x-4 border-b border-gray-200 overflow-x-auto">
                  <button className="px-4 py-2 font-semibold text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap">
                    General Settings
                  </button>
                  <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap">
                    School Information
                  </button>
                  <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap">
                    Notification Settings
                  </button>
                  <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap">
                    Security
                  </button>
                  <button className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 whitespace-nowrap">
                    API & Integrations
                  </button>
                </div>

                {/* General Settings Content */}
                <div className="space-y-6">
                  {/* System Features */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-2">✨</span>
                      System Features & Beta Programs
                    </h2>

                    <div className="space-y-4">
                      {/* Raptor Mini Feature */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">🦅 Enable Raptor Mini (Preview)</h3>
                          <p className="text-sm text-gray-600 mt-1">Enable Raptor mini (Preview) for all clients</p>
                          <p className="text-xs text-amber-700 mt-2">⚠️ This is a beta feature. It may be unstable and subject to change.</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-6 h-6 text-amber-500 rounded focus:ring-2" defaultChecked={false} />
                        </label>
                      </div>

                      {/* Advanced Analytics */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">📊 Advanced Analytics Dashboard</h3>
                          <p className="text-sm text-gray-600 mt-1">Enable comprehensive analytics and detailed reporting features</p>
                          <p className="text-xs text-blue-700 mt-2">✓ Stable feature, recommended for all users</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-6 h-6 text-blue-500 rounded focus:ring-2" defaultChecked={true} />
                        </label>
                      </div>

                      {/* Mobile App Support */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">📱 Mobile App Support</h3>
                          <p className="text-sm text-gray-600 mt-1">Enable mobile application access and mobile-specific features</p>
                          <p className="text-xs text-green-700 mt-2">✓ Available for iOS and Android</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-6 h-6 text-green-500 rounded focus:ring-2" defaultChecked={true} />
                        </label>
                      </div>

                      {/* AI-Powered Suggestions */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">🤖 AI-Powered Suggestions (Beta)</h3>
                          <p className="text-sm text-gray-600 mt-1">Get intelligent recommendations for student improvements and resource allocation</p>
                          <p className="text-xs text-purple-700 mt-2">⚠️ Beta feature - limited availability</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-6 h-6 text-purple-500 rounded focus:ring-2" defaultChecked={false} />
                        </label>
                      </div>

                      {/* Dark Mode */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">🌙 Dark Mode Theme</h3>
                          <p className="text-sm text-gray-600 mt-1">Enable dark theme for reduced eye strain in low-light environments</p>
                          <p className="text-xs text-gray-700 mt-2">✓ Experimental feature</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="w-6 h-6 text-gray-600 rounded focus:ring-2" defaultChecked={false} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Display Preferences */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-2">🎨</span>
                      Display Preferences
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items Per Page */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Items Per Page</label>
                        <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                          <option>10 items</option>
                          <option selected>25 items</option>
                          <option>50 items</option>
                          <option>100 items</option>
                        </select>
                      </div>

                      {/* Date Format */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Date Format</label>
                        <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                          <option selected>DD/MM/YYYY</option>
                          <option>MM/DD/YYYY</option>
                          <option>YYYY-MM-DD</option>
                          <option>DD-MMM-YYYY</option>
                        </select>
                      </div>

                      {/* Time Zone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Time Zone</label>
                        <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                          <option selected>UTC+05:00 (Pakistan Time)</option>
                          <option>UTC+00:00 (GMT)</option>
                          <option>UTC+01:00 (CET)</option>
                          <option>UTC-05:00 (EST)</option>
                        </select>
                      </div>

                      {/* Language */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                        <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                          <option selected>English</option>
                          <option>Urdu</option>
                          <option>Arabic</option>
                          <option>Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* System Performance */}
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-2">⚡</span>
                      System Performance
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Cache Management</p>
                          <p className="text-sm text-gray-600 mt-1">Clear cached data to improve performance</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                          Clear Cache
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Database Optimization</p>
                          <p className="text-sm text-gray-600 mt-1">Optimize database tables and indexes</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                          Optimize DB
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Backup System</p>
                          <p className="text-sm text-gray-600 mt-1">Create a backup of all system data</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                          Start Backup
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* About & Support */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm p-6 border border-indigo-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-2">ℹ️</span>
                      About & Support
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold uppercase">System Version</p>
                        <p className="text-2xl font-bold text-indigo-600 mt-2">v2.5.1</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold uppercase">Last Updated</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">Nov 17, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold uppercase">Support</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                          <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        📖 Documentation
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        💬 Feedback
                      </button>
                      <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                        🐛 Report Bug
                      </button>
                    </div>
                  </div>

                  {/* Save Settings */}
                  <div className="flex gap-3 justify-end pt-4">
                    <button className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                      Discard Changes
                    </button>
                    <button onClick={() => showTestAlert('success', 'All settings saved successfully!')} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                      ✓ Save All Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>



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


      {/* Teacher Creation Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add New Teacher</h2>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={teacherFormData.name}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, name: e.target.value })}
                      placeholder="Enter teacher name"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      value={teacherFormData.email}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={teacherFormData.phone}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Qualification</label>
                    <select
                      value={teacherFormData.qualification}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, qualification: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    >
                      <option>Select qualification</option>
                      <option>B.Sc</option>
                      <option>M.Sc</option>
                      <option>B.A</option>
                      <option>M.A</option>
                      <option>B.Ed</option>
                      <option>M.Ed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Subject/Specialization</label>
                    <input
                      type="text"
                      value={teacherFormData.subject}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, subject: e.target.value })}
                      placeholder="e.g., Mathematics, English"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                    <select
                      value={teacherFormData.department}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, department: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    >
                      <option>Select department</option>
                      <option>Science</option>
                      <option>Languages</option>
                      <option>Mathematics</option>
                      <option>Social Studies</option>
                      <option>Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Years of Experience</label>
                    <input
                      type="text"
                      value={teacherFormData.experience}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, experience: e.target.value })}
                      placeholder="e.g., 5 years"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  <strong>Note:</strong> All marked with (*) are required fields. You can edit teacher details later if needed.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowTeacherModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!teacherFormData.name || !teacherFormData.email}
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4 flex items-center justify-between text-white border-b">
              <h2 className="text-lg font-bold">Create New Class</h2>
              <button
                onClick={() => setShowClassModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Class Name *</label>
                    <select
                      value={classFormData.className}
                      onChange={(e) => setClassFormData({ ...classFormData, className: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    >
                      <option value="">Select Class</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sections *</label>
                    <input
                      type="text"
                      value={classFormData.sections}
                      onChange={(e) => setClassFormData({ ...classFormData, sections: e.target.value })}
                      placeholder="e.g., A, B, C (comma separated)"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              </div>

              {/* Class Teacher Assignment */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Class Teacher Assignment</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Select Class Teacher *</label>
                  <div className="flex gap-2">
                    <select
                      value={classFormData.classTeacher}
                      onChange={(e) => setClassFormData({ ...classFormData, classTeacher: e.target.value })}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    >
                      <option value="">Select a teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                          {teacher.name} - {teacher.subject}
                        </option>
                      ))}
                    </select>
                    {classFormData.classTeacher && (
                      <button
                        onClick={() => {
                          const selectedTeacherObj = teachers.find(t => t.name === classFormData.classTeacher);
                          if (selectedTeacherObj) {
                            setSelectedTeacher(selectedTeacherObj);
                            setShowTeacherProfileModal(true);
                          }
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold whitespace-nowrap"
                        title="View Teacher Profile"
                      >
                        👤 View Profile
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">The selected teacher will be responsible for this entire class.</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-700">
                  <strong>Note:</strong> All marked with (*) are required fields. You can edit class details later if needed.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowClassModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showTestAlert('success');
                  setShowClassModal(false);
                  setClassFormData({ className: '', sections: '', classTeacher: '' });
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!classFormData.className || !classFormData.sections || !classFormData.classTeacher}
              >
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remarks Modal */}
      {showRemarkModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between text-white border-b">
              <h2 className="text-lg font-bold">📝 Student Remarks & Homework</h2>
              <button
                onClick={() => setShowRemarkModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">STUDENT NAME</p>
                    <p className="text-lg font-bold text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">ROLL NO</p>
                    <p className="text-lg font-bold text-gray-900">{selectedStudent.rollNo}</p>
                  </div>
                </div>
              </div>

              {/* Remarks Section */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📌 Academic Remarks</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Remarks/Comments</label>
                  <textarea
                    value={studentRemark}
                    onChange={(e) => setStudentRemark(e.target.value)}
                    placeholder="Enter remarks about student performance, behavior, areas of improvement, etc..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-vertical min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500 mt-2">Max 500 characters</p>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📊 Performance Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">MID EXAM</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.midExam}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">FINAL EXAM</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedStudent.finalExam}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">PERCENTAGE</p>
                    <p className="text-2xl font-bold text-green-600">{selectedStudent.percentage}%</p>
                  </div>
                </div>
              </div>

              {/* Homework Status */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">📚 Homework Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Overall Homework Status</p>
                      <p className="text-sm text-gray-600">{selectedStudent.homeWork || 'Active'}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      ✓ Assigned
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Remarks are visible to parents and students. Keep them constructive and professional.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowRemarkModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showTestAlert('success', 'Remarks saved successfully!');
                  setShowRemarkModal(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Save Remarks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Test Report Modal */}
      {showTestReportModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 flex items-center justify-between text-white border-b">
              <h2 className="text-lg font-bold">📄 Class Test Reports & Homework</h2>
              <button
                onClick={() => setShowTestReportModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">STUDENT NAME</p>
                    <p className="text-lg font-bold text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">ROLL NO</p>
                    <p className="text-lg font-bold text-gray-900">{selectedStudent.rollNo}</p>
                  </div>
                </div>
              </div>

              {/* Class Tests Section */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📋 Class Test Results</h3>
                {selectedStudent.classTests && selectedStudent.classTests.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStudent.classTests.map((test, index) => (
                      <div key={index} className="border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">Test {index + 1}: {test.subject || 'General'}</p>
                            <p className="text-sm text-gray-600">📅 Date: {test.date || 'N/A'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{test.marks}/{test.total}</p>
                            <p className="text-xs text-gray-600">Marks Obtained</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2 w-full">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                            style={{ width: `${(test.marks / test.total) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm font-semibold text-gray-700">
                            Percentage: {((test.marks / test.total) * 100).toFixed(1)}%
                          </span>
                          {test.pdfUrl && (
                            <a
                              href={test.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors"
                            >
                              📎 View PDF
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-gray-600 font-semibold">No class tests recorded yet</p>
                    <p className="text-sm text-gray-500 mt-1">Tests will appear here once added</p>
                  </div>
                )}
              </div>

              {/* Homework Section */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📚 Homework & Assignments</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Current Homework Status</p>
                        <p className="text-sm text-gray-600 mt-1">{selectedStudent.homeWork || 'All assignments active and on track'}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        ✓ Active
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">5</p>
                      <p className="text-xs text-gray-600 font-semibold mt-1">Pending</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-xs text-gray-600 font-semibold mt-1">Submitted</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-red-600">1</p>
                      <p className="text-xs text-gray-600 font-semibold mt-1">Late</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Performance */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">📊 Overall Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">AVERAGE TEST SCORE</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                      {selectedStudent.classTests && selectedStudent.classTests.length > 0
                        ? (selectedStudent.classTests.reduce((sum, t) => sum + (t.marks / t.total) * 100, 0) / selectedStudent.classTests.length).toFixed(1)
                        : 'N/A'}%
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">OVERALL GRADE</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{selectedStudent.grade || 'A'}</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  <strong>Note:</strong> Class tests and homework records are automatically synced from the system.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowTestReportModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
              <a
                href="#"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                📥 Download Report
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Profile Modal */}
      {showTeacherProfileModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between text-white border-b">
              <h2 className="text-lg font-bold">👩‍🏫 Teacher Profile</h2>
              <button
                onClick={() => setShowTeacherProfileModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Profile Header with Status */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedTeacher.name}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedTeacher.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedTeacher.status}
                    </span>
                  </div>
                  <p className="text-emerald-700 font-semibold mt-1">🎓 {selectedTeacher.subject}</p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📋 Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">EMAIL ADDRESS</p>
                    <p className="text-gray-900 font-medium mt-1">📧 {selectedTeacher.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">PHONE NUMBER</p>
                    <p className="text-gray-900 font-medium mt-1">📱 {selectedTeacher.phone}</p>
                  </div>
                </div>
              </div>

              {/* Academic Qualifications */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">🎯 Academic Qualifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">QUALIFICATION</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">{selectedTeacher.qualification}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">EXPERIENCE</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">{selectedTeacher.experience}</p>
                  </div>
                </div>
              </div>

              {/* Department & Subject */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">🏢 Department & Subject</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">DEPARTMENT</p>
                    <p className="text-lg font-bold text-orange-600 mt-2">{selectedTeacher.department}</p>
                  </div>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-semibold">SUBJECT</p>
                    <p className="text-lg font-bold text-pink-600 mt-2">{selectedTeacher.subject}</p>
                  </div>
                </div>
              </div>

              {/* Performance & Assignments */}
              <div className="border-b pb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">📊 Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-indigo-600">4</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Classes Assigned</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">156</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Total Students</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-yellow-600">94%</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Rating</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">ℹ️ Additional Details</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Joining Date:</span>
                    <span className="text-gray-900">January 15, 2020</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-semibold">Total Leave Balance:</span>
                    <span className="text-gray-900">8 days</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-semibold">Last Updated:</span>
                    <span className="text-gray-900">November 10, 2025</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-700">
                  <strong>Note:</strong> This teacher has an excellent track record with consistent positive feedback from students and parents.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowTeacherProfileModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showTestAlert('success', 'Profile saved!');
                  setShowTeacherProfileModal(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                ✓ Assign as Class Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


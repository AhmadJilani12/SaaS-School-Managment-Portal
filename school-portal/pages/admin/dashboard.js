import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/AdminDashboard.module.css';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';

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
      <Head>
        <title>SuperAdmin Dashboard - School Portal</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.collapsed : ''}`}>
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>School Portal</div>
              {isSidebarOpen && <div className={styles.adminBadge}>SuperAdmin</div>}
            </div>
            <button className={styles.menuToggle} onClick={toggleSidebar} title={isSidebarOpen ? "Collapse menu" : "Expand menu"}>
              <svg className={styles.toggleIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l-7 7 7 7M3 12h18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l7-7-7-7M21 12H3" />
                )}
              </svg>
            </button>
          </div>
          
          <nav className={styles.nav}>
            <button
              className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Overview
            </button>
            
            <button
              className={`${styles.navItem} ${activeTab === 'students' ? styles.active : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Students
            </button>

            <button
              className={`${styles.navItem} ${activeTab === 'teachers' ? styles.active : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Teachers
            </button>

            <button
              className={`${styles.navItem} ${activeTab === 'courses' ? styles.active : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Courses
            </button>

            <button
              className={`${styles.navItem} ${activeTab === 'reports' ? styles.active : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Reports
            </button>
          </nav>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <svg className={styles.logoutIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className={`${styles.main} ${isSidebarOpen ? '' : styles.expanded}`}>
          <header className={styles.header}>
            <div className={styles.welcomeText}>
              <h1>Welcome Back, SuperAdmin</h1>
              <p>Here's what's happening in your school today.</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.actionButton}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className={styles.adminProfile}>
                <div className={styles.adminAvatar}>SA</div>
                <div className={styles.adminInfo}>
                  <span className={styles.adminName}>SuperAdmin</span>
                  <span className={styles.adminRole}>Administrator</span>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stat.value}</h3>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                  <div className={`${styles.statTrend} ${stat.isPositive ? styles.positive : styles.negative}`}>
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <section className={styles.recentActivity}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <div className={styles.activityList}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={styles.activityItem}>
                    <span className={styles.activityIcon}>{activity.icon}</span>
                    <div className={styles.activityInfo}>
                      <p className={styles.activityText}>
                        <strong>{activity.user}</strong> {activity.action}
                      </p>
                      <span className={styles.activityTime}>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button 
                  className={styles.actionCard}
                  onClick={() => setShowModal(true)}
                >
                  <svg className={styles.actionCardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add New Student
                </button>
                <button 
                  className={styles.actionCard}
                  onClick={() => showTestAlert('success')}
                >
                  <svg className={styles.actionCardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Test Success Alert
                </button>
                <button 
                  className={styles.actionCard}
                  onClick={() => showTestAlert('error')}
                >
                  <svg className={styles.actionCardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Test Error Alert
                </button>
                <button 
                  className={styles.actionCard}
                  onClick={() => showTestAlert('warning')}
                >
                  <svg className={styles.actionCardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Test Warning Alert
                </button>
              </div>
            </section>

            {/* Test Components Section */}
            <section className={styles.recentActivity}>
              <h2 className={styles.sectionTitle}>Test Notifications</h2>
              <div className={styles.testButtons}>
                <button 
                  className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
                  onClick={() => showTestAlert('info')}
                  style={{ marginRight: '12px' }}
                >
                  Show Info Alert
                </button>
                <button 
                  className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
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
            <ul style={{ marginTop: '12px', marginLeft: '24px' }}>
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
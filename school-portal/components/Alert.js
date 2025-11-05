import { useEffect } from 'react';
import styles from '../styles/AdminDashboard.module.css';

const Alert = ({ type = 'info', title, message, show, onClose, autoClose = 5000 }) => {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, onClose]);

  if (!show) return null;

  const icons = {
    success: (
      <svg className={styles.alertIcon} viewBox="0 0 24 24" fill="none" stroke="#34d399">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg className={styles.alertIcon} viewBox="0 0 24 24" fill="none" stroke="#f87171">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg className={styles.alertIcon} viewBox="0 0 24 24" fill="none" stroke="#fbbf24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    info: (
      <svg className={styles.alertIcon} viewBox="0 0 24 24" fill="none" stroke="#60a5fa">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div className={`${styles.alert} ${styles[type]} ${styles.show}`}>
      {icons[type]}
      <div className={styles.alertContent}>
        <div className={styles.alertTitle}>{title}</div>
        {message && <div className={styles.alertMessage}>{message}</div>}
      </div>
      <button className={styles.alertClose} onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
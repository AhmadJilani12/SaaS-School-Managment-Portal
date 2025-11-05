import { useEffect, useCallback } from 'react';
import styles from '../styles/AdminDashboard.module.css';

const Modal = ({
  show,
  onClose,
  title,
  children,
  primaryButton = { text: 'Confirm', onClick: () => {} },
  secondaryButton = { text: 'Cancel', onClick: () => {} },
  showFooter = true
}) => {
  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [show, handleEscape]);

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.show : ''}`} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {children}
        </div>

        {showFooter && (
          <div className={styles.modalFooter}>
            <button 
              className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
              onClick={(e) => {
                e.preventDefault();
                secondaryButton.onClick();
                onClose();
              }}
            >
              {secondaryButton.text}
            </button>
            <button 
              className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
              onClick={(e) => {
                e.preventDefault();
                primaryButton.onClick();
                onClose();
              }}
            >
              {primaryButton.text}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
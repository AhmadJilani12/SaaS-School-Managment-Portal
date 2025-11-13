import { useEffect, useCallback } from 'react';

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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 transition-opacity ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>

        {showFooter && (
          <div className="flex items-center justify-end gap-3 p-4 border-t">
            <button 
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                secondaryButton.onClick();
                onClose();
              }}
            >
              {secondaryButton.text}
            </button>
            <button 
              className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
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
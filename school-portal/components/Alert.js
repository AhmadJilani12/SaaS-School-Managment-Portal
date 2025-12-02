// import { useEffect } from 'react';

// const Alert = ({ type = 'info', title, message, show, onClose, autoClose = 5000 }) => {
//   useEffect(() => {
//     if (show && autoClose) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, autoClose);
//       return () => clearTimeout(timer);
//     }
//   }, [show, autoClose, onClose]);

//   if (!show) return null;

//   const typeClasses = {
//     success: 'bg-green-50 text-green-800 border-green-200',
//     error: 'bg-red-50 text-red-800 border-red-200',
//     warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
//     info: 'bg-blue-50 text-blue-800 border-blue-200'
//   };

//   const icons = {
//     success: (
//       <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     ),
//     error: (
//       <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     ),
//     warning: (
//       <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//         />
//       </svg>
//     ),
//     info: (
//       <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     ),
//   };

//   return (
//     <div className={`fixed bottom-4 right-4 z-50 flex items-start w-full max-w-sm overflow-hidden rounded-lg border shadow-lg animate-slide-up ${typeClasses[type]}`}>
//       <div className="flex items-center p-4">
//         {icons[type]}
//         <div className="ml-3">
//           <div className="font-semibold">{title}</div>
//           {message && <div className="mt-1 text-sm opacity-90">{message}</div>}
//         </div>
//       </div>
//       <button
//         className="p-2 hover:opacity-75 transition-opacity"
//         onClick={onClose}
//         aria-label="Close"
//       >
//         <svg
//           className="w-4 h-4"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default Alert;


import { useEffect } from 'react';

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

  const typeClasses = {
    success: 'border-green-300 bg-green-50 text-green-800',
    error: 'border-red-300 bg-red-50 text-red-800',
    warning: 'border-yellow-300 bg-yellow-50 text-yellow-800',
    info: 'border-blue-300 bg-blue-50 text-blue-800',
  };

  const icons = {
    success: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start w-[330px] p-4 rounded-xl shadow-xl border backdrop-blur-lg transition-all duration-300
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        ${typeClasses[type]}
      `}
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <div>
          <h4 className="font-semibold text-[15px]">{title}</h4>
          {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
        </div>
      </div>

      <button
        className="ml-auto p-1 text-gray-600 hover:text-black transition"
        onClick={onClose}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Alert;

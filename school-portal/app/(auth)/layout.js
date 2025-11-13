'use client';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      {children}
    </div>
  );
}
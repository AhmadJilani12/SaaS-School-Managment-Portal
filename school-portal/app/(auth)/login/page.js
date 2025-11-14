'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [eyePosition, setEyePosition] = useState({ 
    x: 0, 
    focused: false, 
    isPasswordField: false,
    isTyping: false 
  });

  useEffect(() => {
    let typingTimeout;
    
    if (formData.email || formData.password) {
      setEyePosition(prev => ({
        x: Math.random() > 0.5 ? 8 : -8,
        focused: true,
        isPasswordField: Boolean(formData.password && formData.password === document.activeElement.value),
        isTyping: true
      }));

      const positionTimeout = setTimeout(() => {
        setEyePosition(prev => ({ ...prev, x: 0 }));
      }, 400);

      typingTimeout = setTimeout(() => {
        setEyePosition(prev => ({ ...prev, isTyping: false }));
      }, 2000);

      return () => {
        clearTimeout(positionTimeout);
        clearTimeout(typingTimeout);
      };
    }
  }, [formData.email, formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.email === 'SuperAdmin' && formData.password === '12345678') {
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setEyePosition(prev => ({
      ...prev,
      isPasswordField: name === 'password'
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const isValid = formData.email && formData.password.length >= 6;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5 font-inter relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md bg-white/95 rounded-3xl p-10 shadow-2xl backdrop-blur-sm border border-white/20">
          <div className="text-2xl font-bold text-center mb-5 text-gray-900 tracking-tight">
            School Portal
          </div>
          
          <div className="flex justify-center mb-5 h-[70px] gap-5">
            {/* Left Eye */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <svg 
                width="100" 
                height="70" 
                viewBox="0 0 100 70" 
                className={`transform-gpu ${eyePosition.focused ? 'eye-focused' : ''} ${eyePosition.isPasswordField ? 'password-typing' : ''}`}
                style={{ 
                  '--eye-x': `${eyePosition.x}px`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  animation: 'naturalBlink 10s infinite'
                }}
              >
                <path 
                  d="M25 18 C35 18 40 12 50 12 C60 12 65 16 75 18" 
                  stroke="#1a1a1a" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                  className="transition-transform duration-300 ease-in-out"
                />
                <g className={`transition-opacity duration-200 ${!eyePosition.isPasswordField ? 'opacity-100' : 'opacity-0'}`}>
                  <ellipse cx="50" cy="35" rx="20" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="3"/>
                  <circle 
                    cx="50" 
                    cy="35" 
                    r="8" 
                    fill="#1a1a1a" 
                    className="transition-transform duration-300"
                    style={{ transform: eyePosition.focused ? `translateX(${eyePosition.x}px)` : 'none' }}
                  />
                </g>
                <path 
                  d="M30 35 Q50 45 70 35" 
                  stroke="#1a1a1a" 
                  strokeWidth="3" 
                  fill="none"
                  className={`transition-opacity duration-200 ${eyePosition.isPasswordField ? 'opacity-100' : 'opacity-0'}`}
                />
              </svg>
            </div>

            {/* Right Eye (same structure as left) */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <svg 
                width="100" 
                height="70" 
                viewBox="0 0 100 70" 
                className={`transform-gpu ${eyePosition.focused ? 'eye-focused' : ''} ${eyePosition.isPasswordField ? 'password-typing' : ''}`}
                style={{ 
                  '--eye-x': `${eyePosition.x}px`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  animation: 'naturalBlink 10s infinite'
                }}
              >
                <path 
                  d="M25 18 C35 18 40 12 50 12 C60 12 65 16 75 18" 
                  stroke="#1a1a1a" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                  className="transition-transform duration-300 ease-in-out"
                />
                <g className={`transition-opacity duration-200 ${!eyePosition.isPasswordField ? 'opacity-100' : 'opacity-0'}`}>
                  <ellipse cx="50" cy="35" rx="20" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="3"/>
                  <circle 
                    cx="50" 
                    cy="35" 
                    r="8" 
                    fill="#1a1a1a" 
                    className="transition-transform duration-300"
                    style={{ transform: eyePosition.focused ? `translateX(${eyePosition.x}px)` : 'none' }}
                  />
                </g>
                <path 
                  d="M30 35 Q50 45 70 35" 
                  stroke="#1a1a1a" 
                  strokeWidth="3" 
                  fill="none"
                  className={`transition-opacity duration-200 ${eyePosition.isPasswordField ? 'opacity-100' : 'opacity-0'}`}
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2 text-center text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to continue to your dashboard
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-gray-700 font-medium tracking-tight">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-[15px] w-full text-gray-800 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-gray-700 font-medium tracking-tight">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg text-[15px] w-full pr-12 text-gray-800 transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-right -mt-3">
              <Link href="/forgot-password" className="text-sm text-indigo-500 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className={`py-3.5 px-4 rounded-lg text-base font-semibold text-white tracking-tight flex items-center justify-center transition-all
                ${isValid && !loading ? 'bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 active:translate-y-0' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isValid || loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-[15px]">
            Don't have an account?
            <Link href="/signup" className="text-indigo-500 hover:underline font-semibold ml-1.5">
              Sign up
            </Link>
          </p>

          <p className="text-center mt-6 text-gray-600 text-[15px]">
            Designed & Developed by <span className="text-blue-500 underline">Ahmad Jillani (Software Developer)</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes naturalBlink {
          0%, 96%, 100% { transform: scaleY(1); }
          97%, 99% { transform: scaleY(0.1); }
        }
      `}</style>
    </>
  );
}
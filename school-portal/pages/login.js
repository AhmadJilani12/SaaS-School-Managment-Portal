import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';
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
      // Set different eye states for password and email
      setEyePosition(prev => ({
        x: Math.random() > 0.5 ? 8 : -8,
        focused: true,
        isPasswordField: Boolean(formData.password && formData.password === document.activeElement.value),
        isTyping: true
      }));

      // Reset pupil position after movement
      const positionTimeout = setTimeout(() => {
        setEyePosition(prev => ({ ...prev, x: 0 }));
      }, 400);

      // Keep eyes alert for 2 seconds after typing
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
      // Check for SuperAdmin credentials
      if (formData.email === 'SuperAdmin' && formData.password === '12345678') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
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
    // Update eye state based on which field is being typed in
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
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.logo}>
            School Portal
          </div>
          
          <div className={styles.watchingEyes}>
            {/* Left Eye */}
            <div className={styles.eyeContainer}>
              <svg 
                width="100" 
                height="70" 
                viewBox="0 0 100 70" 
                className={`${styles.eye} ${eyePosition.focused ? styles.focused : ''} ${eyePosition.isPasswordField ? styles.passwordTyping : ''}`}
                style={{ 
                  '--eye-x': `${eyePosition.x}px`,
                }}
              >
                {/* Left Eyebrow */}
                <path 
                  d="M25 18 C35 18 40 12 50 12 C60 12 65 16 75 18" 
                  stroke="#1a1a1a" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                  className={styles.eyebrow}
                />
                {/* Eye - Open State */}
                <g className={styles.openEye}>
                  <ellipse cx="50" cy="35" rx="20" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="3"/>
                  <circle 
                    cx="50" 
                    cy="35" 
                    r="8" 
                    fill="#1a1a1a" 
                    className={styles.pupil}
                  />
                </g>
                {/* Eye - Closed State */}
                <path 
                  d="M30 35 Q50 45 70 35" 
                  stroke="#1a1a1a" 
                  strokeWidth="3" 
                  fill="none"
                  className={styles.closedEye}
                />
              </svg>
            </div>

            {/* Right Eye */}
            <div className={styles.eyeContainer}>
              <svg 
                width="100" 
                height="70" 
                viewBox="0 0 100 70" 
                className={`${styles.eye} ${eyePosition.focused ? styles.focused : ''} ${eyePosition.isPasswordField ? styles.passwordTyping : ''}`}
                style={{ 
                  '--eye-x': `${eyePosition.x}px`,
                }}
              >
                {/* Right Eyebrow */}
                <path 
                  d="M25 18 C35 18 40 12 50 12 C60 12 65 16 75 18" 
                  stroke="#1a1a1a" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                  className={styles.eyebrow}
                />
                {/* Eye - Open State */}
                <g className={styles.openEye}>
                  <ellipse cx="50" cy="35" rx="20" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="3"/>
                  <circle 
                    cx="50" 
                    cy="35" 
                    r="8" 
                    fill="#1a1a1a" 
                    className={styles.pupil}
                  />
                </g>
                {/* Eye - Closed State */}
                <path 
                  d="M30 35 Q50 45 70 35" 
                  stroke="#1a1a1a" 
                  strokeWidth="3" 
                  fill="none"
                  className={styles.closedEye}
                />
              </svg>
            </div>
          </div>

          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to continue to your dashboard
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`${styles.input} ${styles.passwordInput}`}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className={styles.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/forgot-password" className={styles.textLink}>
                Forgot password?
              </Link>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.button}
              disabled={!isValid || loading}
            >
              {loading ? <div className={styles.loading}></div> : 'Sign In'}
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?
            <Link href="/signup" className={styles.switchLink}>
              Sign up
            </Link>
          </p>


             <p className={styles.switchText}>
            Designed & Developed by <span style={{color:'blue' , textDecorationLine:'underline'}}> Ahmad Jillani (Software Developer)
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
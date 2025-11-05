import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';
import Head from 'next/head';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired reset token');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Here you would implement your password reset logic with the token
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>
            Enter your new password
          </p>

          {success ? (
            <div className={styles.success}>
              Your password has been successfully reset.
              Redirecting to login page...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  New Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`${styles.input} ${styles.passwordInput}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
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

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm New Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={`${styles.input} ${styles.passwordInput}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button 
                type="submit" 
                className={styles.button}
                disabled={!formData.password || !formData.confirmPassword || loading}
              >
                {loading ? <div className={styles.loading}></div> : 'Reset Password'}
              </button>
            </form>
          )}

          <div className={styles.footer}>
            <p className={styles.switchText}>
              Remember your password?
              <Link href="/login" className={styles.switchLink}>
                Sign in
              </Link>
            </p>
            <div className={styles.creditsWrapper}>
              <div className={styles.credits}>
                <div>Designed & Created by</div>
                <div className={styles.developer}>Ahmad Jilani</div>
                <div className={styles.designation}>Software Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}